/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';

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

const Time = ({ Step2Id, modalFormStatus, chosenEditItemDetails }) => {
    const [deviationList, setDeviationList] = useState([]);
    const [diagnosisValue, setDiagnosisValue] = useState();
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
    const { register, handleSubmit, formState, control, setValue } = useForm({
        defaultValues: {
            proximate_start_hour: '13',
            proximate_start_min: '00',
            proximate_finish_hour: '15',
            proximate_finish_min: '20',
            real_start_hour: '',
            real_start_min: '',
            real_finish_hour: '',
            real_finish_min: ''
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
        Axios.get('worker/admin/diagnosis/list_create/').then(res => {
            setDiagnosisValue();
            let temp = res.data.results.filter(item => item.vehicle_specifications === Step2Id)[0];
            setValue('proximate_finish_hour', temp?.approximate_end_time.split(':')[0]);
            setValue('proximate_finish_min', temp?.approximate_end_time.split(':')[1]);
            setValue('proximate_start_hour', temp?.approximate_start_time.split(':')[0]);
            setValue('proximate_start_min', temp?.approximate_start_time.split(':')[1]);
        });
    }, []);

    const formSubmit = data => {
        let proximate_finish = `${data.proximate_finish_hour}:${data.proximate_finish_min}`;
        let proximate_start = `${data.proximate_start_hour}:${data.proximate_start_min}`;
        let real_finish = `${data.real_finish_hour}:${data.real_finish_min}`;
        let real_start = `${data.real_start_hour}:${data.real_start_min}`;

        let proximate_finish_sec = timeToSeconds(proximate_finish);
        let proximate_start_sec = timeToSeconds(proximate_start);
        let real_finish_sec = timeToSeconds(real_finish);
        let real_start_sec = timeToSeconds(real_start);

        setFinalResults({
            ...finalResults,
            end: {
                bigger: proximate_finish_sec - real_finish_sec < 0 ? secondsToTime(Math.abs(proximate_finish_sec - real_finish_sec)) : 0,
                lower: proximate_finish_sec - real_finish_sec > 0 ? secondsToTime(Math.abs(proximate_finish_sec - real_finish_sec)) : 0
            },
            start: {
                bigger: proximate_start_sec - real_start_sec < 0 ? secondsToTime(Math.abs(proximate_start_sec - real_start_sec)) : 0,
                lower: proximate_start_sec - real_start_sec > 0 ? secondsToTime(Math.abs(proximate_start_sec - real_start_sec)) : 0
            }
        });
    };

    // console.log(finalResults);

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

            {finalResults.start.bigger !== 0 &&
            finalResults.start.lower !== 0 &&
            finalResults.end.bigger !== 0 &&
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
                                                {finalResults.end.bigger ? `${finalResults.end.bigger} تاخیر در شروع` : ' انحراف ندارد'}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div className='pill'>
                                            <p>تاجیل در پایان</p>
                                            <div>
                                                <img src={clockDot} alt='' />
                                                {finalResults.end.lower ? `${finalResults.end.lower} تاخیر در شروع` : ' انحراف ندارد'}
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
                        padding='15px'
                    />
                </div>
            ) : (
                <></>
            )}
        </form>
    );
};

export default Time;
