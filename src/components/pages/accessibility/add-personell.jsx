import React from 'react';
import { useForm } from 'react-hook-form';

//Assets
import { AddModalWrapper } from './add-modal.style';
import addPhone from './../../../assets/images/login/addPhone.svg';
import magnifier from './../../../assets/images/icons/magnifier.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const AddPersonnel = () => {
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            post_name: '',
            accesses: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = data => {
        console.log(data);
    };

    return (
        <AddModalWrapper>
            <h3>اضافه کردن پست سازمانی جدید</h3>
            <form onSubmit={handleSubmit(formSubmit)}>
                <InputComponent
                    title='نام پست سازمانی جدید'
                    icon={magnifier}
                    type='text'
                    detail={{
                        ...register('post_name', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.post_name}
                />
                <InputComponent
                    title='دسترسی های پست سازمانی جدید'
                    icon={addPhone}
                    type='text'
                    detail={{
                        ...register('accesses', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.accesses}
                />

                <FormButton text='ثبت' loading={false} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
            </form>
        </AddModalWrapper>
    );
};

export default AddPersonnel;
