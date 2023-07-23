/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from './../../../configs/axios';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';

//Components
import FormButton from '../../form-groups/form-button';

const Result = ({ setStep, setAllDetail, allDetail, setReload, chosenEditItemDetails }) => {
    const [buttonLoading, setButtonLoading] = useState(false);

    const { register, handleSubmit, formState, setValue } = useForm({
        defaultValues: {
            action_result: ''
        },
        mode: 'onTouched'
    });

    useEffect(() => {
        if (chosenEditItemDetails?.action_result) {
            setValue('action_result', chosenEditItemDetails?.action_result);
        }
    }, [chosenEditItemDetails]);

    const { errors, isDirty } = formState;

    const formSubmit = data => {
        setButtonLoading(true);

        if (isDirty) {
            Axios.put(`reform_action/set_action_result/?id=${allDetail?.mainId}`, data)
                .then(() => {
                    setReload(prev => !prev);
                    setAllDetail(prev => ({
                        ...prev,
                        action_result: data.action_result
                    }));
                    setStep(7);
                })
                .finally(() => setButtonLoading(false));
        } else {
            setAllDetail(prev => ({
                ...prev,
                action_result: data.action_result
            }));
            setStep(7);
        }
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className={errors?.action_result ? 'text_area text_area_error' : 'text_area'}>
                    <p className='title'>نتیجه</p>
                    <div>
                        <textarea
                            rows='8'
                            placeholder='نتیجه اقدام اصلاحی'
                            {...register('action_result', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })}
                        ></textarea>
                        <img src={Question} />
                    </div>
                    <p className='error'>{errors?.action_result?.message}</p>
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

export default Result;
