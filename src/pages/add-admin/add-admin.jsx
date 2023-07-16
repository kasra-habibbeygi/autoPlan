import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//Assets
import { AddAdminWrapper } from './add-admin.style';
import { ActionCell } from '../deviation/deviation.style';
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
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
    const [showAddModal, setShowAddModal] = useState(false);
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'نام کامل', key: 'fullName' },
        { id: 3, title: 'کد نمایندگی', key: 'representation_code' },
        { id: 4, title: 'نام نمایندگی', key: 'representation_name' },
        { id: 5, title: 'شماره موبایل', key: 'phoneNumber' },
        { id: 6, title: 'آدرس نمایندگی', key: 'representation_address' },
        {
            id: 7,
            title: 'عملیات',
            key: 'actions',
            renderCell: () => (
                <ActionCell>
                    <FormButton icon={pen} onClick={() => setShowAddModal(true)} />
                    <FormButton icon={trashBin} onClick={() => setConfirmModalStatus(true)} />
                </ActionCell>
            )
        }
    ];

    const { register, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            fullName: '',
            representation_code: '',
            representation_name: '',
            phoneNumber: '',
            representation_address: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = data => {};

    return (
        <AddAdminWrapper textareaError={errors?.representation_address?.message}>
            <PagesHeader
                buttonTitle='افزودن ادمین جدید'
                secondFiled='ساعت کاری مجموعه : ۸ ساعت'
                onButtonClick={() => setShowAddModal(true)}
            />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
            <Modal state={showAddModal} setState={setShowAddModal} handleClose={reset} bgStatus={true}>
                <div className='formControl'>
                    <h2>فرم ثبت جایگاه</h2>

                    <form onSubmit={handleSubmit(formSubmit)}>
                        <InputComponent
                            title='نام کامل'
                            icon={document}
                            detail={{
                                ...register('fullName', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.fullName}
                            placeHolder='نام کامل'
                        />

                        <InputComponent
                            title='کد نمایندگی'
                            icon={notes}
                            detail={{
                                ...register('representation_code', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.representation_code}
                            placeHolder='کد نمایندگی'
                        />

                        <InputComponent
                            title='نام نمایندگی'
                            icon={bill}
                            detail={{
                                ...register('representation_name', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.representation_name}
                            placeHolder='نام نمایندگی'
                        />

                        <InputComponent
                            title='شماره موبایل'
                            type='number'
                            icon={addPhone}
                            detail={{
                                ...register('phoneNumber', {
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
                            error={errors?.phoneNumber}
                            placeHolder='---------۰۹'
                        />

                        <div className={errors?.representation_address ? 'text_area text_area_error' : 'text_area'}>
                            <p className='title'>آدرس نمایندگی</p>
                            <div>
                                <textarea
                                    rows='5'
                                    placeholder='آدرس نمایندگی'
                                    {...register('representation_address', {
                                        required: {
                                            value: true,
                                            message: 'این فیلد اجباری است'
                                        }
                                    })}
                                ></textarea>
                                <img src={homeSmile} />
                            </div>
                            <p className='error'>{errors?.representation_address?.message}</p>
                        </div>

                        <FormButton text='افزودن' type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
                    </form>
                </div>
            </Modal>

            <ConfirmModal status={confirmModalStatus} setStatus={setConfirmModalStatus} title='آیا از حذف این ردیف مطمئن هستید ؟' />
        </AddAdminWrapper>
    );
};

export default AddAdmin;
const rows = [
    {
        id: 1,
        fullName: 'محسن حسینی',
        representation_code: '172_87',
        representation_name: 'some company',
        phoneNumber: '09385698714',
        representation_address: 'تهران ، شهرک غرب پلاک ۲۳'
    },
    {
        id: 2,
        fullName: 'محسن حسینی',
        representation_code: '172_87',
        representation_name: 'some company',
        phoneNumber: '09385698714',
        representation_address: 'تهران ، شهرک غرب پلاک ۲۳'
    },
    {
        id: 3,
        fullName: 'محسن حسینی',
        representation_code: '172_87',
        representation_name: 'some company',
        phoneNumber: '09385698714',
        representation_address: 'تهران ، شهرک غرب پلاک ۲۳'
    },
    {
        id: 4,
        fullName: 'محسن حسینی',
        representation_code: '172_87',
        representation_name: 'some company',
        phoneNumber: '09385698714',
        representation_address: 'تهران ، شهرک غرب پلاک ۲۳'
    },
    {
        id: 5,
        fullName: 'محسن حسینی',
        representation_code: '172_87',
        representation_name: 'some company',
        phoneNumber: '09385698714',
        representation_address: 'تهران ، شهرک غرب پلاک ۲۳'
    },
    {
        id: 6,
        fullName: 'محسن حسینی',
        representation_code: '172_87',
        representation_name: 'some company',
        phoneNumber: '09385698714',
        representation_address: 'تهران ، شهرک غرب پلاک ۲۳'
    },
    {
        id: 7,
        fullName: 'محسن حسینی',
        representation_code: '172_87',
        representation_name: 'some company',
        phoneNumber: '09385698714',
        representation_address: 'تهران ، شهرک غرب پلاک ۲۳'
    }
];
