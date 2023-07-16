import React from 'react';
import { useForm } from 'react-hook-form';

//Assets
import Bus from './../../../assets/images/icons/Bus.svg';
import Arrow from './../../../assets/images/global/arrow.svg';
import PhoneIcon from './../../../assets/images/login/addPhone.svg';

//Components
import FormButton from '../../form-groups/form-button';
import InputComponent from '../../form-groups/input-component';
import { StepsStyle } from './steps.style';

const CarDetail = ({ setStep }) => {
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            brand: '',
            model: '',
            owner: '',
            phone_number: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const formSubmit = data => {
        setStep(2);
    };

    return (
        <StepsStyle>
            <form onSubmit={handleSubmit(formSubmit)}>
                <InputComponent
                    title='برند'
                    placeHolder='برند خودرو'
                    type='text'
                    icon={Bus}
                    detail={{
                        ...register('brand', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.brand}
                />
                <InputComponent
                    title='مدل'
                    placeHolder='مدل خودرو'
                    type='text'
                    icon={Bus}
                    detail={{
                        ...register('model', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.model}
                />
                <InputComponent
                    title='نام آورنده'
                    placeHolder='نام آورنده خودرو'
                    type='text'
                    icon={Bus}
                    detail={{
                        ...register('owner', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.owner}
                />
                <InputComponent
                    title='شماره موبایل'
                    placeHolder='09----------'
                    type='text'
                    icon={PhoneIcon}
                    detail={{
                        ...register('phone_number', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.phone_number}
                />
                <FormButton
                    text='بعدی'
                    icon={Arrow}
                    loading={false}
                    className='login'
                    backgroundColor={'#174787'}
                    onClick={() => {}}
                    height='48px'
                    type='submit'
                />
            </form>
        </StepsStyle>
    );
};

export default CarDetail;
