import React from 'react';
import { useForm } from 'react-hook-form';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import add from '../../../assets/images/corrective/Add.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-button/form-button';

const Action = ({ setStep }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = () => {};

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className='inputField'>
                    <InputComponent
                        title='اقدام'
                        icon={Question}
                        type='text'
                        placeHolder='مشکل خود را بنویسید'
                        detail={{
                            ...register('action', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.action}
                    />
                    <div className='add'>
                        <img src={add} alt='add' />
                    </div>
                </div>
                <FormButton
                    text='بعدی'
                    loading={false}
                    type='submit'
                    onClick={() => {
                        setStep(3);
                    }}
                />{' '}
            </form>
        </Style>
    );
};

export default Action;
