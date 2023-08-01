/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const Problem = ({ setStep, setAllDetail, chosenEditItemDetails, allDetail }) => {
    const { register, handleSubmit, formState, setValue } = useForm({
        defaultValues: {
            problem: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    useEffect(() => {
        if (allDetail?.problem) {
            setValue('problem', allDetail?.problem);
        } else {
            if (chosenEditItemDetails) {
                setValue('problem', chosenEditItemDetails?.problem);
            }
        }
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setStep(2);
        setAllDetail(prev => ({
            ...prev,
            problem: data.problem
        }));
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
                <FormButton text='بعدی' type='submit' backgroundColor={'#174787'} color={'white'} height={48} icon={arrow} />
            </form>
        </Style>
    );
};

export default Problem;
