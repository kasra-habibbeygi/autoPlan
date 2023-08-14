/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';
import { v4 as uuidv4 } from 'uuid';
import PERMISSION from '../../../utils/permission.ts';
import { useSelector } from 'react-redux';

//Assets
import Arrow from './../../../assets/images/global/arrow.svg';
import ShockAbsorber from './../../../assets/images/icons/ShockAbsorber.svg';
import UserHandUp from './../../../assets/images/icons/UserHandUp.svg';
import plus from './../../../assets/images/icons/plus.svg';
import closeIcon from './../../../assets/images/global/closeIcon.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

//Mui
import { Autocomplete, CircularProgress, Grid, TextField } from '@mui/material';
import TimePicker from '../../form-groups/time-picker';

const Diagnosis = ({ setStep, Step1Id, setStep2Id, modalFormStatus, chosenEditItemDetails, setReload, setIsModalOpen }) => {
    const userPermissions = useSelector(state => state.User.info.permission);
    const [loader, setLoader] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [postsList, SetPostsList] = useState();
    const [partsInputValue, setPartsInputValue] = useState('');
    const [partsArray, setPartsArray] = useState([]);

    const hasNextStepPermission = userPermissions.includes(PERMISSION.VEHICLE_SPECIFICATIONS.ADD_EDIT_TIME);

    const addInputPartRef = useRef();

    const { register, handleSubmit, formState, control, setValue } = useForm({
        defaultValues: {
            type_of_repair: '',
            repairman: '',
            pyramid_number: '',
            approximate_start_time_hour: '',
            approximate_start_time_min: '',
            approximate_end_time_hour: '',
            approximate_end_time_min: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        setDataLoading(true);
        Axios.get('/worker/admin/capacity-measurement/list_create/?date_now=true')
            .then(res => {
                let posts = res.data.results.map(item => ({
                    label: `${item?.user_info?.personnel?.fullname} - ${item?.user_info?.organizational_position_info.title} - ${
                        item?.user_info?.code ? item?.user_info?.code : ''
                    }`,
                    value: item?.id
                }));
                SetPostsList(posts);
                if (modalFormStatus === 'edit' && chosenEditItemDetails?.diagnosis_info?.id) {
                    if (chosenEditItemDetails) {
                        setValue('type_of_repair', chosenEditItemDetails?.diagnosis_info?.type_of_repair);
                        setValue('repairman', {
                            label: `${chosenEditItemDetails?.diagnosis_info?.repairman_info?.user_info?.personnel?.fullname} - ${
                                chosenEditItemDetails?.diagnosis_info?.repairman_info?.user_info?.organizational_position_info?.title
                            } - ${
                                chosenEditItemDetails?.diagnosis_info?.repairman_info?.user_info?.code
                                    ? chosenEditItemDetails?.diagnosis_info?.repairman_info?.user_info?.code
                                    : ''
                            }`,
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
            type_of_repair: data.type_of_repair,
            vehicle_specifications: Step1Id,
            approximate_start_time: `${data?.approximate_start_time_hour}:${data?.approximate_start_time_min}`,
            approximate_end_time: `${data?.approximate_end_time_hour}:${data.approximate_end_time_min}`,
            required_pieces: partsArray.map(item => item.label)
        };

        if (modalFormStatus === 'edit' && chosenEditItemDetails?.diagnosis_info?.id) {
            Axios.put(`/worker/admin/diagnosis/retrieve_update/?pk=${chosenEditItemDetails?.diagnosis_info?.id}`, newData)
                .then(res => {
                    if (hasNextStepPermission) {
                        setStep(3);
                        setStep2Id(res.data.id);
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
            Axios.post('/worker/admin/diagnosis/list_create/', newData)
                .then(res => {
                    if (hasNextStepPermission) {
                        setStep(3);
                        setStep2Id(res.data.id);
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

    const addPartsHandler = () => {
        if (partsInputValue.trim()) {
            setPartsArray(prev => [...prev, { id: uuidv4(), label: partsInputValue }]);
            setPartsInputValue('');

            addInputPartRef.current.focus();
        }
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
                                    ...register('pyramid_number')
                                }}
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

                            <div className='choose_input'>
                                <p className='choose_input_title'>کد قطعه</p>
                                <div className='choose_input_wrapper'>
                                    <input
                                        type='text'
                                        className='choose_input_filed'
                                        placeholder='کد قطعه'
                                        ref={addInputPartRef}
                                        value={partsInputValue}
                                        onChange={e => setPartsInputValue(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addPartsHandler();
                                            }
                                        }}
                                    />
                                    <FormButton icon={plus} width='fit-content' padding='5px' onClick={addPartsHandler} />
                                </div>
                            </div>

                            <div className='options_array'>
                                {partsArray.map(item => (
                                    <div
                                        className='options_wrapper'
                                        key={item.id}
                                        onClick={() => setPartsArray(prev => prev.filter(filed => filed !== item))}
                                    >
                                        <p className='options_text'>{item.label}</p>
                                        <img src={closeIcon} className='options_img' />
                                    </div>
                                ))}
                            </div>
                        </Grid>
                    </Grid>

                    <FormButton
                        text={hasNextStepPermission ? 'بعدی' : 'ثبت'}
                        icon={hasNextStepPermission && Arrow}
                        loading={loader}
                        width='fit-content'
                        className='submit'
                        backgroundColor={'#174787'}
                        onClick={() => {}}
                        height='48px'
                        type='submit'
                        disabled={!userPermissions.includes(PERMISSION.VEHICLE_SPECIFICATIONS.ADD_EDIT_DIAGNOSIS)}
                    />
                </>
            )}
        </form>
    );
};

export default Diagnosis;
