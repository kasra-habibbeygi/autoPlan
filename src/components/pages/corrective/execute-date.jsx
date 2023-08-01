/* eslint-disable vars-on-top */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from './../../../configs/axios';

//Assets
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';

//Components
import FormButton from '../../form-groups/form-button';
import DatePickerComponent from '../../form-groups/date-picker';
import tools from '../../../utils/tools';

const ExecuteDate = ({ setStep, setAllDetail, allDetail, setIsModalOpen, setReload, chosenEditItemDetails, today }) => {
    const [buttonLoading, setButtonLoading] = useState(false);

    const finishedDate = chosenEditItemDetails?.end_time.replaceAll('-', '/');

    const finishedDateToday = new Date(finishedDate);
    const todayDate = new Date(today);

    const isTime = finishedDateToday <= todayDate;

    const { control, handleSubmit, formState, setValue } = useForm({
        defaultValues: {
            started_time: '',
            finished_time: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    useEffect(() => {
        if (allDetail?.execute_date) {
            setValue('started_time', allDetail?.execute_date?.started_time);
            setValue('finished_time', allDetail?.execute_date?.finished_time);
        } else {
            if (chosenEditItemDetails?.start_time && chosenEditItemDetails?.end_time) {
                setValue('started_time', tools.changeDateToTimeStamp(chosenEditItemDetails?.start_time));
                setValue('finished_time', tools.changeDateToTimeStamp(chosenEditItemDetails?.end_time));
            }
        }
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setButtonLoading(true);

        const changedActionPersonsData = [];

        for (const some in allDetail.actionPerson) {
            changedActionPersonsData.push(allDetail.actionPerson[some]);
        }

        let formData = new FormData();

        formData.append('action_officials', JSON.stringify(changedActionPersonsData));

        formData.append('actions_data', JSON.stringify(allDetail.actions.map(item => item.action)));
        formData.append('end_time', tools.changeTimeStampToDate(data?.finished_time));
        formData.append('problem', allDetail.problem);
        formData.append('start_time', tools.changeTimeStampToDate(data?.started_time));
        formData.append('whys_data', JSON.stringify(allDetail.troubleshooting));

        if (chosenEditItemDetails) {
            Axios.put(`/worker/admin/corrective-action/update/?pk=${chosenEditItemDetails.id}`, formData)
                .then(() => {
                    setReload(prev => !prev);
                    setAllDetail(prev => ({
                        ...prev,
                        execute_date: data
                    }));
                    if (isTime) {
                        setStep(6);
                    } else {
                        setIsModalOpen(false);
                        setStep(1);
                    }
                })
                .catch(() => {})
                .finally(() => setButtonLoading(false));
        } else {
            Axios.post('/worker/admin/corrective-action/list_create/', formData)
                .then(() => {
                    setReload(prev => !prev);
                    setAllDetail(prev => ({
                        ...prev,
                        execute_date: data
                    }));
                    if (isTime) {
                        setStep(6);
                    } else {
                        setIsModalOpen(false);
                        setStep(1);
                    }
                })
                .catch(() => {})
                .finally(() => setButtonLoading(false));
        }
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className='inputField'>
                    <Controller
                        control={control}
                        name='started_time'
                        rules={{ required: 'این فیلد اجباری است' }}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <DatePickerComponent
                                    value={value}
                                    onChange={onChange}
                                    title='زمان شروع اقدام اصلاحی'
                                    error={errors?.started_time}
                                    minDate={new Date()}
                                />
                            );
                        }}
                    />
                </div>

                <div className='inputField'>
                    <Controller
                        control={control}
                        name='finished_time'
                        rules={{ required: 'این فیلد اجباری است' }}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <DatePickerComponent
                                    value={value}
                                    onChange={onChange}
                                    title='زمان پایان اقدام اصلاحی'
                                    error={errors?.finished_time}
                                    minDate={new Date()}
                                />
                            );
                        }}
                    />
                </div>

                <FormButton
                    text={isTime ? 'بعدی' : 'ثبت'}
                    loading={buttonLoading}
                    type='submit'
                    backgroundColor={'#174787'}
                    color={'white'}
                    height={48}
                    icon={isTime && arrow}
                />

                <FormButton text='قبلی' backgroundColor='#174787' color='white' height={48} onClick={() => setStep(4)} margin={'20px 0'} />
            </form>
        </Style>
    );
};

export default ExecuteDate;
