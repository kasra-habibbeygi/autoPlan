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

const ExecuteDate = ({ setStep, setAllDetail, allDetail, setIsModalOpen, setReload, chosenEditItemDetails }) => {
    const [buttonLoading, setButtonLoading] = useState(false);

    const { control, handleSubmit, formState, setValue } = useForm({
        defaultValues: {
            started_time: '',
            finished_time: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    useEffect(() => {
        if (chosenEditItemDetails) {
            setValue('started_time', tools.changeIsoDateToTimeStamp(chosenEditItemDetails.start_action_date));
            setValue('finished_time', tools.changeIsoDateToTimeStamp(chosenEditItemDetails.end_action_date));
        }
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setButtonLoading(true);

        const newData = {
            start_action_date: tools.changeTimeStampToIsoDate(data.started_time),
            end_action_date: tools.changeTimeStampToIsoDate(data.finished_time)
        };

        Axios.put(`reform_action/set_action_date/?id=${allDetail?.mainId}`, newData)
            .then(() => {
                setIsModalOpen(false);
                setReload(prev => !prev);
                setAllDetail(prev => ({
                    ...prev,
                    execute_date: data
                }));
                setStep(1);
            })
            .finally(() => setButtonLoading(false));
    };

    console.log(chosenEditItemDetails);

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
                                />
                            );
                        }}
                    />
                </div>

                <FormButton
                    text='بعدی'
                    loading={buttonLoading}
                    type='submit'
                    backgroundColor={'#174787'}
                    color={'white'}
                    height={48}
                    icon={arrow}
                />
            </form>
        </Style>
    );
};

export default ExecuteDate;
