import React from 'react';
import { Controller, useForm } from 'react-hook-form';

//Assets
import { FormWrapper } from './reception-form.style';
import brokenArrow from './../../../assets/images/global/brokenArrow.svg';
import chart from './../../../assets/images/icons/chart.svg';

//Components
import FormButton from '../../form-groups/form-button';
import InputComponent from './../../form-groups/input-component';
import DatePickerComponent from '../../form-groups/date-picker';

const ReceptionForm = () => {
    const { register, handleSubmit, formState, control } = useForm({
        defaultValues: {
            date: '',
            internetReception: '',
            phoneReception: '',
            presentReception: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const formSubmit = () => {};

    return (
        <FormWrapper>
            <p className='title'>تنظیمات پذیرش</p>
            <form onSubmit={handleSubmit(formSubmit)}>
                <Controller
                    control={control}
                    name='date'
                    rules={{ required: 'این فیلد اجباری است' }}
                    render={({ field: { onChange, value } }) => {
                        return <DatePickerComponent value={value} onChange={onChange} title='تاریخ' error={errors?.date} />;
                    }}
                />

                <InputComponent
                    title='پذیرش اینترنتی'
                    placeHolder='اینترنتی'
                    icon={chart}
                    type='text'
                    detail={{
                        ...register('internetReception', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.internetReception}
                />
                <InputComponent
                    title='پذیرش تلفنی'
                    placeHolder='تلفنی'
                    icon={chart}
                    type='text'
                    detail={{
                        ...register('phoneReception', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.phoneReception}
                />
                <InputComponent
                    title='پذیرش حضوری'
                    placeHolder='حضوری'
                    icon={chart}
                    type='text'
                    detail={{
                        ...register('presentReception', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.presentReception}
                />
                <FormButton
                    text='ثبت'
                    icon={brokenArrow}
                    loading={false}
                    type='submit'
                    backgroundColor={'#174787'}
                    color={'white'}
                    height={48}
                />
            </form>
        </FormWrapper>
    );
};

export default ReceptionForm;
