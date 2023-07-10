import React from 'react';
import { useForm } from 'react-hook-form';

//Assets
import check from '../../../assets/images/icons/check.svg';
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
        console.log(data);
        setAllDetail(prev => ({
            ...prev,
            actionPerson: data
        }));
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                {allDetail?.actions.map(item => (
                    <div className='inputField' key={item.action}>
                        <InputComponent
                            title={`مسئول اقدام ${item.action}`}
                            icon={check}
                            type='text'
                            placeHolder='مسئول اقدام اصلاحی برای رفع مشکل'
                            detail={{
                                ...register(`correction_${item.action}`, {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.[`correction_${item.action}`]}
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
                    onClick={() => {
                        setStep(4);
                    }}
                />{' '}
            </form>
        </Style>
    );
};

export default ResponsibleForAction;
