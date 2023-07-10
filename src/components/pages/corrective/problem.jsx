import React from 'react';
import { useForm } from 'react-hook-form';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const Problem = ({ setStep }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = () => {};

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
                    loading={false}
                    type='submit'
                    backgroundColor={'#174787'}
                    color={'white'}
                    height={48}
                    onClick={() => {
                        setStep(2);
                    }}
                />
            </form>
        </Style>
    );
};

export default Problem;
