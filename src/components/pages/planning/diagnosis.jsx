import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';

//Assets
import Arrow from './../../../assets/images/global/arrow.svg';
import ShockAbsorber from './../../../assets/images/icons/ShockAbsorber.svg';
import UserHandUp from './../../../assets/images/icons/UserHandUp.svg';
import ClockSquare from './../../../assets/images/icons/ClockSquare.svg';
import clockDot from './../../../assets/images/icons/clockDot.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

//Mui
import { Autocomplete, Grid, TextField } from '@mui/material';
import TimePicker from '../../form-groups/time-picker';

const Diagnosis = ({ setStep, Step1Id, setStep2Id }) => {
    const [loader, setLoader] = useState(false);

    const [postsList, SetPostsList] = useState();

    const { register, handleSubmit, formState, control } = useForm({
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        Axios.get('/worker/admin/capacity-measurement/list_create/date_now=true').then(res => {
            console.log(res.data.results);
            let posts = res.data.results.map(item => ({
                label: item?.user_info?.personnel.fullname,
                value: item?.user_info?.personnel.id,
                station: item?.type?.code
            }));

            SetPostsList(posts);
        });
    }, []);
    const formSubmit = data => {
        const newData = {
            pyramid_number: data.pyramid_number,
            repairman: data.repairman,
            required_pieces: data.required_pieces,
            type_of_repair: data.type_of_repair,
            vehicle_specifications: Step1Id,
            approximate_start_time: `${data.approximate_start_time_hour}:${data.approximate_start_time_min}`,
            approximate_end_time: `${data.approximate_end_time_hour}:${data.approximate_end_time_min}`
        };

        Axios.post('/worker/admin/diagnosis/list_create/', newData)
            .then(res => {
                setStep(3);
                setStep2Id(res.data.id);
            })
            .catch(() => {})
            .finally(() => {
                setLoader(false);
            });
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
                            ...register('type_of_repair', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.type_of_repair}
                    />
                    <div className='auto_complete_wrapper'>
                        <p className='auto_complete_title'>نام تعمیرکار</p>
                        <div className='auto_complete'>
                            <Controller
                                control={control}
                                name='repairman'
                                rules={{ required: 'این فیلد اجباری است' }}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <Autocomplete
                                            options={postsList}
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
                    </div>

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
                    <TimePicker
                        title='زمان تقریبی شروع'
                        hourDetail={{
                            ...register('approximate_start_time_hour', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        minDetail={{
                            ...register('approximate_start_time_min', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                    />

                    <TimePicker
                        title='زمان تقریبی پایان'
                        hourDetail={{
                            ...register('approximate_end_time_hour', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        minDetail={{
                            ...register('approximate_end_time_min', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                    />
                    <InputComponent
                        title='قطعات مورد نیاز تعمیرات'
                        placeHolder='قطعات مورد نیاز تعمیرات برای تعمیر'
                        type='text'
                        detail={{
                            ...register('required_pieces', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.required_pieces}
                    />
                </Grid>
            </Grid>

            <FormButton
                text='بعدی'
                icon={Arrow}
                loading={loader}
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
