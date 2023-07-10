import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

//Assets
import { FormWrapper } from './work-time-form.style';
import calender from './../../../assets/images/global/Calendar.svg';
import brokenArrow from './../../../assets/images/global/brokenArrow.svg';

//Components
import FormButton from '../../form-groups/form-button';
import InputComponent from '../../form-groups/input-component';

const WorkTimeForm = () => {
    const { register, handleSubmit, formState, control } = useForm({
        defaultValues: {
            date: '',
            start_time: '',
            finish_time: ''
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
                <div className='time'>
                    <p>ساعت شروع کار نمایندگی</p>
                    <div className={errors?.start_time?.message ? 'time_picker error' : 'time_picker'}>
                        <Controller
                            control={control}
                            name='start_time'
                            rules={{ required: 'این فیلد اجباری است' }}
                            render={({ field: { onChange, value } }) => {
                                return <TimePicker value={value} onChange={newValue => onChange(newValue)} sx={{ width: '100%' }} />;
                            }}
                        />
                    </div>
                    <p className='time_error'>{errors?.start_time?.message}</p>
                </div>

                <div className='time'>
                    <p>ساعت پایان کار نمایندگی</p>
                    <div className={errors?.finish_time?.message ? 'time_picker error' : 'time_picker'}>
                        <Controller
                            control={control}
                            name='finish_time'
                            rules={{ required: 'این فیلد اجباری است' }}
                            render={({ field: { onChange, value } }) => {
                                return <TimePicker value={value} onChange={newValue => onChange(newValue)} sx={{ width: '100%' }} />;
                            }}
                        />
                    </div>
                    <p className='time_error'>{errors?.finish_time?.message}</p>
                </div>
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
