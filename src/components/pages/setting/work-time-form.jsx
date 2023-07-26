/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Axios from '../../../configs/axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

//Assets
import { FormWrapper } from './work-time-form.style';
import brokenArrow from './../../../assets/images/global/brokenArrow.svg';

//Components
import FormButton from '../../form-groups/form-button';
import TimePicker from '../../form-groups/time-picker';

const WorkTimeForm = () => {
    const { register, handleSubmit, setValue } = useForm({
        mode: 'onTouched'
    });

    const [buttonLoader, setButtonLoader] = useState(false);
    const [reload, setReload] = useState(false);
    const [getTime, setGetTime] = useState();

    const formSubmit = data => {
        setButtonLoader(true);
        const newData = {
            start_time: `${data.approximate_start_time_hour}:${data.approximate_start_time_min}`,
            end_time: `${data.approximate_end_time_hour}:${data.approximate_end_time_min}`
        };

        if (getTime?.length > 0) {
            Axios.put(`worker/admin/representation-working-hours/update/?pk=${getTime[0].id}`, newData)
                .then(() => {
                    toast.success('ساعتی کاری شما با موفقیت ثبت شد');
                    setReload(!reload);
                })
                .catch(() => {})
                .finally(() => {
                    setButtonLoader(false);
                });
        } else {
            Axios.post('/worker/admin/representation-working-hours/list_create/', newData)
                .then(() => {
                    toast.success('ساعتی کاری شما با موفقیت ثبت شد');
                    setReload(!reload);
                })
                .finally(() => {
                    setButtonLoader(false);
                });
        }
    };

    useEffect(() => {
        Axios.get('worker/admin/representation-working-hours/list_create/').then(res => {
            setGetTime(res.data.results);
            if (res.data.results.length) {
                const start_time = res.data.results[0].start_time.split(':');
                const end_time = res.data.results[0].end_time.split(':');

                setValue('approximate_start_time_hour', start_time[0]);
                setValue('approximate_start_time_min', start_time[1]);
                setValue('approximate_end_time_hour', end_time[0]);
                setValue('approximate_end_time_min', end_time[1]);
            }
        });
    }, [reload]);

    return (
        <FormWrapper>
            <p className='title'>ساعت کار نمایندگی</p>
            <form onSubmit={handleSubmit(formSubmit)}>
                <TimePicker
                    title='زمان شروع کار نمایندگی'
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
                    title='زمان پایان کار نمایندگی'
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
                <FormButton
                    text={getTime?.length > 0 ? 'ویرایش' : 'ثبت'}
                    icon={brokenArrow}
                    type='submit'
                    backgroundColor='#174787'
                    color='white'
                    height={48}
                    loading={buttonLoader}
                />
            </form>
        </FormWrapper>
    );
};

export default WorkTimeForm;
