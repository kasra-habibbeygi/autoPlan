import React from 'react';
import { FormWrapper } from './add-detail-modal.style';
import InputComponent from '../../form-groups/input-component';
import circle from './../../../assets/images/icons/circle.svg';
import { useForm } from 'react-hook-form';
import FormButton from '../../form-button/form-button';
import decreesArrow from './../../../assets/images/icons/decreesArrow.svg';
import increaseArrow from './../../../assets/images/icons/increaseArrow.svg';

const AddDetailModal = ({ subModalStatus, setDetails, closeSubModalHandler }) => {
    const { register, handleSubmit, formState, getValues, setValue, reset } = useForm({
        defaultValues: {
            name: '',
            time: 'partTime',
            workTime: 1
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const sendForm = data => {
        let modalRelated = null;

        if (subModalStatus === 'جلوبندی') {
            modalRelated = 'blockingList';
        } else if (subModalStatus === 'مکانیک') {
            modalRelated = 'mechanicList';
        } else if (subModalStatus === 'برق') {
            modalRelated = 'electricList';
        } else if (subModalStatus === 'گاز') {
            modalRelated = 'gasList';
        }

        setDetails(prev => ({
            ...prev,
            [modalRelated]: [
                ...prev[modalRelated],
                {
                    name: data.name,
                    time: data.time,
                    workTime: data.workTime,
                    fullText: `${data.name}-${data.time === 'partTime' ? 'پاره وقت' : data.time === 'fullTime' ? 'تمام وقت' : null} : ${
                        data.workTime
                    } ساعت کاری`
                }
            ]
        }));

        closeSubModalHandler();
        reset();
    };

    return (
        <FormWrapper onSubmit={handleSubmit(sendForm)}>
            <InputComponent
                title={`کد ${subModalStatus}`}
                icon={circle}
                type='text'
                detail={{
                    ...register('name', {
                        required: {
                            value: true,
                            message: 'این فیلد اجباری است'
                        }
                    })
                }}
                error={errors?.name}
            />
            <div className='radios'>
                <div>
                    <input type='radio' {...register('time')} value={'partTime'} id='partTime' />
                    <label htmlFor='partTime'>پاره وقت</label>
                </div>
                <div>
                    <input type='radio' {...register('time')} value={'fullTime'} id='fullTime' />
                    <label htmlFor='fullTime'>تمام وقت</label>
                </div>
            </div>

            <div className='work_hour'>
                <div>
                    <p>تعداد ساعت کار {subModalStatus} : </p>
                    <p> {getValues().workTime} ساعت کاری</p>
                </div>
                <div className='input_wrapper'>
                    <FormButton icon={increaseArrow} onClick={() => setValue('workTime', getValues().workTime + 1)} />
                    <input {...register('workTime')} readOnly />
                    <FormButton
                        icon={decreesArrow}
                        onClick={() => getValues().workTime > 1 && setValue('workTime', getValues().workTime - 1)}
                    />
                </div>
            </div>

            <FormButton text='ثبت' loading={false} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
        </FormWrapper>
    );
};

export default AddDetailModal;
