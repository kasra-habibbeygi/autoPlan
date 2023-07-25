/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';

//Assets
import Bus from './../../../assets/images/icons/Bus.svg';
import Arrow from './../../../assets/images/global/arrow.svg';
import PhoneIcon from './../../../assets/images/login/addPhone.svg';
import { StepsStyle } from './steps.style';

//Components
import FormButton from '../../form-groups/form-button';
import InputComponent from '../../form-groups/input-component';
import { Autocomplete, TextField } from '@mui/material';

const CarDetail = ({ setStep }) => {
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, formState, control } = useForm({
        defaultValues: {
            alphabet: Alphabet[0]
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const formSubmit = data => {
        setLoader(true);

        const { plaque1, plaque2, plaque3, alphabet, ...newData1 } = data;

        const newData2 = {
            ...newData1,
            plate_number: [data.plaque1, data.alphabet.value, data.plaque2, data.plaque3]
        };

        Axios.post('admission_car_info/', newData2)
            .then(() => {
                setStep(2);
            })
            .catch(() => {})
            .finally(() => {
                setLoader(false);
            });
    };

    return (
        <StepsStyle>
            <form onSubmit={handleSubmit(formSubmit)}>
                <InputComponent
                    title='برند'
                    placeHolder='برند خودرو'
                    type='text'
                    icon={Bus}
                    detail={{
                        ...register('car_title', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.car_title}
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
                        ...register('car_admissioner', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.car_admissioner}
                />
                <InputComponent
                    title='شماره موبایل'
                    placeHolder='09----------'
                    type='number'
                    icon={PhoneIcon}
                    detail={{
                        ...register('mobile_number', {
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
                    error={errors?.mobile_number}
                />
                <div className='Plaque_Field'>
                    <label>پلاک خودرو</label>
                    <div className='input_field'>
                        <InputComponent
                            placeHolder='--'
                            type='number'
                            className='Plaque_inputs'
                            detail={{
                                ...register('plaque1', {
                                    required: {
                                        value: true
                                    }
                                })
                            }}
                            error={errors?.plaque1}
                        />
                        <InputComponent
                            placeHolder='---'
                            type='number'
                            className='Plaque_inputs'
                            detail={{
                                ...register('plaque2', {
                                    required: {
                                        value: true
                                    }
                                })
                            }}
                            error={errors?.plaque2}
                        />
                        <div className='auto_complete'>
                            <Controller
                                control={control}
                                name='alphabet'
                                rules={{ required: 'این فیلد اجباری است' }}
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
                            type='number'
                            className='Plaque_inputs'
                            detail={{
                                ...register('plaque3', {
                                    required: {
                                        value: true
                                    }
                                })
                            }}
                            error={errors?.plaque3}
                        />
                        <div className='flag'>
                            <span className='green'></span>
                            <span></span>
                            <span className='red'></span>
                        </div>
                    </div>
                </div>
                <FormButton
                    text='بعدی'
                    icon={Arrow}
                    loading={loader}
                    className='login'
                    backgroundColor={'#174787'}
                    onClick={() => {}}
                    height='48px'
                    type='submit'
                />
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
