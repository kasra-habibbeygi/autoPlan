/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';

//Components
import FormButton from '../../form-groups/form-button';
import { toast } from 'react-hot-toast';

const ResultResponsibleForAction = ({ setStep, setAllDetail, allDetail, setReload, chosenEditItemDetails, setIsModalOpen }) => {
    const [buttonLoading, setButtonLoading] = useState(false);

    const { register, handleSubmit, formState, setValue } = useForm({
        defaultValues: {
            effective_result: ''
        },
        mode: 'onTouched'
    });

    useEffect(() => {
        if (chosenEditItemDetails?.action_result) {
            setValue('action_result', chosenEditItemDetails?.action_result);
        }
    }, [chosenEditItemDetails]);

    const { errors } = formState;

    const formSubmit = data => {
        console.log(chosenEditItemDetails);
        console.log(data);
        console.log(allDetail);

        const newData = {
            // result: chosenEditItemDetails?.result,
            // control_completion_date: chosenEditItemDetails?.control_completion_date,
            // result: chosenEditItemDetails?.result
        };
        setButtonLoading(true);
        Axios.put(`/worker/admin/corrective-action/retrieve_update_destroy/?pk=${chosenEditItemDetails?.id}`, newData)
            .then(() => {
                setReload(prev => !prev);
                setAllDetail(prev => ({
                    ...prev,
                    effective_result: data.effective_result
                }));
                setStep(1);

                setIsModalOpen(false);
                toast.success('با موفقیت ثبت گردید');
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setButtonLoading(false));
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className={errors?.effective_result ? 'text_area text_area_error' : 'text_area'}>
                    <p className='title'>نتیجه</p>
                    <div>
                        <textarea
                            rows='8'
                            placeholder='نتیجه اثربخشی'
                            {...register('effective_result', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })}
                        ></textarea>
                        <img src={Question} />
                    </div>
                    <p className='error'>{errors?.effective_result?.message}</p>
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

export default ResultResponsibleForAction;
