import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//Assets
import Bus from '../../assets/images/icons/Bus.svg';
import Arrow from '../../assets/images/global/arrow.svg';
import { PlanningField } from './planning.style';
import PhoneIcon from '../../assets/images/login/addPhone.svg';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import InputComponent from '../../components/form-groups/input-component';
import ProgressBar from '../../components/pages/planning/progress-bar';
import FormButton from '../../components/form-groups/form-button';

const Planning = () => {
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            date: '',
            internetReception: '',
            phoneReception: '',
            presentReception: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const openModal = () => {
        setIsModalOpen(true);
    };

    const filterHandler = () => {};

    const formSubmit = data => {
        console.log(data);
    };

    return (
        <PlanningField>
            <PagesHeader buttonTitle='ثبت برنامه جدید' onButtonClick={openModal} hasFilter={true} onFilterClick={filterHandler} />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
            <Modal state={modalIsOpen} setState={setIsModalOpen} bgStatus={true}>
                <div className='formControl'>
                    <h2>کسری قطعات</h2>
                    <ProgressBar />
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <InputComponent
                            title='برند'
                            type='text'
                            icon={Bus}
                            detail={{
                                ...register('name', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.name}
                        />
                        <InputComponent
                            title='مدل'
                            type='text'
                            icon={Bus}
                            detail={{
                                ...register('name', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.name}
                        />
                        <InputComponent
                            title='نام آورنده'
                            type='text'
                            icon={Bus}
                            detail={{
                                ...register('name', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.name}
                        />
                        <InputComponent
                            title='شماره موبایل'
                            type='text'
                            icon={PhoneIcon}
                            detail={{
                                ...register('name', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.name}
                        />
                        <FormButton
                            text='ورود به سیستم'
                            icon={Arrow}
                            loading={false}
                            width='fit-content'
                            className='login'
                            backgroundColor={'#174787'}
                            onClick={() => {}}
                            height='48px'
                            type='submit'
                        />
                    </form>
                </div>
            </Modal>
        </PlanningField>
    );
};

export default Planning;

const columns = [
    { id: 1, title: 'ردیف', key: 'index' },
    { id: 2, title: 'نوع تعمیر', key: 'repairType' },
    { id: 3, title: 'خودرو', key: 'car' },
    { id: 4, title: 'مدل', key: 'model' },
    { id: 5, title: 'پلاک خودرو', key: 'license' },
    { id: 6, title: 'کد تعمیرکار', key: 'mechanicCode' },
    { id: 7, title: 'جایگاه', key: 'position' },
    { id: 8, title: 'موبایل', key: 'mobileNumber' },
    { id: 9, title: 'هرم', key: 'pyramid' }
];

const rows = [
    {
        id: 1,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 2,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 3,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 4,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 5,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 6,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 7,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    }
];
