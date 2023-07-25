import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';

//Assets
import Arrow from './../../../assets/images/global/arrow.svg';
import ShockAbsorber from './../../../assets/images/icons/ShockAbsorber.svg';
import UserHeart from './../../../assets/images/icons/UserHeart.svg';
import UserHandUp from './../../../assets/images/icons/UserHandUp.svg';
import ClockSquare from './../../../assets/images/icons/ClockSquare.svg';
import clockDot from './../../../assets/images/icons/clockDot.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';
import { Autocomplete, Grid, TextField } from '@mui/material';

const Diagnosis = ({ setStep, Step1Id }) => {
    const [loader, setLoader] = useState(false);

    const [postsList, SetPostsList] = useState();

    const { register, handleSubmit, formState, control } = useForm({
        defaultValues: {
            type_of_repair: '',
            repairman: '',
            pyramid_number: '',
            approximate_start_time: '',
            approximate_end_time: '',
            required_pieces: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        Axios.get('/worker/admin/capacity-measurement/list_create/').then(res => {
            let posts = res.data.results.map(item => ({
                label: item?.user?.fullname,
                value: item?.user?.fullname,
                station: item?.type?.code
            }));

            SetPostsList(posts);
        });
    }, []);
    const formSubmit = data => {
        const newData = {
            ...data,
            vehicle_specifications: Step1Id
        };

        console.log(newData);

        // Axios.post('admission_car_info/', newData)
        //     .then(() => {
        //         setStep(3);
        //     })
        //     .catch(() => {})
        //     .finally(() => {
        //         setLoader(false);
        //     });
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
                    <InputComponent
                        title='زمان تقریبی شروع'
                        placeHolder='زمان تقریبی شروع تعمیر خودرو'
                        type='text'
                        icon={ClockSquare}
                        detail={{
                            ...register('approximate_start_time', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.approximate_start_time}
                    />
                    <InputComponent
                        title='زمان تقریبی پایان'
                        placeHolder='زمان تقریبی پایان تعمیر خودرو'
                        type='text'
                        icon={clockDot}
                        detail={{
                            ...register('approximate_end_time', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.approximate_end_time}
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
