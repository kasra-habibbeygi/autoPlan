/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from '../../configs/axios';
import { toast } from 'react-hot-toast';

//Assets
import { AddAdminWrapper } from './add-admin.style';
import { ActionCell } from '../deviation/deviation.style';
import trashBin from './../../assets/images/global/TrashBin.svg';
// import pen from './../../assets/images/global/pen.svg';
import document from './../../assets/images/sideBar/DocumentAdd.svg';
import notes from './../../assets/images/sideBar/Notes.svg';
import bill from './../../assets/images/sideBar/Bill.svg';
import homeSmile from './../../assets/images/sideBar/HomeSmile.svg';
import addPhone from './../../assets/images/login/addPhone.svg';

//Components
import PagesHeader from '../../components/template/pages-header';
import Table from '../../components/template/Table';
import Modal from '../../components/template/modal';
import InputComponent from '../../components/form-groups/input-component';
import ConfirmModal from '../../components/template/confirm-modal';
import FormButton from '../../components/form-groups/form-button';

const AddAdmin = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState('');
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [specificDeviationId, setSpecificDeviationId] = useState();
    const [adminList, setAdminList] = useState();
    const [reload, setReload] = useState(false);
    const [loader, setLoader] = useState(true);
    const [buttonLoader, setButtonLoader] = useState({
        modalButton: false,
        delete: false
    });

    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const { register, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            company_address: '',
            company_code: '',
            company_name: '',
            company_owner: '',
            mobile: '',
            username: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        setLoader(true);
        Axios.get(`add_admin_user/?page=${pageStatus.current}`).then(res => {
            setAdminList(res.data.data);
            setPageStatus({
                ...pageStatus,
                total: res.data.total
            });
            setLoader(false);
        });
    }, [pageStatus.current, reload]);

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'نام کامل', key: 'company_owner' },
        { id: 3, title: 'کد نمایندگی', key: 'company_code' },
        { id: 4, title: 'نام نمایندگی', key: 'company_owner' },
        { id: 5, title: 'شماره موبایل', key: 'mobile' },
        { id: 6, title: 'آدرس نمایندگی', key: 'company_address' },
        {
            id: 7,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => (
                <ActionCell>
                    {/* <FormButton icon={pen} onClick={() => setShowAddModal(true)} /> */}
                    <FormButton icon={trashBin} onClick={() => deleteModalHandler(data.id)} />
                </ActionCell>
            )
        }
    ];

    const formSubmit = data => {
        const newData = {
            ...data,
            username: new Date().getTime()
        };
        setButtonLoader({ ...buttonLoader, modalButton: true });
        if (modalStatus === 'add') {
            Axios.post('add_admin_user/', newData)
                .then(() => {
                    setButtonLoader({ ...buttonLoader, modalButton: false });
                    setReload(!reload);
                    toast.success('ادمین جدید با موفقیت ثبت شد');
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
        Axios.delete(`add_admin_user/?id=${specificDeviationId}`).then(() => {
            setButtonLoader({ ...buttonLoader, delete: false });
            setReload(!reload);
            toast.success('انحراف  با موفقیت حذف شد');
            setConfirmModalStatus(false);
        });
    };

    const deleteModalHandler = id => {
        setConfirmModalStatus(true);
        setSpecificDeviationId(id);
    };

    const addModalHandler = () => {
        setModalStatus('add');
        setModalOpen(true);
    };

    return (
        <AddAdminWrapper textareaError={errors?.representation_address?.message}>
            <PagesHeader buttonTitle='افزودن ادمین جدید' secondFiled='ساعت کاری مجموعه : ۸ ساعت' onButtonClick={addModalHandler} />
            <Table columns={columns} rows={adminList} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={loader} />
            <Modal state={modalOpen} setState={setModalOpen} handleClose={reset} bgStatus={true}>
                <div className='formControl'>
                    {modalStatus === 'add' ? <h2>فرم ثبت ادمین</h2> : <h2>ویرایش ادمین</h2>}

                    <form onSubmit={handleSubmit(formSubmit)}>
                        <InputComponent
                            title='نام کامل'
                            icon={document}
                            detail={{
                                ...register('company_owner', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.company_owner}
                            placeHolder='نام کامل'
                        />

                        <InputComponent
                            title='کد نمایندگی'
                            icon={notes}
                            detail={{
                                ...register('company_code', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.company_code}
                            placeHolder='کد نمایندگی'
                        />

                        <InputComponent
                            title='نام نمایندگی'
                            icon={bill}
                            detail={{
                                ...register('company_name', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.company_name}
                            placeHolder='نام نمایندگی'
                        />

                        <InputComponent
                            title='شماره موبایل'
                            type='number'
                            icon={addPhone}
                            detail={{
                                ...register('mobile', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    },
                                    maxLength: {
                                        value: 11,
                                        message: 'شماره باید ۱۱ عدد باشد'
                                    },
                                    minLength: {
                                        value: 11,
                                        message: 'شماره باید ۱۱ عدد باشد'
                                    }
                                })
                            }}
                            error={errors?.mobile}
                            placeHolder='---------۰۹'
                        />

                        <div className={errors?.company_address ? 'text_area text_area_error' : 'text_area'}>
                            <p className='title'>آدرس نمایندگی</p>
                            <div>
                                <textarea
                                    rows='5'
                                    placeholder='آدرس نمایندگی'
                                    {...register('company_address', {
                                        required: {
                                            value: true,
                                            message: 'این فیلد اجباری است'
                                        }
                                    })}
                                ></textarea>
                                <img src={homeSmile} />
                            </div>
                            <p className='error'>{errors?.company_address?.message}</p>
                        </div>

                        <FormButton
                            text='افزودن'
                            type='submit'
                            backgroundColor='#174787'
                            color={'white'}
                            height={48}
                            loading={buttonLoader.modalButton}
                        />
                    </form>
                </div>
            </Modal>
            <ConfirmModal
                status={confirmModalStatus}
                setStatus={setConfirmModalStatus}
                title='آیا از حذف این ردیف مطمئن هستید ؟'
                deleteHandler={deleteHandler}
                loading={buttonLoader.delete}
            />
        </AddAdminWrapper>
    );
};

export default AddAdmin;
