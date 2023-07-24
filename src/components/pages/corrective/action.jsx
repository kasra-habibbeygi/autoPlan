/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

//Assets
import check from '../../../assets/images/icons/check.svg';
import add from '../../../assets/images/corrective/Add.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { ActionStyle } from './action.style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const Action = ({ setStep, setAllDetail, chosenEditItemDetails }) => {
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
        if (chosenEditItemDetails?.action) {
            const arr = JSON.parse(chosenEditItemDetails?.action).map(obj => {
                const newObj = {};
                Object.entries(obj).forEach(([k, v]) => {
                    newObj[k] = JSON.parse(`"${v}"`);
                });
                return newObj;
            });

            setValue('actionFields', arr);
        }
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setAllDetail(prev => ({
            ...prev,
            actions: data.actionFields
        }));
        setStep(4);

        // setButtonLoading(true);
        // if (isDirty) {
        //     Axios.put(`reform_action/set_action/?id=${allDetail?.mainId}`, {
        //         action: mainString
        //     })
        //         .then(() => {
        //             setAllDetail(prev => ({
        //                 ...prev,
        //                 actions: data.actionFields
        //             }));
        //             setReload(prev => !prev);
        //             setStep(4);
        //         })
        //         .catch(() => {})
        //         .finally(() => setButtonLoading(false));
        // } else {
        //     setAllDetail(prev => ({
        //         ...prev,
        //         actions: data.actionFields
        //     }));
        //     setStep(4);
        // }
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
                <FormButton text='بعدی' type='submit' backgroundColor={'#174787'} color={'white'} height={48} icon={arrow} />
                <FormButton text='قبلی' backgroundColor='#174787' color='white' height={48} onClick={() => setStep(2)} margin={'20px 0'} />
            </form>
        </ActionStyle>
    );
};

export default Action;
