/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

//Assets
import user from '../../../assets/images/icons/User.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';
import Axios from './../../../configs/axios';

//Components
import FormButton from '../../form-groups/form-button';
import DatePickerComponent from '../../form-groups/date-picker';
import tools from '../../../utils/tools';
import InputComponent from '../../form-groups/input-component';

const Effective = ({ setStep, setAllDetail, chosenEditItemDetails, setReload, allDetail, today, setIsModalOpen }) => {
    const finishedDate = chosenEditItemDetails?.control_completion_date?.replaceAll('-', '/');

    const finishedDateToday = new Date(finishedDate);
    const todayDate = new Date(today);

    const isTime = finishedDateToday <= todayDate;

    const [buttonLoading, setButtonLoading] = useState(false);

    const { register, handleSubmit, formState, control, setValue } = useForm({
        defaultValues: {
            effective_date: '',
            inCharge_person: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    useEffect(() => {
        if (allDetail?.effective_detail) {
            setValue('effective_date', allDetail?.effective_detail?.effective_date);
            setValue('inCharge_person', allDetail?.effective_detail?.inCharge_person);
        } else {
            if (chosenEditItemDetails?.controller && chosenEditItemDetails?.control_completion_date) {
                setValue('effective_date', tools.changeDateToTimeStamp(chosenEditItemDetails?.control_completion_date));
                setValue('inCharge_person', chosenEditItemDetails.controller);
            }
        }
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setButtonLoading(true);

        const newData = {
            result: allDetail.action_result,
            controller: data?.inCharge_person,
            control_completion_date: tools.changeTimeStampToDate(data?.effective_date)
        };

        if (chosenEditItemDetails.result && chosenEditItemDetails.controller && chosenEditItemDetails.control_completion_date) {
            Axios.put(`/worker/admin/corrective-action/update/?pk=${chosenEditItemDetails.id}`, newData)
                .then(() => {
                    setReload(prev => !prev);
                    setAllDetail(prev => ({
                        ...prev,
                        effective_detail: data
                    }));

                    if (isTime) {
                        setStep(8);
                    } else {
                        setIsModalOpen(false);
                        setStep(1);
                    }
                })
                .catch(() => {})
                .finally(() => setButtonLoading(false));
        } else {
            Axios.put(`/worker/admin/corrective-action/retrieve_update_destroy/?pk=${chosenEditItemDetails?.id}`, newData)
                .then(() => {
                    setReload(prev => !prev);
                    setAllDetail(prev => ({
                        ...prev,
                        effective_detail: data
                    }));

                    if (isTime) {
                        setStep(8);
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
                <Controller
                    control={control}
                    name='effective_date'
                    rules={{ required: 'این فیلد اجباری است' }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <DatePickerComponent
                                value={value}
                                onChange={onChange}
                                title='تاریخ کنترل اثر بخشی'
                                error={errors?.effective_date}
                                minDate={new Date()}
                            />
                        );
                    }}
                />
                <InputComponent
                    title='مسئول کنترل اثر بخشی'
                    icon={user}
                    type='text'
                    detail={{
                        ...register('inCharge_person', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.inCharge_person}
                />

                <FormButton
                    text='بعدی'
                    icon={arrow}
                    type='submit'
                    backgroundColor={'#174787'}
                    color={'white'}
                    height={48}
                    loading={buttonLoading}
                />
                <FormButton text='قبلی' backgroundColor='#174787' color='white' height={48} onClick={() => setStep(6)} margin={'20px 0'} />
            </form>
        </Style>
    );
};

export default Effective;
