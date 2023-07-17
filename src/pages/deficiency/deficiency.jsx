/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../configs/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

//Assets
import Bus from '../../assets/images/icons/Bus.svg';
import ShockAbsorber from '../../assets/images/icons/ShockAbsorber.svg';
import Accumulator from '../../assets/images/icons/Accumulator.svg';
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import { ActionCell } from '../deviation/deviation.style';
import xlsx from '../../assets/example.xlsx';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import InputComponent from '../../components/form-groups/input-component';
import FormButton from '../../components/form-groups/form-button';
import UploadFile from '../../components/form-groups/UploadFile';
import DatePickerComponent from '../../components/form-groups/date-picker';
import ConfirmModal from '../../components/template/confirm-modal';

// Tools
import tools from '../../utils/tools';
import PERMISSION from './../../utils/permission.ts';

// MUI
import { Tab, Tabs } from '@mui/material';

const Deficiency = () => {
    const userPermissions = useSelector(state => state.User.info.permission);
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [deficiencyData, setDeficiencyData] = useState();
    const [reload, setReload] = useState(false);
    const [loader, setLoader] = useState(true);
    const [modalStatus, setModalStatus] = useState('');
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [specificDeviationId, setSpecificDeviationId] = useState();
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const [buttonLoader, setButtonLoader] = useState({
        modalButton: false,
        delete: false
    });
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'تاریخ', key: 'date', renderCell: data => tools.changeDateToJalali(data.date, false) },
        { id: 3, title: 'نام قطعه', key: 'title' },
        { id: 4, title: 'نوع خودرو', key: 'car_type' },
        {
            id: 5,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => (
                <ActionCell>
                    <FormButton
                        icon={pen}
                        onClick={() => editModalHandler(data)}
                        disabled={!userPermissions.includes(PERMISSION.LACK_PARTS.EDIT)}
                    />
                    <FormButton
                        icon={trashBin}
                        onClick={() => deleteModalHandler(data)}
                        disabled={!userPermissions.includes(PERMISSION.LACK_PARTS.DELETE)}
                    />
                </ActionCell>
            )
        }
    ];

    const { register, handleSubmit, formState, control, reset, setValue } = useForm({
        defaultValues: {
            date: '',
            partName: '',
            partCode: '',
            carType: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        setLoader(true);
        Axios.get(`repository_mgmt/?page=${pageStatus.current}`)
            .then(res => {
                setDeficiencyData(res.data.data);
                setPageStatus({
                    ...pageStatus,
                    total: res.data.total
                });
            })
            .finally(() => setLoader(false));
    }, [reload, pageStatus.current]);

    const addModalHandler = () => {
        setModalStatus('add');
        setIsModalOpen(true);
    };

    const deleteModalHandler = data => {
        setConfirmModalStatus(true);
        setSpecificDeviationId(data.id);
    };

    const editModalHandler = data => {
        setModalStatus('edit');
        setIsModalOpen(true);
        setValue('date', tools.changeIsoDateToTimeStamp(data.date));
        setValue('partName', data.title);
        setValue('partCode', data.code);
        setValue('carType', data.car_type);
        setSpecificDeviationId(data.id);
    };

    const formSubmit = data => {
        setButtonLoader(prev => ({
            ...prev,
            modalButton: true
        }));

        if (modalStatus === 'add') {
            Axios.post('repository_mgmt/', {
                date: tools.changeTimeStampToIsoDate(data.date),
                code: data.partCode,
                title: data.partName,
                car_type: data.carType
            })
                .then(() => {
                    setReload(prev => !prev);
                    toast.success('کسری قطعات با موفقیت ثبت شد');
                    setIsModalOpen(false);
                    reset();
                })
                .finally(() => {
                    setButtonLoader(prev => ({
                        ...prev,
                        modalButton: false
                    }));
                    setSpecificDeviationId();
                });
        } else {
            Axios.put(`repository_mgmt/?id=${specificDeviationId}`, {
                date: tools.changeTimeStampToIsoDate(data.date),
                code: data.partCode,
                title: data.partName,
                car_type: data.carType
            })
                .then(() => {
                    setReload(prev => !prev);
                    toast.success('کسری قطعات با موفقیت ویرایش شد');
                    setIsModalOpen(false);
                    reset();
                })
                .finally(() => {
                    setButtonLoader(prev => ({
                        ...prev,
                        modalButton: false
                    }));
                    setSpecificDeviationId();
                });
        }
    };

    const deleteHandler = () => {
        setButtonLoader(prev => ({
            ...prev,
            delete: true
        }));
        Axios.delete(`repository_mgmt/?id=${specificDeviationId}`)
            .then(() => {
                setReload(!reload);
                toast.success('کسری قطعه  با موفقیت حذف شد');
                setConfirmModalStatus(false);
            })
            .finally(() => {
                setButtonLoader(prev => ({
                    ...prev,
                    delete: false
                }));
                setSpecificDeviationId();
            });
    };

    return (
        <>
            <PagesHeader
                buttonTitle='اضافه کردن کسری قطعات'
                onButtonClick={addModalHandler}
                disabled={!userPermissions.includes(PERMISSION.LACK_PARTS.ADD)}
            />
            <Table columns={columns} rows={deficiencyData} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={loader} />
            <Modal
                state={modalIsOpen}
                setState={setIsModalOpen}
                maxWidth='sm'
                handleClose={() => {
                    reset();
                    setTabValue(0);
                }}
            >
                <h2> کسری قطعات </h2>
                <Tabs value={tabValue} onChange={handleChange} sx={{ margin: '40px 0 60px 0' }}>
                    <Tab label='ارسال تکی' sx={{ flexGrow: 1, fontWeight: 700, fontSize: 16 }} />
                    <Tab label='ارسال گروهی' sx={{ flexGrow: 1, fontWeight: 700, fontSize: 16 }} />
                </Tabs>
                {tabValue === 0 ? (
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <Controller
                            control={control}
                            name='date'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            }}
                            render={({ field: { onChange, value } }) => {
                                return <DatePickerComponent value={value} onChange={onChange} title='انتخاب تاریخ' error={errors?.date} />;
                            }}
                        />

                        <InputComponent
                            title='نام قطعه'
                            placeHolder='نام قطعه'
                            type='text'
                            icon={ShockAbsorber}
                            detail={{
                                ...register('partName', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.partName}
                        />
                        <InputComponent
                            title='کد قطعه'
                            placeHolder='کد قطعه'
                            type='text'
                            icon={Accumulator}
                            detail={{
                                ...register('partCode', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.partCode}
                        />
                        <InputComponent
                            title='نوع خودرو'
                            placeHolder='نوع خودرو'
                            type='text'
                            icon={Bus}
                            detail={{
                                ...register('carType', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.carType}
                        />

                        <FormButton
                            text={modalStatus === 'edit' ? 'ویرایش' : 'ثبت'}
                            loading={buttonLoader.modalButton}
                            type='submit'
                            backgroundColor={'#174787'}
                            color={'white'}
                            height={48}
                        />
                    </form>
                ) : (
                    <>
                        <a
                            href={xlsx}
                            target='_blank'
                            download
                            rel='noreferrer'
                            style={{ marginBottom: '20px', color: '#1C274C', display: 'inline-block' }}
                        >
                            دانلود نمونه فایل اکسل
                        </a>
                        <UploadFile />
                    </>
                )}
            </Modal>

            <ConfirmModal
                status={confirmModalStatus}
                setStatus={setConfirmModalStatus}
                title='آیا از حذف این ردیف مطمئن هستید ؟'
                deleteHandler={deleteHandler}
                loading={buttonLoader.delete}
            />
        </>
    );
};

export default Deficiency;
