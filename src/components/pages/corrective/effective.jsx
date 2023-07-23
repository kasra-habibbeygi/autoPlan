/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from './../../../configs/axios';

//Assets
import user from '../../../assets/images/icons/User.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';
import DatePickerComponent from '../../form-groups/date-picker';
import tools from '../../../utils/tools';
import { toast } from 'react-hot-toast';

const Effective = ({ setStep, setAllDetail, allDetail, setReload, chosenEditItemDetails, setIsModalOpen }) => {
    const [buttonLoading, setButtonLoading] = useState(false);

    const { register, handleSubmit, formState, control, setValue } = useForm({
        defaultValues: {
            effective_date: '',
            inCharge_person: ''
        },
        mode: 'onTouched'
    });

    const { errors, isDirty } = formState;

    useEffect(() => {
        if (chosenEditItemDetails?.effective_control_agent && chosenEditItemDetails?.effective_control_date) {
            setValue('effective_date', tools.changeIsoDateToTimeStamp(chosenEditItemDetails?.effective_control_date));
            setValue('inCharge_person', chosenEditItemDetails?.effective_control_agent);
        }
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setButtonLoading(true);

        const newData = {
            effective_control_agent: data?.inCharge_person,
            effective_control_date: tools.changeTimeStampToIsoDate(data?.effective_date)
        };

        if (isDirty) {
            Axios.put(`reform_action/set_action_effective/?id=${allDetail?.mainId}`, newData)
                .then(() => {
                    setReload(prev => !prev);
                    setAllDetail(prev => ({
                        ...prev,
                        effective_detail: data
                    }));
                    setIsModalOpen(false);
                    setStep(1);
                    toast.success('با موفقیت ثبت گردید');
                })
                .catch(() => {})
                .finally(() => setButtonLoading(false));
        } else {
            setAllDetail(prev => ({
                ...prev,
                effective_detail: data
            }));
            setIsModalOpen(false);
            setStep(1);
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
                            />
                        );
                    }}
                />

                <InputComponent
                    title='مسئول کنترل اثر بخشی'
                    icon={user}
                    type='text'
                    placeHolder='نام مسئول'
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
                <FormButton text='ثبت' loading={buttonLoading} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
            </form>
        </Style>
    );
};

export default Effective;
