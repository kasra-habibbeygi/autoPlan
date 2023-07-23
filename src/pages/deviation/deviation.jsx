/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from '../../configs/axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import enheraf from '../../assets/images/global/BlackHole.svg';
import { ActionCell } from './deviation.style';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import FormButton from '../../components/form-groups/form-button';
import Modal from '../../components/template/modal';
import InputComponent from './../../components/form-groups/input-component';
import ConfirmModal from '../../components/template/confirm-modal';

//Tools
import PERMISSION from '../../utils/permission.ts';

const Deviation = () => {
    const userPermissions = useSelector(state => state.User.info.permission);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [loader, setLoader] = useState(true);
    const [reload, setReload] = useState(false);
    const [specificDeviationId, setSpecificDeviationId] = useState();
    const [deviationData, setDeviationData] = useState();
    const [modalStatus, setModalStatus] = useState('');
    const [buttonLoader, setButtonLoader] = useState({
        modalButton: false,
        delete: false
    });
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const { register, handleSubmit, formState, reset, setValue } = useForm({
        defaultValues: {
            reason: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        setLoader(true);
        Axios.get(`/worker/admin/reason-for-deviation/list_create/?page=${pageStatus.current}`)
            .then(res => {
                setDeviationData(res.data.results);
                setPageStatus({
                    ...pageStatus,
                    total: res.data.total
                });
            })
            .finally(() => {
                setLoader(false);
            });
    }, [reload, pageStatus.current]);

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'علت انحراف', key: 'reason' },
        {
            id: 3,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => (
                <ActionCell>
                    <FormButton
                        icon={pen}
                        onClick={() => editModalHandler(data)}
                        disabled={!userPermissions.includes(PERMISSION.DEVIATION_REASON.EDIT)}
                    />
                    <FormButton
                        icon={trashBin}
                        onClick={() => deleteModalHandler(data.id)}
                        disabled={!userPermissions.includes(PERMISSION.DEVIATION_REASON.DELETE)}
                    />
                </ActionCell>
            )
        }
    ];

    const addModalHandler = () => {
        setModalStatus('add');
        setModalOpen(true);
    };

    const deleteModalHandler = id => {
        setConfirmModalStatus(true);
        setSpecificDeviationId(id);
    };

    const editModalHandler = data => {
        setModalStatus('edit');
        setModalOpen(true);
        setValue('reason', data.reason);
        setSpecificDeviationId(data.id);
    };

    const formSubmit = data => {
        setButtonLoader({ ...buttonLoader, modalButton: true });

        if (modalStatus === 'add') {
            Axios.post('/worker/admin/reason-for-deviation/list_create/', data)
                .then(() => {
                    setReload(!reload);
                    toast.success('انحراف جدید با موفقیت ثبت شد');
                    setModalOpen(false);
                    reset();
                })
                .finally(() => {
                    setButtonLoader({ ...buttonLoader, modalButton: false });
                });
        } else {
            Axios.put(`/worker/admin/reason-for-deviation/retrieve_update_destroy/?pk=${specificDeviationId}`, data)
                .then(() => {
                    setReload(!reload);
                    toast.success('انحراف  با موفقیت ویرایش شد');
                    setModalOpen(false);
                    reset();
                })
                .finally(() => {
                    setButtonLoader({ ...buttonLoader, modalButton: false });
                });
        }
    };

    const deleteHandler = () => {
        setButtonLoader({ ...buttonLoader, delete: true });
        Axios.delete(`worker/admin/reason-for-deviation/retrieve_update_destroy/?pk=${specificDeviationId}`)
            .then(() => {
                setReload(!reload);
                toast.success('انحراف  با موفقیت حذف شد');
                setConfirmModalStatus(false);
            })
            .finally(() => {
                setButtonLoader({ ...buttonLoader, delete: false });
            });
    };

    return (
        <>
            <PagesHeader
                buttonTitle='ثبت انحراف جدید'
                onButtonClick={addModalHandler}
                disabled={!userPermissions.includes(PERMISSION.DEVIATION_REASON.ADD)}
            />
            <Table columns={columns} rows={deviationData} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={loader} />
            <Modal state={modalOpen} setState={setModalOpen} maxWidth='sm' handleClose={reset}>
                {modalStatus === 'add' ? <h2>ثبت انحراف جدید</h2> : <h2>ویرایش انحراف </h2>}
                <form onSubmit={handleSubmit(formSubmit)}>
                    <InputComponent
                        title='علت انحراف'
                        placeHolder='علت انحراف خود را وارد کنید'
                        type='text'
                        icon={enheraf}
                        detail={{
                            ...register('reason', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.reason}
                    />
                    <FormButton
                        text='ثبت'
                        type='submit'
                        backgroundColor={'#174787'}
                        color={'white'}
                        height={48}
                        loading={buttonLoader.modalButton}
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

export default Deviation;
