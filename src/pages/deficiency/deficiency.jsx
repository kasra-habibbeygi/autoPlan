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
import Tools from '../../utils/tools';
import PERMISSION from '../../utils/permission.ts';

// MUI
import { Tab, Tabs } from '@mui/material';

const Deficiency = () => {
    const userPermission = useSelector(state => state.User.info.permission);
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [deficiencyData, setDeficiencyData] = useState();
    const [reload, setReload] = useState(false);
    const [loader, setLoader] = useState(true);
    const [modalStatus, setModalStatus] = useState('');
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [specificDeviationId, setSpecificDeviationId] = useState();
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (_, newValue) => {
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
        { id: 2, title: 'تاریخ', key: 'date' },
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
                        disabled={!userPermission.includes(PERMISSION.LACK_PARTS.EDIT)}
                    />
                    <FormButton
                        icon={trashBin}
                        onClick={() => deleteModalHandler(data)}
                        disabled={!userPermission.includes(PERMISSION.LACK_PARTS.DELETE)}
                    />
                </ActionCell>
            )
        }
    ];

    const { register, handleSubmit, formState, control, reset, setValue } = useForm({
        defaultValues: {
            date: '',
            title: '',
            code: '',
            car_type: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        setLoader(true);
        Axios.get(`worker/admin/lack-parts/list_create/?page=${pageStatus.current}`)
            .then(res => {
                setDeficiencyData(res.data.results);
                setPageStatus({
                    ...pageStatus,
                    total: res.data.total
                });
            })
            .catch(() => {})
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
        setValue('date', Tools.changeDateToTimeStamp(data.date));
        setValue('title', data.title);
        setValue('code', data.code);
        setValue('car_type', data.car_type);
        setSpecificDeviationId(data.id);
    };

    const formSubmit = data => {
        setButtonLoader(prev => ({
            ...prev,
            modalButton: true
        }));

        const newDate = {
            ...data,
            date: Tools.changeTimeStampToDate(data.date)
        };

        if (modalStatus === 'add') {
            Axios.post('worker/admin/lack-parts/list_create/', newDate)
                .then(() => {
                    setReload(prev => !prev);
                    toast.success('کسری قطعات با موفقیت ثبت شد');
                    setIsModalOpen(false);
                    reset();
                })
                .catch(() => {})
                .finally(() => {
                    setButtonLoader(prev => ({
                        ...prev,
                        modalButton: false
                    }));
                });
        } else {
            Axios.put(`worker/admin/lack-parts/retrieve_update_destroy/?pk=${specificDeviationId}`, newDate)
                .then(() => {
                    setReload(prev => !prev);
                    toast.success('کسری قطعات با موفقیت ویرایش شد');
                    setIsModalOpen(false);
                    reset();
                })
                .catch(() => {})
                .finally(() => {
                    setButtonLoader(prev => ({
                        ...prev,
                        modalButton: false
                    }));
                });
        }
    };

    const deleteHandler = () => {
        setButtonLoader(prev => ({
            ...prev,
            delete: true
        }));
        Axios.delete(`worker/admin/lack-parts/retrieve_update_destroy/?pk=${specificDeviationId}`)
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
                disabled={!userPermission.includes(PERMISSION.LACK_PARTS.ADD)}
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
                {modalStatus === 'add' && (
                    <Tabs value={tabValue} onChange={handleChange} sx={{ margin: '40px 0 60px 0' }}>
                        <Tab label='ارسال تکی' sx={{ flexGrow: 1, fontWeight: 700, fontSize: 16 }} />
                        <Tab label='ارسال گروهی' sx={{ flexGrow: 1, fontWeight: 700, fontSize: 16 }} />
                    </Tabs>
                )}
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
                                ...register('title', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.title}
                        />
                        <InputComponent
                            title='کد قطعه'
                            placeHolder='کد قطعه'
                            type='text'
                            icon={Accumulator}
                            detail={{
                                ...register('code', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.code}
                        />
                        <InputComponent
                            title='نوع خودرو'
                            placeHolder='نوع خودرو'
                            type='text'
                            icon={Bus}
                            detail={{
                                ...register('car_type', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.car_type}
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
                        <UploadFile
                            setReload={setReload}
                            setIsModalOpen={setIsModalOpen}
                            setSpecificDeviationId={setSpecificDeviationId}
                            setTabValue={setTabValue}
                        />
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
