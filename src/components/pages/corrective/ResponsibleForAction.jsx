import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from './../../../configs/axios';

//Assets
import check from '../../../assets/images/icons/check.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const ResponsibleForAction = ({ setStep, setAllDetail, allDetail }) => {
    const [buttonLoading, setButtonLoading] = useState(false);

    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = data => {
        setButtonLoading(true);

        const newData = Object.keys(data).map(key => {
            const newObj = {};
            newObj[key] = data[key];
            return newObj;
        });

        const mainString = newData.map((item, index) => `${index + 1} : ${item[`correction_${index + 1}`]}`).join();

        Axios.put(`reform_action/set_action_agent/?id=${allDetail?.mainId}`, {
            action_agent: mainString
        })
            .then(() => {
                setAllDetail(prev => ({
                    ...prev,
                    actionPerson: mainString
                }));
                setStep(5);
            })
            .finally(() => setButtonLoading(false));
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
