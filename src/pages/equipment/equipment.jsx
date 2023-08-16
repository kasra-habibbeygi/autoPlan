/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../configs/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

//Assets
import ShockAbsorber from '../../assets/images/icons/ShockAbsorber.svg';
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import { ActionCell } from '../deviation/deviation.style';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import InputComponent from '../../components/form-groups/input-component';
import FormButton from '../../components/form-groups/form-button';
import DatePickerComponent from '../../components/form-groups/date-picker';
import ConfirmModal from '../../components/template/confirm-modal';

// Tools
import Tools from '../../utils/tools';
import PERMISSION from '../../utils/permission.ts';

const Equipment = () => {
    const userPermission = useSelector(state => state.User.info.permission);
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [deficiencyData, setDeficiencyData] = useState();
    const [reload, setReload] = useState(false);
    const [loader, setLoader] = useState(true);
    const [modalStatus, setModalStatus] = useState('');
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [specificDeviationId, setSpecificDeviationId] = useState();

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
        { id: 3, title: 'نام تجهیزات', key: 'equipment' },
        {
            id: 5,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => (
                <ActionCell>
                    <FormButton
                        icon={pen}
                        onClick={() => editModalHandler(data)}
                        disabled={!userPermission.includes(PERMISSION.EQUIPMENT_SHORTAGE.EDIT)}
                    />
                    <FormButton
                        icon={trashBin}
                        onClick={() => deleteModalHandler(data)}
                        disabled={!userPermission.includes(PERMISSION.EQUIPMENT_SHORTAGE.DELETE)}
                    />
                </ActionCell>
            )
        }
    ];

    const { register, handleSubmit, formState, control, reset, setValue } = useForm({
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        setLoader(true);
        Axios.get(`worker/admin/equipment-deficit/list_create/?page=${pageStatus.current}`)
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
        setValue('equipment', data.equipment);
        setSpecificDeviationId(data.id);
    };

    const formSubmit = data => {
        setButtonLoader(prev => ({
            ...prev,
            modalButton: true
        }));

        const newData = {
            ...data,
            date: Tools.changeTimeStampToDate(data.date)
        };

        if (modalStatus === 'add') {
            Axios.post('worker/admin/equipment-deficit/list_create/', newData)
                .then(() => {
                    setReload(prev => !prev);
                    toast.success('کسری تجهیزات با موفقیت ثبت شد');
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
            Axios.put(`worker/admin/equipment-deficit/delete_update/${specificDeviationId}`, newData)
                .then(() => {
                    setReload(prev => !prev);
                    toast.success('کسری تجهیزات با موفقیت ویرایش شد');
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

        Axios.delete(`worker/admin/equipment-deficit/delete_update/${specificDeviationId}`)
            .then(() => {
                setReload(!reload);
                toast.success('کسری قطعه  با موفقیت حذف شد');
                setConfirmModalStatus(false);
                setSpecificDeviationId();
                setPageStatus({
                    ...pageStatus,
                    current: 1
                });
            })
            .catch(() => {})
            .finally(() => {
                setButtonLoader(prev => ({
                    ...prev,
                    delete: false
                }));
            });
    };

    return (
        <>
            <PagesHeader
                buttonTitle='اضافه کردن کسری تجهیزات'
                onButtonClick={addModalHandler}
                disabled={!userPermission.includes(PERMISSION.EQUIPMENT_SHORTAGE.ADD)}
            />
            <Table columns={columns} rows={deficiencyData} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={loader} />
            <Modal
                state={modalIsOpen}
                setState={setIsModalOpen}
                maxWidth='sm'
                handleClose={() => {
                    reset();
                }}
            >
                <h2> کسری تجهیزات </h2>

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
                        title='نام تجهیزات'
                        placeHolder='نام تجهیزات'
                        type='text'
                        icon={ShockAbsorber}
                        detail={{
                            ...register('equipment', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.equipment}
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

export default Equipment;
