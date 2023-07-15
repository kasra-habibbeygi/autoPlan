import React from 'react';
import { Controller, useForm } from 'react-hook-form';

//Assets
import { FormWrapper } from './work-time-form.style';
import brokenArrow from './../../../assets/images/global/brokenArrow.svg';

//Components
import FormButton from '../../form-groups/form-button';
import DatePickerComponent from '../../form-groups/date-picker';

const WorkTimeForm = () => {
    const { handleSubmit, formState, control } = useForm({
        defaultValues: {
            date: '',
            start_time: '',
            finished_time: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const formSubmit = data => {
        console.log(data);
    };

    return (
        <FormWrapper>
            <p className='title'>ساعت کار نمایندگی</p>
            <form onSubmit={handleSubmit(formSubmit)}>
                <Controller
                    control={control}
                    name='date'
                    rules={{ required: 'این فیلد اجباری است' }}
                    render={({ field: { onChange, value } }) => {
                        return <DatePickerComponent value={value} onChange={onChange} title='تاریخ' error={errors?.date} />;
                    }}
                />

                <Controller
                    control={control}
                    name='start_time'
                    rules={{ required: 'این فیلد اجباری است' }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <DatePickerComponent
                                value={value}
                                onChange={onChange}
                                title='شروع ساعت کاری نمایندگی'
                                error={errors?.start_time}
                            />
                        );
                    }}
                />

                <Controller
                    control={control}
                    name='finished_time'
                    rules={{ required: 'این فیلد اجباری است' }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <DatePickerComponent
                                value={value}
                                onChange={onChange}
                                title='پایان ساعت کاری نمایندگی'
                                error={errors?.finished_time}
                            />
                        );
                    }}
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

export default WorkTimeForm;
