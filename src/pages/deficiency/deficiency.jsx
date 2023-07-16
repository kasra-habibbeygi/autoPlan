import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

//Assets
import Bus from '../../assets/images/icons/Bus.svg';
import CalendarDate from '../../assets/images/icons/CalendarDate.svg';
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
        { id: 4, title: 'نوع خودرو', key: 'carType' },
        {
            id: 5,
            title: 'عملیات',
            key: 'actions',
            renderCell: () => (
                <ActionCell>
                    <FormButton icon={pen} onClick={() => setIsModalOpen(true)} />
                    <FormButton icon={trashBin} />
                </ActionCell>
            )
        }
    ];

    const { register, handleSubmit, formState, control, reset } = useForm({
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
            <Modal state={modalIsOpen} setState={setIsModalOpen} maxWidth='sm' handleClose={reset}>
                <h2> کسری قطعات </h2>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <Controller
                        control={control}
                        name='start_time'
                        rules={{ required: 'این فیلد اجباری است' }}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <DatePickerComponent value={value} onChange={onChange} title='انتخاب تاریخ' error={errors?.start_time} />
                            );
                        }}
                    />

                    <InputComponent
                        title='نام قطعه'
                        placeHolder='نام قطعه'
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
                    <a
                        href={xlsx}
                        target='_blank'
                        download
                        rel='noreferrer'
                        style={{ marginBottom: '20px', color: '#1C274C', display: 'inline-block' }}
                    >
                        دانلود نمونه فایل اکسل
                    </a>

                    <FormButton text='ثبت' loading={false} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
                </form>
            </Modal>
        </>
    );
};

export default Deficiency;
