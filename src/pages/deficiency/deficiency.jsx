import React, { useState } from 'react';

//Assets
import Bus from '../../assets/images/icons/Bus.svg';
import CalendarDate from '../../assets/images/icons/CalendarDate.svg';
import ShockAbsorber from '../../assets/images/icons/ShockAbsorber.svg';
import Accumulator from '../../assets/images/icons/Accumulator.svg';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import { useForm } from 'react-hook-form';
import InputComponent from '../../components/form-groups/input-component';
import FormButton from '../../components/form-button/form-button';
import UploadFile from '../../components/form-groups/UploadFile';

const Deficiency = () => {
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [fileNameValue, setFileNameValue] = useState('');
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });
    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'تاریخ', key: 'date' },
        { id: 3, title: 'نام قطعه', key: 'partName' },
        { id: 4, title: 'نوع خودرو', key: 'carType' }
    ];

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

    const rows = [
        {
            id: 1,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 2,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 3,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 4,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 5,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 6,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 7,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        }
    ];

    const openModal = () => {
        setIsModalOpen(true);
    };

    const formSubmit = () => {};

    const inputValueHandler = e => {
        setFileNameValue(e.target.files[0].name);
    };

    return (
        <>
            <PagesHeader buttonTitle='اضافه کردن کسری قطعات' onButtonClick={openModal} />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
            <Modal state={modalIsOpen} setState={setIsModalOpen} maxWidth='sm'>
                <h2>کسری قطعات</h2>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <InputComponent
                        title='تاریخ'
                        icon={CalendarDate}
                        type='date'
                        detail={{
                            ...register('date', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.date}
                    />
                    <InputComponent
                        title='نام قطعه'
                        type='text'
                        icon={ShockAbsorber}
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
                        title='کد قطعه'
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
                        type='text'
                        icon={Bus}
                        detail={{
                            ...register('type', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.type}
                    />
                    <UploadFile
                        name='uploadFile'
                        fileName={fileNameValue ?? fileNameValue}
                        valueHandler={inputValueHandler}
                        detail={{
                            ...register('file', {
                                required: {
                                    value: false,
                                    message: 'این فیلد اجباری نیست'
                                }
                            })
                        }}
                    />

                    <FormButton text='ثبت' loading={false} type='submit' />
                </form>
            </Modal>
        </>
    );
};

export default Deficiency;
