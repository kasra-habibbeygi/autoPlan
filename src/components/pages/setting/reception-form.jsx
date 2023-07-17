import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Axios from '../../../configs/axios';

//Assets
import { FormWrapper } from './reception-form.style';
import brokenArrow from './../../../assets/images/global/brokenArrow.svg';
import chart from './../../../assets/images/icons/chart.svg';

//Components
import FormButton from '../../form-groups/form-button';
import InputComponent from './../../form-groups/input-component';

const ReceptionForm = () => {
    const [addButtonStatus, setAddButtonStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState, control, setValue } = useForm({
        mode: 'onTouched'
    });
    const { errors } = formState;

    const formSubmit = data => {
        Axios.post('acceptation_setting/', data).then(res => {});
    };

    useEffect(() => {
        Axios.get('acceptation_setting/').then(res => {
            if (res.data.status !== 'fail') {
                setAddButtonStatus(false);
                setValue('internet_acceptation_percent', res.data.internet_acceptation_percent);
                setValue('phone_acceptation_percent', res.data.phone_acceptation_percent);
                setValue('appointment_acceptation_percent', res.data.appointment_acceptation_percent);
            } else {
                setAddButtonStatus(true);
            }
        });
    }, []);

    return (
        <FormWrapper>
            <p className='title'>تنظیمات پذیرش</p>
            <form onSubmit={handleSubmit(formSubmit)}>
                <InputComponent
                    title='پذیرش اینترنتی'
                    placeHolder='اینترنتی'
                    icon={chart}
                    type='text'
                    detail={{
                        ...register('internet_acceptation_percent', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.internet_acceptation_percent}
                />
                <InputComponent
                    title='پذیرش تلفنی'
                    placeHolder='تلفنی'
                    icon={chart}
                    type='text'
                    detail={{
                        ...register('phone_acceptation_percent', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.phone_acceptation_percent}
                />
                <InputComponent
                    title='پذیرش حضوری'
                    placeHolder='حضوری'
                    icon={chart}
                    type='text'
                    detail={{
                        ...register('appointment_acceptation_percent', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.appointment_acceptation_percent}
                />
                <FormButton
                    text='ثبت'
                    icon={brokenArrow}
                    loading={loading}
                    type='submit'
                    backgroundColor={'#174787'}
                    color={'white'}
                    height={48}
                    disabled={addButtonStatus}
                />
            </form>
        </FormWrapper>
    );
};

export default ReceptionForm;
