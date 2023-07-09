import React from 'react';
import { useForm } from 'react-hook-form';

//Assets
import { FormWrapper } from './reception-form.style';
import calender from './../../../assets/images/global/Calendar.svg';
import brokenArrow from './../../../assets/images/global/brokenArrow.svg';

//Components
import FormButton from '../../form-groups/form-button';
import InputComponent from './../../form-groups/input-component';

const ReceptionForm = () => {
    const { register, handleSubmit, formState } = useForm({
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
                <InputComponent
                    title='تاریخ'
                    icon={calender}
                    type='date'
                    detail={{
                        ...register('date', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.date}
                />

                <InputComponent
                    title='پذیرش اینترنتی'
                    icon={calender}
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
                    icon={calender}
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
                    title='پذیرش پذیرش حضوری'
                    icon={calender}
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
