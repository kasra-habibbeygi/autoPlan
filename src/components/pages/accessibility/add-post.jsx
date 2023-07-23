/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';
import { toast } from 'react-hot-toast';

//Assets
import { AddModalWrapper } from './add-modal.style';
import UserHandUp from './../../../assets/images/icons/UserHandUp.svg';
import Medal from './../../../assets/images/icons/Medal.svg';

//Components
import InputComponent from '../../form-groups/input-component';
import FormButton from '../../form-groups/form-button';
import { Autocomplete, TextField } from '@mui/material';

const AddPost = ({ setReload, setState, editModalData, modalStatus, subModalCloseHandler }) => {
    const [permissionList, setPermissionList] = useState([{ value: '', lable: '', id: '' }]);
    const [buttonLoader, setButtonLoader] = useState(false);
    const { register, handleSubmit, formState, control, reset, setValue } = useForm({
        defaultValues: {
            title: '',
            technical_force: false
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    useEffect(() => {
        Axios.get('user/permissions/?page_size=500').then(res => {
            let permission = res.data.results.map(item => ({
                label: item.title,
                value: item.id
            }));
            setPermissionList(permission);
        });

        if (modalStatus === 'edit') {
            setValue('title', editModalData.title);
            setValue('technical_force', editModalData.technical_force);
            setValue(
                'permissions',
                editModalData?.permissions_info.map(item => item.code)
            );
        }
    }, [editModalData]);

    const formSubmit = data => {
        // console.log(data);
        setButtonLoader(true);
        if (modalStatus === 'edit') {
            Axios.put(`/worker/admin/organizational-position/retrieve_update_destroy/?pk=${editModalData?.id}`, data)
                .then(() => {
                    setButtonLoader({ ...buttonLoader, modalButton: false });
                    setReload(prev => !prev);
                    toast.success('پست سازمانی با موفقیت ویرایش شد');
                    setState(false);
                    reset();
                })
                .finally(() => setButtonLoader(false));
        } else {
            Axios.post('/worker/admin/organizational-position/list_create/', data)
                .then(() => {
                    setReload(prev => !prev);
                    setState(false);
                    toast.success('پست جدید با موفقیت ثبت شد');
                    reset();
                    subModalCloseHandler();
                })
                .finally(() => setButtonLoader(false));
        }
    };

    return (
        <AddModalWrapper error={errors?.permissions?.message}>
            <h3>{modalStatus === 'edit' ? 'ویرایش پست سازمانی' : 'اضافه کردن پست سازمانی جدید'}</h3>
            <form onSubmit={handleSubmit(formSubmit)}>
                <InputComponent
                    title='نام پست سازمانی جدید'
                    placeHolder='نام پست'
                    icon={Medal}
                    type='text'
                    detail={{
                        ...register('title', {
                            required: {
                                value: true,
                                message: 'این فیلد اجباری است'
                            }
                        })
                    }}
                    error={errors?.title}
                />
                <div className='auto_complete_wrapper'>
                    <p className='auto_complete_title'>دسترسی</p>
                    <div className='auto_complete'>
                        <Controller
                            control={control}
                            name='permissions'
                            rules={{ required: 'این فیلد اجباری است' }}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <Autocomplete
                                        multiple
                                        options={permissionList}
                                        value={value}
                                        filterSelectedOptions
                                        getOptionLabel={option => option?.label}
                                        onChange={(_, newValue) => {
                                            onChange(newValue.map(value => value.value));
                                        }}
                                        sx={{ width: '100%' }}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                );
                            }}
                        />
                        <img src={UserHandUp} />
                    </div>
                    <p className='auto_complete_error'>{errors?.permissions?.message}</p>
                </div>

                <div className='checkbox_wrapper'>
                    <p>نیروی فنی</p>
                    <input type='checkbox' {...register('technical_force')} />
                </div>
                <FormButton
                    text={modalStatus === 'edit' ? 'ویرایش' : 'ثبت'}
                    type='submit'
                    backgroundColor='#174787'
                    color='white'
                    height={48}
                    loading={buttonLoader}
                />
            </form>
        </AddModalWrapper>
    );
};

export default AddPost;
