import React from 'react';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import add from '../../../assets/images/corrective/Add.svg';

//Component
import InputComponent from '../../form-groups/input-component';
import { useFieldArray, useForm } from 'react-hook-form';

const RootItem = () => {
    const { register, formState, control } = useForm({
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
    const handleAddInput = () => {
        append({ reason: '' });
    };

    return (
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
    );
};

export default RootItem;
