import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';
import { toast } from 'react-hot-toast';

//Assets
import { AddModalWrapper } from './add-modal.style';
import addPhone from './../../../assets/images/login/addPhone.svg';
import magnifier from './../../../assets/images/icons/magnifier.svg';
import medal from './../../../assets/images/icons/Medal.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';
import { Autocomplete, TextField } from '@mui/material';

const AddPersonnel = ({ reload, setReload, setState }) => {
    const [permissionList, setPermissionList] = useState([{ value: '', lable: '', id: '' }]);
    const [buttonLoader, setButtonLoader] = useState(false);
    const { register, handleSubmit, formState, control, reset } = useForm({
        mode: 'onTouched'
    });

    const { errors } = formState;

    useEffect(() => {
        Axios.get('personnelrole_mgmt/').then(res => {
            let permission = res.data.data.map(item => ({
                label: item.title,
                value: item.id
            }));

            setPermissionList(permission);
        });
    }, []);

    const formSubmit = data => {
        const newData = {
            ...data,
            username: new Date().getTime()
        };
        Axios.post('user_mgmt/', newData).then(() => {
            setButtonLoader(false);
            setReload(!reload);
            setState(false);
            toast.success('پرسنل جدید با موفقیت ثبت شد');
            reset();
        });
    };

    return (
        <AddModalWrapper error={errors?.post?.message}>
            <h3>دسترسی پنل</h3>
            <form onSubmit={handleSubmit(formSubmit)}>
                <InputComponent
                    title='کاربر'
                    placeHolder='نام کاربر'
                    icon={magnifier}
                    type='text'
                    detail={{
                        ...register('full_name', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.full_name}
                />
                <InputComponent
                    title='شماره موبایل'
                    icon={addPhone}
                    placeHolder='---------۰۹'
                    type='text'
                    detail={{
                        ...register('mobile', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.mobile}
                />

                <div className='auto_complete_wrapper'>
                    <p className='auto_complete_title'>پست سازمانی کاربر</p>
                    <div className='auto_complete'>
                        <Controller
                            control={control}
                            name='role'
                            rules={{ required: 'این فیلد اجباری است' }}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <Autocomplete
                                        options={permissionList}
                                        value={value?.label}
                                        onChange={(event, newValue) => {
                                            onChange(newValue?.value);
                                        }}
                                        sx={{ width: '100%' }}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                );
                            }}
                        />

                        <img src={medal} />
                    </div>
                    <p className='auto_complete_error'>{errors?.post?.message}</p>
                </div>
                <FormButton text='ثبت' type='submit' backgroundColor={'#174787'} color={'white'} height={48} loading={buttonLoader} />
            </form>
        </AddModalWrapper>
    );
};

export default AddPersonnel;
