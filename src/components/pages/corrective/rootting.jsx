import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import add from '../../../assets/images/corrective/Add.svg';
import arrow from './../../../assets/images/global/arrow.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';
import { RootingStyle } from './rootting.style';

const Rootting = ({ setStep, setAllDetail }) => {
    const { register, handleSubmit, formState, control } = useForm({
        defaultValues: {
            whyFiled: [{ reason: '' }]
        },

        mode: 'onTouched'
    });

    const { errors } = formState;

    const { fields, append } = useFieldArray({
        name: 'whyFiled',
        control
    });

    const formSubmit = data => {
        // console.log(data);
        setStep(3);
    };

    const handleAddInput = () => {
        append({ reason: '' });
    };

    return (
        <RootingStyle>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className='wrapper'>
                    <div className='input_group'>
                        {fields.map((filed, index) => (
                            <div className='inputField' key={filed.id}>
                                <InputComponent
                                    title={index === 0 ? `ریشه یابی ${index + 1}` : '‍'}
                                    icon={Question}
                                    type='text'
                                    placeHolder={`چرا-${index + 1}`}
                                    detail={{
                                        ...register(`whyFiled.${index}.reason`, {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.whyFiled?.[index]?.reason?.message}
                                />
                            </div>
                        ))}
                        <div className='add' onClick={handleAddInput}>
                            <img src={add} alt='add' />
                        </div>
                    </div>
                </div>
                <FormButton
                    text='بعدی'
                    loading={false}
                    type='submit'
                    backgroundColor={'#174787'}
                    color={'white'}
                    height={48}
                    icon={arrow}
                />
            </form>
        </RootingStyle>
    );
};

export default Rootting;
