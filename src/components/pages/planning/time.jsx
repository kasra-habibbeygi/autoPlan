/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';
import { useSelector } from 'react-redux';
import PERMISSION from '../../../utils/permission.ts';

//Assets
import Arrow from './../../../assets/images/global/arrow.svg';
import clockDot from './../../../assets/images/icons/clockDot.svg';

//Components
import FormButton from '../../form-groups/form-button';
import TimePicker from '../../form-groups/time-picker';

// Helpers
function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}

function timeToSeconds(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60;
    return totalSeconds;
}

const Time = ({ Step2Id, modalFormStatus, chosenEditItemDetails, setStep, setReload, setIsModalOpen }) => {
    const userPermissions = useSelector(state => state.User.info.permission);

    const [deviationList, setDeviationList] = useState([]);
    const [reasonValue, setReasonValue] = useState();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [exactTime, setExactTime] = useState({
        start: '',
        end: ''
    });

    const [finalResults, setFinalResults] = useState({
        end: {
            bigger: 0,
            lower: 0
        },
        start: {
            bigger: 0,
            lower: 0
        }
    });

    const { register, handleSubmit, formState, setValue } = useForm({
        defaultValues: {
            proximate_start_hour: '',
            proximate_start_min: '',
            proximate_finish_hour: '',
            proximate_finish_min: '',
            real_start_hour: '',
            real_start_min: '',
            real_finish_hour: '',
            real_finish_min: ''
        },
        mode: 'onTouched'
    });
    const { errors, submitCount } = formState;

    useEffect(() => {
        Axios.get('/worker/admin/reason-for-deviation/list_create/').then(res => {
            let posts = res.data.results.map(item => ({
                label: item.reason,
                value: item.id
            }));

            let filteredPosts = posts?.filter(
                item => item.value === chosenEditItemDetails?.time_to_troubleshoot_info?.the_reason_for_the_deviation_info?.id
            )[0];

            setDeviationList(posts);

            if (modalFormStatus === 'edit') {
                setReasonValue(filteredPosts);
            }
        });

        Axios.get('worker/admin/diagnosis/list_create/').then(res => {
            let temp = res.data.results.filter(item => item.id === Step2Id)[0];
            setValue('proximate_finish_hour', temp?.approximate_end_time.split(':')[0]);
            setValue('proximate_finish_min', temp?.approximate_end_time.split(':')[1]);
            setValue('proximate_start_hour', temp?.approximate_start_time.split(':')[0]);
            setValue('proximate_start_min', temp?.approximate_start_time.split(':')[1]);

            if (modalFormStatus === 'edit' && chosenEditItemDetails.time_to_troubleshoot_info.exact_start_time) {
                setValue('real_start_hour', chosenEditItemDetails.time_to_troubleshoot_info.exact_start_time.split(':')[0]);
                setValue('real_start_min', chosenEditItemDetails.time_to_troubleshoot_info.exact_start_time.split(':')[1]);
                setValue('real_finish_hour', chosenEditItemDetails.time_to_troubleshoot_info.exact_end_time.split(':')[0]);
                setValue('real_finish_min', chosenEditItemDetails.time_to_troubleshoot_info.exact_end_time.split(':')[1]);

                timeCounter(
                    chosenEditItemDetails.time_to_troubleshoot_info.exact_start_time.split(':')[0],
                    chosenEditItemDetails.time_to_troubleshoot_info.exact_start_time.split(':')[1],
                    chosenEditItemDetails.time_to_troubleshoot_info.exact_end_time.split(':')[0],
                    chosenEditItemDetails.time_to_troubleshoot_info.exact_end_time.split(':')[1],
                    temp?.approximate_end_time.split(':')[0],
                    temp?.approximate_end_time.split(':')[1],
                    temp?.approximate_start_time.split(':')[0],
                    temp?.approximate_start_time.split(':')[1]
                );
            }
        });
    }, []);

    const formSubmit = data => {
        timeCounter(
            data.real_start_hour,
            data.real_start_min,
            data.real_finish_hour,
            data.real_finish_min,
            data.proximate_finish_hour,
            data.proximate_finish_min,
            data.proximate_start_hour,
            data.proximate_start_min
        );
    };

    const handleSubmitForm = () => {
        setSubmitLoading(true);
        const newData = {
            diagnosis: Step2Id,
            exact_start_time: exactTime?.start,
            exact_end_time: exactTime?.end,
            delayed_start: finalResults?.start.bigger === 0 ? '0:0' : finalResults?.start.bigger,
            start_with_haste: finalResults?.start.lower === 0 ? '0:0' : finalResults?.start.lower,
            delayed_end: finalResults?.end.bigger === 0 ? '0:0' : finalResults?.end.bigger,
            end_with_haste: finalResults?.end.lower === 0 ? '0:0' : finalResults?.end.lower,
            the_reason_for_the_deviation: reasonValue?.value
        };

        if (modalFormStatus === 'edit' && chosenEditItemDetails.time_to_troubleshoot_info.exact_start_time) {
            Axios.put(`/worker/admin/time-to-troubleshoot/retrieve_update/?pk=${chosenEditItemDetails?.id}`, newData)
                .then(() => {
                    setStep(1);
                    setReload(prev => !prev);
                    setIsModalOpen('');
                })
                .catch(() => {})
                .finally(() => {
                    setSubmitLoading(false);
                });
        } else {
            Axios.post('worker/admin/time-to-troubleshoot/list_create/', newData)
                .then(() => {
                    setStep(1);
                    setReload(prev => !prev);
                    setIsModalOpen('');
                })
                .catch(() => {})
                .finally(() => {
                    setSubmitLoading(false);
                });
        }
    };

    const timeCounter = (
        real_start_hour,
        real_start_min,
        real_finish_hour,
        real_finish_min,
        proximate_finish_hour,
        proximate_finish_min,
        proximate_start_hour,
        proximate_start_min
    ) => {
        setExactTime({
            start: `${real_start_hour}:${real_start_min}`,
            end: `${real_finish_hour}:${real_finish_min}`
        });

        let proximate_finish = `${proximate_finish_hour}:${proximate_finish_min}`;
        let proximate_start = `${proximate_start_hour}:${proximate_start_min}`;
        let real_finish = `${real_finish_hour}:${real_finish_min}`;
        let real_start = `${real_start_hour}:${real_start_min}`;

        let proximate_finish_sec = timeToSeconds(proximate_finish);
        let proximate_start_sec = timeToSeconds(proximate_start);
        let real_finish_sec = timeToSeconds(real_finish);
        let real_start_sec = timeToSeconds(real_start);

        let timeTemp = real_finish_sec + (proximate_start_sec - real_start_sec);

        setFinalResults({
            ...finalResults,
            end: {
                bigger: proximate_finish_sec - timeTemp < 0 ? secondsToTime(Math.abs(proximate_finish_sec - timeTemp)) : 0,
                lower: proximate_finish_sec - timeTemp > 0 ? secondsToTime(Math.abs(proximate_finish_sec - timeTemp)) : 0
            },
            start: {
                bigger: proximate_start_sec - real_start_sec < 0 ? secondsToTime(Math.abs(proximate_start_sec - real_start_sec)) : 0,
                lower: proximate_start_sec - real_start_sec > 0 ? secondsToTime(Math.abs(proximate_start_sec - real_start_sec)) : 0
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <TimePicker
                        disabled
                        title='زمان تقریبی شروع'
                        hourDetail={{
                            ...register('proximate_start_hour', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        minDetail={{
                            ...register('proximate_start_min', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                    />
                    <br />
                    <TimePicker
                        title='زمان واقعی شروع'
                        hourDetail={{
                            ...register('real_start_hour', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        minDetail={{
                            ...register('real_start_min', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={(errors?.real_start_hour || errors?.real_start_min) && 'این فیلد اجباری است'}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TimePicker
                        disabled
                        title='زمان تقریبی پایان'
                        hourDetail={{
                            ...register('proximate_finish_hour', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        minDetail={{
                            ...register('proximate_finish_min', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                    />
                    <br />
                    <TimePicker
                        title='زمان واقعی پایان'
                        hourDetail={{
                            ...register('real_finish_hour', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        minDetail={{
                            ...register('real_finish_min', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={(errors?.real_finish_hour || errors?.real_finish_min) && 'این فیلد اجباری است'}
                    />
                </Grid>
                <FormButton
                    text='محاسبه'
                    loading={false}
                    width='fit-content'
                    className='submit'
                    backgroundColor={'#174787'}
                    onClick={() => {}}
                    height='48px'
                    type='submit'
                    padding='15px'
                    margin='10px 0 0 0'
                />
            </Grid>

            {finalResults.start.bigger !== 0 ||
            finalResults.start.lower !== 0 ||
            finalResults.end.bigger !== 0 ||
            finalResults.end.lower !== 0 ? (
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
                                                {finalResults.start.bigger ? `${finalResults.start.bigger} تاخیر در شروع` : ' انحراف ندارد'}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div className='pill'>
                                            <p>تاجیل در شروع</p>
                                            <div>
                                                <img src={clockDot} alt='' />
                                                {finalResults.start.lower ? `${finalResults.start.lower} تاخیر در شروع` : ' انحراف ندارد'}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div className='pill'>
                                            <p>تاخیر در پایان</p>
                                            <div>
                                                <img src={clockDot} alt='' />
                                                {finalResults.end.bigger ? `${finalResults.end.bigger} تاخیر در پایان` : ' انحراف ندارد'}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div className='pill'>
                                            <p>تاجیل در پایان</p>
                                            <div>
                                                <img src={clockDot} alt='' />
                                                {finalResults.end.lower ? `${finalResults.end.lower} تاخیر در پایان` : ' انحراف ندارد'}
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
                                        <Autocomplete
                                            options={deviationList}
                                            value={reasonValue}
                                            getOptionLabel={option => option?.label}
                                            onChange={(_, newValue) => {
                                                setReasonValue(newValue);
                                            }}
                                            sx={{ width: '100%' }}
                                            renderInput={params => <TextField {...params} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <FormButton
                        text='ثبت'
                        icon={Arrow}
                        loading={submitLoading}
                        width='fit-content'
                        className='submit'
                        backgroundColor={'#174787'}
                        onClick={handleSubmitForm}
                        height='48px'
                        type='submit'
                        padding='15px'
                        margin={'20px 0 0 0'}
                        disabled={!userPermissions.includes(PERMISSION.VEHICLE_SPECIFICATIONS.ADD_EDIT_TIME)}
                    />
                </div>
            ) : (
                submitCount > 0 && (
                    <>
                        <p>انحرافی وجود ندارد</p>
                        <FormButton
                            text='ثبت'
                            icon={Arrow}
                            loading={submitLoading}
                            width='fit-content'
                            className='submit'
                            backgroundColor={'#174787'}
                            onClick={handleSubmitForm}
                            height='48px'
                            type='submit'
                            padding='15px'
                            margin={'20px 0 0 0'}
                            disabled={!userPermissions.includes(PERMISSION.VEHICLE_SPECIFICATIONS.ADD_EDIT_TIME)}
                        />
                    </>
                )
            )}
        </form>
    );
};

export default Time;
