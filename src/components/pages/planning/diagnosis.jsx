/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';

//Assets
import Arrow from './../../../assets/images/global/arrow.svg';
import ShockAbsorber from './../../../assets/images/icons/ShockAbsorber.svg';
import UserHandUp from './../../../assets/images/icons/UserHandUp.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

//Mui
import { Autocomplete, CircularProgress, Grid, TextField } from '@mui/material';
import TimePicker from '../../form-groups/time-picker';

const Diagnosis = ({ setStep, Step1Id, setStep2Id, modalFormStatus, chosenEditItemDetails }) => {
    const [loader, setLoader] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    const [postsList, SetPostsList] = useState();

    const { register, handleSubmit, formState, control, setValue } = useForm({
        defaultValues: {
            type_of_repair: '',
            repairman: '',
            pyramid_number: '',
            approximate_start_time_hour: '',
            approximate_start_time_min: '',
            approximate_end_time_hour: '',
            approximate_end_time_min: '',
            required_pieces: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        setDataLoading(true);
        Axios.get('/worker/admin/capacity-measurement/list_create/')
            .then(res => {
                let posts = res.data.results.map(item => ({
                    label: item?.user_info?.personnel.fullname,
                    value: item?.id
                }));
                SetPostsList(posts);
                if (modalFormStatus === 'edit') {
                    if (chosenEditItemDetails) {
                        setValue('type_of_repair', chosenEditItemDetails?.diagnosis_info?.type_of_repair);
                        setValue('repairman', {
                            label: chosenEditItemDetails?.diagnosis_info?.repairman_info?.user_info?.personnel?.fullname,
                            value: chosenEditItemDetails?.diagnosis_info?.repairman_info?.id
                        });
                        setValue('pyramid_number', chosenEditItemDetails?.diagnosis_info?.pyramid_number);
                        setValue(
                            'approximate_start_time_hour',
                            chosenEditItemDetails?.diagnosis_info?.approximate_start_time[0] +
                                chosenEditItemDetails?.diagnosis_info?.approximate_start_time[1]
                        );
                        setValue(
                            'approximate_start_time_min',
                            chosenEditItemDetails?.diagnosis_info?.approximate_start_time[3] +
                                chosenEditItemDetails?.diagnosis_info?.approximate_start_time[4]
                        );
                        setValue(
                            'approximate_end_time_hour',
                            chosenEditItemDetails?.diagnosis_info?.approximate_end_time[0] +
                                chosenEditItemDetails?.diagnosis_info?.approximate_end_time[1]
                        );
                        setValue(
                            'approximate_end_time_min',
                            chosenEditItemDetails?.diagnosis_info?.approximate_end_time[3] +
                                chosenEditItemDetails?.diagnosis_info?.approximate_end_time[4]
                        );
                        setValue('required_pieces', chosenEditItemDetails?.diagnosis_info?.required_pieces);
                    }
                }
            })
            .finally(() => setDataLoading(false));
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setLoader(true);

        const newData = {
            pyramid_number: data.pyramid_number,
            repairman: data.repairman.value,
            required_pieces: data.required_pieces,
            type_of_repair: data.type_of_repair,
            vehicle_specifications: Step1Id,
            approximate_start_time: `${data?.approximate_start_time_hour}:${data?.approximate_start_time_min}`,
            approximate_end_time: `${data?.approximate_end_time_hour}:${data.approximate_end_time_min}`
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
            {dataLoading ? (
                <div className='loading'>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <Grid container spacing={4}>
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
                                <div className={errors?.repairman?.message ? 'auto_complete auto_complete_error' : 'auto_complete'}>
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
                                                        onChange(newValue);
                                                    }}
                                                    sx={{ width: '100%' }}
                                                    renderInput={params => <TextField {...params} />}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <p className='auto_complete_error_message'>{errors?.repairman?.message}</p>
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
                                error={(errors?.approximate_start_time_hour || errors?.approximate_start_time_min) && 'این فیلد اجباری است'}
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
                                error={(errors?.approximate_end_time_hour || errors?.approximate_end_time_min) && 'این فیلد اجباری است'}
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
                </>
            )}
        </form>
    );
};

export default Diagnosis;
