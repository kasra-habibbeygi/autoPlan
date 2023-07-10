import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

//Assets
import check from '../../../assets/images/icons/check.svg';
import add from '../../../assets/images/corrective/Add.svg';
import arrow from './../../../assets/images/global/arrow.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';
import { ActionStyle } from './action.style';

const Action = ({ setStep, setAllDetail }) => {
    const { register, handleSubmit, formState, control } = useForm({
        defaultValues: {
            actionFields: [{ action: '' }]
        },

        mode: 'onTouched'
    });

    const { errors } = formState;

    const { fields, append } = useFieldArray({
        name: 'actionFields',
        control
    });

    const formSubmit = data => {
        console.log(data);
        setAllDetail(prev => ({
            ...prev,
            actions: data.actionFields
        }));
        setStep(4);
    };

    const handleAddInput = () => {
        append({ action: '' });
    };

    return (
        <ActionStyle>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className='input_group'>
                    {fields.map((filed, index) => (
                        <div className='inputField' key={filed.id}>
                            <InputComponent
                                title={`اقدام اصلاحی  ${index + 1}`}
                                icon={check}
                                type='text'
                                placeHolder='اقدام اصلاحی برای رفع عدم انطباق'
                                detail={{
                                    ...register(`actionFields.${index}.action`, {
                                        required: {
                                            value: true,
                                            message: 'این فیلد اجباری است'
                                        }
                                    })
                                }}
                                error={errors?.actionFields?.[index]?.action?.message}
                            />
                            {index + 1 === fields.length && (
                                <div className='add' onClick={handleAddInput}>
                                    <img src={add} alt='add' />
                                </div>
                            )}
                        </div>
                    ))}
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
        </ActionStyle>
    );
};

export default Action;
