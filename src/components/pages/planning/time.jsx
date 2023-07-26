import React, { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';

//Assets
import Arrow from './../../../assets/images/global/arrow.svg';
import CalendarDate from './../../../assets/images/icons/CalendarDate.svg';
import ClockSquare from './../../../assets/images/icons/ClockSquare.svg';
import clockDot from './../../../assets/images/icons/clockDot.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const Time = () => {
    const [deviationList, setDeviationList] = useState([]);
    const { register, handleSubmit, formState, control } = useForm({
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

    useEffect(() => {
        Axios.get('/worker/admin/reason-for-deviation/list_create/').then(res => {
            let posts = res.data.results.map(item => ({
                label: item.reason,
                value: item.reason
            }));

            setDeviationList(posts);
        });
    }, []);

    const formSubmit = data => {};

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
                            <div className='auto_complete_wrapper'>
                                <p className='auto_complete_title'>علت انحراف</p>
                                <div className='auto_complete'>
                                    <Controller
                                        control={control}
                                        name='deviation'
                                        rules={{ required: 'این فیلد اجباری است' }}
                                        render={({ field: { onChange, value } }) => {
                                            return (
                                                <Autocomplete
                                                    options={deviationList}
                                                    value={value?.label}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue?.value);
                                                    }}
                                                    sx={{ width: '100%' }}
                                                    renderInput={params => <TextField {...params} />}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <p className='auto_complete_error'>{errors?.deviation?.message}</p>
                            </div>
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
