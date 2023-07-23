/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Axios from '../../../configs/axios';

//Assets
import { FormWrapper } from './reception-form.style';
import brokenArrow from './../../../assets/images/global/brokenArrow.svg';
import chart from './../../../assets/images/icons/chart.svg';

//Components
import FormButton from '../../form-groups/form-button';
import InputComponent from './../../form-groups/input-component';
import { toast } from 'react-hot-toast';

const ReceptionForm = () => {
    const [addButtonStatus, setAddButtonStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [specificId, setSpecificId] = useState();
    const { register, handleSubmit, formState, setValue } = useForm({
        mode: 'onTouched'
    });
    const { errors } = formState;

    const formSubmit = data => {
        const sum = parseInt(data.in_person) + parseInt(data.by_phone) + parseInt(data.online);
        if (sum === 100) {
            setLoading(true);
            if (!addButtonStatus) {
                Axios.post('worker/admin/acceptance-settings/list_create/', data)
                    .then(() => {
                        setReload(!reload);
                        toast.success('تنظیمات پذیرش با موفقیت ثبت شد');
                    })
                    .catch(() => {})
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                Axios.put(`/worker/admin/acceptance-settings/update/?pk=${specificId}`, data)
                    .then(() => {
                        setReload(!reload);
                        toast.error('تنظیمات پذیرش با موفقیت ثبت شد');
                    })
                    .catch(() => {})
                    .finally(() => {
                        setLoading(false);
                    });
            }
        } else {
            toast.error('مجموع عدد های وارد شده باید مساوی 100 باشد !');
        }
    };

    useEffect(() => {
        Axios.get('worker/admin/acceptance-settings/list_create/').then(res => {
            if (res.data.status !== 'fail') {
                setAddButtonStatus(true);
                setValue('in_person', res.data.results[0].in_person);
                setValue('online', res.data.results[0].online);
                setValue('by_phone', res.data.results[0].by_phone);
                setSpecificId(res.data.results[0].id);
            } else {
                setAddButtonStatus(false);
            }
        });
    }, [reload]);

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
                        ...register('online', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.online}
                />
                <InputComponent
                    title='پذیرش تلفنی'
                    placeHolder='تلفنی'
                    icon={chart}
                    type='text'
                    detail={{
                        ...register('by_phone', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.by_phone}
                />
                <InputComponent
                    title='پذیرش حضوری'
                    placeHolder='حضوری'
                    icon={chart}
                    type='text'
                    detail={{
                        ...register('in_person', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.in_person}
                />
                <FormButton
                    text={addButtonStatus ? 'ویرایش' : 'ثبت'}
                    icon={brokenArrow}
                    loading={loading}
                    type='submit'
                    backgroundColor='#174787'
                    color='white'
                    height={48}
                />
            </form>
        </FormWrapper>
    );
};

export default ReceptionForm;
