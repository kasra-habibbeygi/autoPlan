import React from 'react';
import { Controller, useForm } from 'react-hook-form';

//Assets
import Arrow from './../../../assets/images/global/arrow.svg';
import CalendarDate from './../../../assets/images/icons/CalendarDate.svg';
import ShockAbsorber from './../../../assets/images/icons/ShockAbsorber.svg';
import UserHeart from './../../../assets/images/icons/UserHeart.svg';
import UserHandUp from './../../../assets/images/icons/UserHandUp.svg';
import ClockSquare from './../../../assets/images/icons/ClockSquare.svg';
import clockDot from './../../../assets/images/icons/clockDot.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';
import { Grid } from '@mui/material';
import DatePickerComponent from '../../form-groups/date-picker';

const Diagnosis = ({ setStep }) => {
    const { register, handleSubmit, formState, control } = useForm({
        defaultValues: {
            repair_type: '',
            position: '',
            mechanic_code: '',
            pyramid_number: '',
            date: '',
            start_time: '',
            finish_time: '',
            requirement: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const formSubmit = data => {
        setStep(3);
    };

    return (
        <form onSubmit={handleSubmit(formSubmit)} className='form_double_col'>
            <Grid container columnSpacing={4}>
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <InputComponent
                        title='نوع تعمیر'
                        placeHolder='نوع تعمیر خودرو'
                        type='text'
                        icon={ShockAbsorber}
                        detail={{
                            ...register('repair_type', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.repair_type}
                    />
                    <InputComponent
                        title='جایگاه'
                        placeHolder='جایگاه تعمیر خودرو'
                        type='text'
                        icon={UserHeart}
                        detail={{
                            ...register('position', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.position}
                    />
                    <InputComponent
                        title='کد تعمیر کار | نام تعمیر کار'
                        placeHolder='کد | نام تعمیر کار خودرو'
                        type='text'
                        icon={UserHeart}
                        detail={{
                            ...register('mechanic_code', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.mechanic_code}
                    />
                    <InputComponent
                        title='شماره هرم'
                        placeHolder='شماره هرم'
                        type='text'
                        icon={UserHandUp}
                        detail={{
                            ...register('pyramid_number', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.pyramid_number}
                    />
                </Grid>

                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <Controller
                        control={control}
                        name='date'
                        rules={{ required: 'این فیلد اجباری است' }}
                        render={({ field: { onChange, value } }) => {
                            return <DatePickerComponent value={value} onChange={onChange} title='تاریخ' error={errors?.date} />;
                        }}
                    />

                    <InputComponent
                        title='زمان تقریبی شروع'
                        placeHolder='زمان تقریبی شروع تعمیر خودرو'
                        type='text'
                        icon={ClockSquare}
                        detail={{
                            ...register('start_time', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.start_time}
                    />
                    <InputComponent
                        title='زمان تقریبی پایان'
                        placeHolder='زمان تقریبی پایان تعمیر خودرو'
                        type='text'
                        icon={clockDot}
                        detail={{
                            ...register('finish_time', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.finish_time}
                    />
                    <InputComponent
                        title='قطعات مورد نیاز تعمیرات'
                        placeHolder=''
                        type='text'
                        detail={{
                            ...register('requirement', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.requirement}
                    />
                </Grid>
            </Grid>

            <FormButton
                text='بعدی'
                icon={Arrow}
                loading={false}
                width='fit-content'
                className='submit'
                backgroundColor={'#174787'}
                onClick={() => {}}
                height='48px'
                type='submit'
            />
        </form>
    );
};

export default Diagnosis;
