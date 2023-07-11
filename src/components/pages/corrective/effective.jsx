import React from 'react';
import { useForm } from 'react-hook-form';

//Assets
import clock from '../../../assets/images/icons/ClockSquare.svg';
import user from '../../../assets/images/icons/User.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const Effective = ({ setStep, setAllDetail }) => {
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            effective_date: '',
            inCharge_person: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = data => {
        // setStep(2);
        setAllDetail(prev => ({
            ...prev,
            effective_detail: data
        }));
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                <InputComponent
                    title='تاریخ کنترل اثر بخشی'
                    icon={clock}
                    type='date'
                    detail={{
                        ...register('effective_date', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.effective_date}
                />

                <InputComponent
                    title='مسئول کنترل اثر بخشی'
                    icon={user}
                    type='text'
                    placeHolder='نام مسئول'
                    detail={{
                        ...register('inCharge_person', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.inCharge_person}
                />
                <FormButton text='ثبت' loading={false} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
            </form>
        </Style>
    );
};

export default Effective;
