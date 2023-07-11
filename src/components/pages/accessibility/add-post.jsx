import React from 'react';
import { useForm } from 'react-hook-form';

//Assets
import { AddModalWrapper } from './add-modal.style';
import addPhone from './../../../assets/images/login/addPhone.svg';
import magnifier from './../../../assets/images/icons/magnifier.svg';
import medal from './../../../assets/images/icons/Medal.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';

const AddPost = () => {
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            user: '',
            phoneNumber: '',
            post: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = data => {
        console.log(data);
    };

    return (
        <AddModalWrapper>
            <h3>دسترسی پنل</h3>
            <form onSubmit={handleSubmit(formSubmit)}>
                <InputComponent
                    title='کاربر'
                    icon={magnifier}
                    type='text'
                    detail={{
                        ...register('user', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.user}
                />
                <InputComponent
                    title='شماره موبایل'
                    icon={addPhone}
                    placeHolder='---------۰۹'
                    type='text'
                    detail={{
                        ...register('phoneNumber', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.phoneNumber}
                />
                <InputComponent
                    title='پست سازمانی کاربر'
                    icon={medal}
                    type='text'
                    detail={{
                        ...register('post', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.post}
                />

                <FormButton text='ثبت' loading={false} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
            </form>
        </AddModalWrapper>
    );
};

export default AddPost;
