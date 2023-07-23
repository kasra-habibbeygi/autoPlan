/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from './../../../configs/axios';

//Assets
import check from '../../../assets/images/icons/check.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const ResponsibleForAction = ({ setStep, setAllDetail, allDetail, chosenEditItemDetails, setReload }) => {
    const [buttonLoading, setButtonLoading] = useState(false);

    const { register, handleSubmit, formState, setValue } = useForm({
        mode: 'onTouched'
    });

    const { errors, isDirty } = formState;

    useEffect(() => {
        if (chosenEditItemDetails?.action_agent) {
            const obj = JSON.parse(chosenEditItemDetails.action_agent);
            const arrayValues = Object.entries(obj).map(([key, value]) => ({ [key]: value }));

            arrayValues.forEach((item, index) => setValue(`correction_${index + 1}`, item[`correction_${index + 1}`]));
        }
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setButtonLoading(true);
        const jsonString = JSON.stringify(data);

        if (isDirty) {
            Axios.put(`reform_action/set_action_agent/?id=${allDetail?.mainId}`, {
                action_agent: jsonString
            })
                .then(() => {
                    setAllDetail(prev => ({
                        ...prev,
                        actionPerson: jsonString
                    }));
                    setReload(prev => !prev);
                    setStep(5);
                })
                .catch(() => {})
                .finally(() => setButtonLoading(false));
        } else {
            setAllDetail(prev => ({
                ...prev,
                actionPerson: jsonString
            }));
            setStep(5);
        }
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                {allDetail?.actions.map((item, index) => (
                    <div className='inputField' key={item.action}>
                        <InputComponent
                            title={`مسئول اقدام ${item.action}`}
                            icon={check}
                            type='text'
                            placeHolder='مسئول اقدام اصلاحی برای رفع مشکل'
                            detail={{
                                ...register(`correction_${index + 1}`, {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.[`correction_${index + 1}`]}
                        />
                    </div>
                ))}

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
        </Style>
    );
};

export default ResponsibleForAction;

// {
//     correction_1: "بیل",
//     correction_2: "یبسلبی",
//     correction_3: "یبسللیب"
// }
// [
//     {correction_1: "بیل",},
//     {correction_2: "یبسلبی",},
//     {correction_3: "یبسللیب"}
// ]
