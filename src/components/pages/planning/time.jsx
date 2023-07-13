import React from 'react';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

//Assets
import Arrow from './../../../assets/images/global/arrow.svg';
import CalendarDate from './../../../assets/images/icons/CalendarDate.svg';
import ClockSquare from './../../../assets/images/icons/ClockSquare.svg';
import clockDot from './../../../assets/images/icons/clockDot.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const Time = () => {
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            proximate_start: '',
            proximate_finish: '',
            real_start: '',
            real_finish: '',
            start_time: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const formSubmit = data => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            <Grid container columnSpacing={4}>
                <Grid item xs={12} md={6}>
                    <InputComponent
                        title='زمان تقریبی شروع'
                        placeHolder='1402/04/08 - 20:20'
                        type='text'
                        icon={CalendarDate}
                        detail={{
                            ...register('proximate_start', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.proximate_start}
                    />
                    <InputComponent
                        title='زمان واقعی شروع'
                        placeHolder='1402/04/08 - 19:20'
                        type='text'
                        icon={ClockSquare}
                        detail={{
                            ...register('real_start', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.real_start}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputComponent
                        title='زمان تقریبی پایان'
                        placeHolder='1402/04/08 - 20:20'
                        type='text'
                        icon={CalendarDate}
                        detail={{
                            ...register('proximate_finish', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.proximate_finish}
                    />
                    <InputComponent
                        title='زمان واقعی پایان'
                        placeHolder='1402/04/08 - 19:20'
                        type='text'
                        icon={ClockSquare}
                        detail={{
                            ...register('real_finish', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.real_finish}
                    />
                </Grid>
            </Grid>

            <div className='summary'>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <div className='right_field'>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <div className='pill'>
                                        <p>تاخیر در شروع</p>
                                        <div>
                                            <img src={clockDot} alt='' />
                                            یک ساعت تاخیر در شروع
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div className='pill'>
                                        <p>تاخیر در شروع</p>
                                        <div>
                                            <img src={clockDot} alt='' />
                                            یک ساعت تاخیر در شروع
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div className='pill'>
                                        <p>تاخیر در شروع</p>
                                        <div>
                                            <img src={clockDot} alt='' />
                                            یک ساعت تاخیر در شروع
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div className='pill'>
                                        <p>تاخیر در شروع</p>
                                        <div>
                                            <img src={clockDot} alt='' />
                                            یک ساعت تاخیر در شروع
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <div className='left_field'>
                            <InputComponent
                                title='زمان تقریبی شروع'
                                placeHolder='1402/04/08 - 20:20'
                                type='text'
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
                        </div>
                    </Grid>
                </Grid>
            </div>
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

export default Time;
