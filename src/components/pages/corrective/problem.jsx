/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from './../../../configs/axios';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const Problem = ({ setStep, setAllDetail, chosenEditItemDetails }) => {
    const [buttonLoading, setButtonLoading] = useState(false);

    const { register, handleSubmit, formState, setValue } = useForm({
        defaultValues: {
            problem: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    useEffect(() => {
        if (chosenEditItemDetails) {
            setValue('problem', chosenEditItemDetails?.problem);
        }
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setButtonLoading(true);

        // if (chosenEditItemDetails) {
        //     Axios.put(`reform_action/problem/?id=${chosenEditItemDetails.id}`, data)
        //         .then(res => {
        //             setStep(2);
        //             setAllDetail(prev => ({
        //                 ...prev,
        //                 problem: data.problem,
        //                 mainId: res.data.id
        //             }));
        //         })
        //         .finally(() => setButtonLoading(false));
        // } else {
        Axios.post('reform_action/problem/', data)
            .then(res => {
                setStep(2);
                setAllDetail(prev => ({
                    ...prev,
                    problem: data.problem,
                    mainId: res.data.id
                }));
            })
            .finally(() => setButtonLoading(false));
        // }
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                <InputComponent
                    title='مشکل'
                    icon={Question}
                    type='text'
                    placeHolder='مشکل خود را بنویسید'
                    detail={{
                        ...register('problem', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.problem}
                />
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

export default Problem;
