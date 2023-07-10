import React from 'react';
import { useForm } from 'react-hook-form';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import add from '../../../assets/images/corrective/Add.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const ResponsibleForAction = ({ setStep }) => {
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
                        title='مسئول اقدام'
                        icon={Question}
                        type='text'
                        placeHolder='مسئول اقدام اصلاحی برای رفع مشکل'
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
                    backgroundColor={'#174787'}
                    color={'white'}
                    height={48}
                    onClick={() => {
                        setStep(4);
                    }}
                />{' '}
            </form>
        </Style>
    );
};

export default ResponsibleForAction;
