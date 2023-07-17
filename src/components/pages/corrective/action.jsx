/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Axios from './../../../configs/axios';

//Assets
import check from '../../../assets/images/icons/check.svg';
import add from '../../../assets/images/corrective/Add.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { ActionStyle } from './action.style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const Action = ({ setStep, setAllDetail, allDetail, chosenEditItemDetails }) => {
    const [buttonLoading, setButtonLoading] = useState(false);

    const { register, handleSubmit, formState, control, setValue } = useForm({
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

    useEffect(() => {
        if (chosenEditItemDetails) {
            const arr = JSON.parse(chosenEditItemDetails?.action).map(obj => {
                const newObj = {};
                Object.entries(obj).forEach(([k, v]) => {
                    newObj[k] = JSON.parse(`"${v}"`);
                });
                return newObj;
            });

            setValue('actionFields', arr);
            console.log(arr);
        }
    }, [chosenEditItemDetails]);

    console.log(chosenEditItemDetails);

    const formSubmit = data => {
        setButtonLoading(true);

        const mainString =
            '[' +
            data.actionFields
                .map(
                    obj =>
                        '{' +
                        Object.entries(obj)
                            .map(([k, v]) => `"${k}": "${v}"`)
                            .join(', ') +
                        '}'
                )
                .join(', ') +
            ']';

        Axios.put(`reform_action/set_action/?id=${allDetail?.mainId}`, {
            action: mainString
        })
            .then(() => {
                setAllDetail(prev => ({
                    ...prev,
                    actions: data.actionFields
                }));
                setStep(4);
            })
            .finally(() => setButtonLoading(false));
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
                    loading={buttonLoading}
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
