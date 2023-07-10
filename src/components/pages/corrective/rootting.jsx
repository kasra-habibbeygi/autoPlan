import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import add from '../../../assets/images/corrective/Add.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const Rootting = ({ setStep }) => {
    const [inputs, setInputs] = useState([{ name: '', value: '' }]);

    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = () => {};

    const handleAddInput = () => {
        setInputs([...inputs, { name: '', value: '' }]);
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className='inputField'>
                    <InputComponent
                        title='ریشه یابی'
                        icon={Question}
                        type='text'
                        placeHolder='چرا-1 '
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
                    <div className='add' onClick={handleAddInput}>
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
                        setStep(3);
                    }}
                />
            </form>
        </Style>
    );
};

export default Rootting;
