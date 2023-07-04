import React from 'react';
import InputComponent from '../../../input-component/input-component';
import calender from './../../../../assets/images/global/Calendar.svg';
import { useForm } from 'react-hook-form';
import FormButton from '../../../form-button/form-button';
import brokenArrow from './../../../../assets/images/global/brokenArrow.svg';
import { FormWrapper } from './work-time-form.style';
import DetailBoxHeader from '../../../detail-box-header/detail-box-header';

const WorkTimeForm = () => {
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

    const formSubmit = data => {
        console.log(data);
    };
    // console.log(errors);

    return (
        <FormWrapper>
            <p className='title'>ساعت کار نمایندگی</p>
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
                    title='ساعت کار نمایندگی'
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
                <FormButton text='ثبت' icon={brokenArrow} loading={false} type='submit' />
            </form>
        </FormWrapper>
    );
};

export default WorkTimeForm;
