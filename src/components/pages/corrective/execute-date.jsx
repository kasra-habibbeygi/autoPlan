import React from 'react';
import { useForm } from 'react-hook-form';

//Assets
import clock from '../../../assets/images/icons/ClockSquare.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const ExecuteDate = ({ setStep, setAllDetail }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = data => {
        console.log(data);
        setAllDetail(prev => ({
            ...prev,
            execute_date: data
        }));
        setStep(6);
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className='inputField'>
                    <InputComponent
                        title='زمان شروع اقدام اصلاحی'
                        icon={clock}
                        type='date'
                        detail={{
                            ...register('started_time', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.started_time}
                    />
                </div>

                <div className='inputField'>
                    <InputComponent
                        title='زمان پایان اقدام اصلاحی'
                        icon={clock}
                        type='date'
                        detail={{
                            ...register('finished_time', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.finished_time}
                    />
                </div>

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

export default ExecuteDate;
