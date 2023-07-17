import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../configs/axios';

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
import tools from '../../utils/tools';
import { toast } from 'react-hot-toast';

const Deficiency = () => {
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [deficiencyData, setDeficiencyData] = useState();
    const [fileValue, setFileValue] = useState();
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
    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'تاریخ', key: 'date' },
        { id: 3, title: 'نام قطعه', key: 'title' },
        { id: 4, title: 'نوع خودرو', key: 'car_type' },
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
            partName: '',
            partCode: '',
            carType: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        setLoader(true);
        Axios.get(`repository_mgmt/?page=${pageStatus.current}`).then(res => {
            setDeficiencyData(res.data.data);
            setLoader(false);
            setPageStatus({
                ...pageStatus,
                total: res.data.total
            });
        });
    }, [reload, pageStatus.current]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const formSubmit = data => {
        setButtonLoader(prev => ({
            ...prev,
            modalButton: true
        }));

        if (fileValue) {
            //
        } else {
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
                .finally(() =>
                    setButtonLoader(prev => ({
                        ...prev,
                        modalButton: false
                    }))
                );
        }
    };

    console.log(deficiencyData);

    return (
        <>
            <PagesHeader buttonTitle='اضافه کردن کسری قطعات' onButtonClick={openModal} />
            <Table columns={columns} rows={deficiencyData} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={loader} />
            <Modal
                state={modalIsOpen}
                setState={setIsModalOpen}
                maxWidth='sm'
                handleClose={() => {
                    reset();
                    setFileValue();
                }}
            >
                <h2> کسری قطعات </h2>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <Controller
                        control={control}
                        name='date'
                        rules={{
                            required: {
                                value: fileValue ? false : true,
                                message: 'این فیلد اجباری است'
                            }
                        }}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <DatePickerComponent
                                    value={value}
                                    onChange={onChange}
                                    title='انتخاب تاریخ'
                                    error={!fileValue && errors?.date}
                                    disabled={fileValue && true}
                                />
                            );
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
                                    value: fileValue ? false : true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={!fileValue && errors?.partName}
                        disabled={fileValue && true}
                    />
                    <InputComponent
                        title='کد قطعه'
                        placeHolder='کد قطعه'
                        type='text'
                        icon={Accumulator}
                        detail={{
                            ...register('partCode', {
                                required: {
                                    value: fileValue ? false : true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={!fileValue && errors?.partCode}
                        disabled={fileValue && true}
                    />
                    <InputComponent
                        title='نوع خودرو'
                        placeHolder='نوع خودرو'
                        type='text'
                        icon={Bus}
                        detail={{
                            ...register('carType', {
                                required: {
                                    value: fileValue ? false : true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={!fileValue && errors?.carType}
                        disabled={fileValue && true}
                    />
                    <UploadFile value={fileValue} setFileValue={setFileValue} />
                    <a
                        href={xlsx}
                        target='_blank'
                        download
                        rel='noreferrer'
                        style={{ marginBottom: '20px', color: '#1C274C', display: 'inline-block' }}
                    >
                        دانلود نمونه فایل اکسل
                    </a>

                    <FormButton
                        text='ثبت'
                        loading={buttonLoader.modalButton}
                        type='submit'
                        backgroundColor={'#174787'}
                        color={'white'}
                        height={48}
                    />
                </form>
            </Modal>
        </>
    );
};

export default Deficiency;
