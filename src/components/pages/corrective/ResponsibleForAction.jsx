import React from 'react';
import { useForm } from 'react-hook-form';

//Assets
import check from '../../../assets/images/icons/check.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const ResponsibleForAction = ({ setStep, setAllDetail, allDetail }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = data => {
        const newDate = Object.keys(data).map(key => {
            const newObj = {};
            newObj[key] = data[key];
            return newObj;
        });

        setAllDetail(prev => ({
            ...prev,
            actionPerson: newDate
        }));
        setStep(5);
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
                    loading={false}
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
