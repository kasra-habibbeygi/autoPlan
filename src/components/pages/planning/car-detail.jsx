/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';
import PERMISSION from '../../../utils/permission.ts';
import { useSelector } from 'react-redux';

//Assets
import Bus from './../../../assets/images/icons/Bus.svg';
import Arrow from './../../../assets/images/global/arrow.svg';
import PhoneIcon from './../../../assets/images/login/addPhone.svg';
import { StepsStyle } from './steps.style';

//Components
import FormButton from '../../form-groups/form-button';
import InputComponent from '../../form-groups/input-component';
import DatePickerComponent from '../../form-groups/date-picker';

// MUI
import { Autocomplete, TextField } from '@mui/material';

// Tools
import Tools from '../../../utils/tools';

const CarDetail = ({ setStep, setStep1Id, modalFormStatus, chosenEditItemDetails, setReload, setIsModalOpen }) => {
    const userPermissions = useSelector(state => state.User.info.permission);
    const [loader, setLoader] = useState(false);

    const hasNextStepPermission = userPermissions.includes(PERMISSION.VEHICLE_SPECIFICATIONS.ADD_EDIT_DIAGNOSIS);

    const { register, handleSubmit, formState, control, setValue } = useForm({
        defaultValues: {
            data: '',
            car_brand: '',
            car_model: '',
            customer_name: '',
            customer_mobile_number: '',
            plaque_4: '',
            plaque_3: '',
            plaque_2: Alphabet[0],
            plaque_1: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        if (modalFormStatus === 'edit') {
            if (chosenEditItemDetails) {
                setValue('date', Tools.changeDateToTimeStamp(chosenEditItemDetails?.date));
                setValue('car_brand', chosenEditItemDetails?.car_brand);
                setValue('car_model', chosenEditItemDetails?.car_model);
                setValue('customer_name', chosenEditItemDetails?.customer_name);
                setValue('customer_mobile_number', chosenEditItemDetails?.customer_mobile_number);
                setValue('plaque_4', chosenEditItemDetails?.plaque_4);
                setValue('plaque_3', chosenEditItemDetails?.plaque_3);
                setValue('plaque_2', {
                    label: chosenEditItemDetails?.plaque_2,
                    value: chosenEditItemDetails?.plaque_2
                });
                setValue('plaque_1', chosenEditItemDetails?.plaque_1);
            }
        }
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setLoader(true);

        const newData = {
            ...data,
            plaque_2: data.plaque_2.label,
            date: Tools.changeTimeStampToDate(data.date)
        };

        if (modalFormStatus === 'edit' && chosenEditItemDetails?.id) {
            Axios.put(`/worker/admin/vehicle-specifications/retrieve_update/?pk=${chosenEditItemDetails?.id}`, newData)
                .then(res => {
                    if (hasNextStepPermission) {
                        setStep(2);
                        setStep1Id(res.data.id);
                        setReload(prev => !prev);
                    } else {
                        setReload(prev => !prev);
                        setIsModalOpen(false);
                    }
                })
                .catch(() => {})
                .finally(() => {
                    setLoader(false);
                });
        } else {
            Axios.post('/worker/admin/vehicle-specifications/list_create/', newData)
                .then(res => {
                    if (hasNextStepPermission) {
                        setStep(2);
                        setStep1Id(res.data.id);
                        setReload(prev => !prev);
                    } else {
                        setReload(prev => !prev);
                        setIsModalOpen(false);
                    }
                })
                .catch(() => {})
                .finally(() => {
                    setLoader(false);
                });
        }
    };

    return (
        <StepsStyle>
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
                    title='برند'
                    placeHolder='برند خودرو'
                    type='text'
                    icon={Bus}
                    detail={{
                        ...register('car_brand', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.car_brand}
                />
                <InputComponent
                    title='مدل'
                    placeHolder='مدل خودرو'
                    type='text'
                    icon={Bus}
                    detail={{
                        ...register('car_model', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.car_model}
                />
                <InputComponent
                    title='نام آورنده'
                    placeHolder='نام آورنده خودرو'
                    type='text'
                    icon={Bus}
                    detail={{
                        ...register('customer_name', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.customer_name}
                />
                <InputComponent
                    title='شماره موبایل'
                    placeHolder='09----------'
                    type='tel'
                    icon={PhoneIcon}
                    detail={{
                        ...register('customer_mobile_number', {
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
                    maxLength={11}
                    error={errors?.customer_mobile_number}
                />
                <div className='Plaque_Field'>
                    <label>پلاک خودرو</label>
                    <div className='input_field'>
                        <InputComponent
                            maxLength={2}
                            placeHolder='--'
                            type='tel'
                            className='Plaque_inputs'
                            detail={{
                                ...register('plaque_4', {
                                    required: true
                                })
                            }}
                            error={errors?.plaque_4}
                        />
                        <InputComponent
                            placeHolder='---'
                            maxLength={3}
                            type='tel'
                            className='Plaque_inputs'
                            detail={{
                                ...register('plaque_3', {
                                    required: true
                                })
                            }}
                            error={errors?.plaque_3}
                        />
                        <div className='auto_complete'>
                            <Controller
                                control={control}
                                name='plaque_2'
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <Autocomplete
                                            options={Alphabet}
                                            value={value}
                                            defaultValue={Alphabet}
                                            filterSelectedOptions
                                            getOptionLabel={option => option.label}
                                            onChange={(_, newValue) => {
                                                onChange(newValue);
                                            }}
                                            sx={{ width: '100%' }}
                                            renderInput={params => <TextField {...params} />}
                                        />
                                    );
                                }}
                            />
                        </div>

                        <InputComponent
                            placeHolder='--'
                            maxLength={2}
                            type='tel'
                            className='Plaque_inputs'
                            detail={{
                                ...register('plaque_1', {
                                    required: true
                                })
                            }}
                            error={errors?.plaque_1}
                        />
                        <div className='flag'>
                            <span className='green'></span>
                            <span></span>
                            <span className='red'></span>
                        </div>
                    </div>
                </div>
                <div className='button_box'>
                    <FormButton
                        text={hasNextStepPermission ? 'بعدی' : 'ثبت'}
                        icon={hasNextStepPermission && Arrow}
                        loading={loader}
                        className='login'
                        backgroundColor={'#174787'}
                        height='48px'
                        type='submit'
                        disabled={!userPermissions.includes(PERMISSION.VEHICLE_SPECIFICATIONS.ADD_EDIT_VEHICLE_DETAIILS)}
                    />
                </div>
            </form>
        </StepsStyle>
    );
};

export default CarDetail;

const Alphabet = [
    {
        label: 'الف',
        value: 'الف'
    },
    {
        label: 'ب',
        value: 'ب'
    },
    {
        label: 'پ',
        value: 'پ'
    },
    {
        label: 'ت',
        value: 'ت'
    },
    {
        label: 'ث',
        value: 'ث'
    },
    {
        label: 'ج',
        value: 'ج'
    },
    {
        label: 'چ',
        value: 'چ'
    },
    {
        label: 'ح',
        value: 'ح'
    },
    {
        label: 'خ',
        value: 'خ'
    },
    {
        label: 'د',
        value: 'د'
    },
    {
        label: 'ذ',
        value: 'ذ'
    },
    {
        label: 'ر',
        value: 'ر'
    },
    {
        label: 'ز',
        value: 'ز'
    },
    {
        label: 'ژ',
        value: 'ژ'
    },
    {
        label: 'س',
        value: 'س'
    },
    {
        label: 'ش',
        value: 'ش'
    },
    {
        label: 'ص',
        value: 'ص'
    },
    {
        label: 'ض',
        value: 'ض'
    },
    {
        label: 'ط',
        value: 'ط'
    },
    {
        label: 'ظ',
        value: 'ظ'
    },
    {
        label: 'ع',
        value: 'ع'
    },
    {
        label: 'غ',
        value: 'غ'
    },
    {
        label: 'ف',
        value: 'ف'
    },
    {
        label: 'ق',
        value: 'ق'
    },
    {
        label: 'ک',
        value: 'ک'
    },
    {
        label: 'گ',
        value: 'گ'
    },
    {
        label: 'ل',
        value: 'ل'
    },
    {
        label: 'م',
        value: 'م'
    },
    {
        label: 'ن',
        value: 'ن'
    },
    {
        label: 'و',
        value: 'و'
    },
    {
        label: 'ه',
        value: 'ه'
    },
    {
        label: 'ی',
        value: 'ی'
    },
    {
        label: 'D',
        value: 'D'
    },
    {
        label: 'S',
        value: 'S'
    }
];
