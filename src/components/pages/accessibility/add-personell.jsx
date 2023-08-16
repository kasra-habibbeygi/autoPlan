/* eslint-disable react-hooks/exhaustive-deps */
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
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

const AddPersonnel = ({ setReload, setState, editModalData, modalStatus, subModalCloseHandler }) => {
    const [postsList, setPostsList] = useState([{ value: '', label: '', id: '' }]);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState, control, reset, setValue } = useForm({
        defaultValues: {
            full_name: '',
            mobile: '',
            role: '',
            code: ''
        },

        mode: 'onTouched'
    });

    const { errors } = formState;

    useEffect(() => {
        setLoading(true);
        Axios.get('/worker/admin/organizational-position/list_create/?page_size=500')
            .then(res => {
                let posts = res.data.results.map(item => ({
                    label: item.title,
                    value: item.id
                }));

                setPostsList(posts);

                if (modalStatus === 'edit') {
                    setValue('full_name', editModalData?.personnel?.fullname);
                    setValue('mobile', editModalData?.personnel?.mobile_number);
                    setValue('code', editModalData?.code);
                    setValue('role', {
                        label: editModalData?.organizational_position_info?.title,
                        value: editModalData?.organizational_position_info?.id
                    });
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [modalStatus]);

    const formSubmit = data => {
        setButtonLoader(true);

        const newData = {
            fullname: data.full_name,
            mobile_number: data.mobile,
            organizational_position: data.role.value,
            code: data.code
        };

        if (modalStatus === 'edit') {
            Axios.put(`/worker/admin/personnel/retrieve_update_destroy/?pk=${editModalData.id}`, newData)
                .then(() => {
                    setReload(prev => !prev);
                    setState(false);
                    toast.success('پرسنل با موفقیت ویرایش شد');
                    reset();
                    subModalCloseHandler();
                })
                .catch(() => {})
                .finally(() => setButtonLoader(false));
        } else {
            Axios.post('/worker/admin/personnel/list_create/', newData)
                .then(() => {
                    setReload(prev => !prev);
                    setState(false);
                    toast.success('پرسنل جدید با موفقیت ثبت شد');
                    reset();
                    subModalCloseHandler();
                })
                .catch(() => {})
                .finally(() => setButtonLoader(false));
        }
    };

    return (
        <AddModalWrapper error={errors?.role?.message}>
            <h3>دسترسی پنل</h3>
            {loading ? (
                <div className='loading'>
                    <CircularProgress />
                </div>
            ) : (
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
                        type='tel'
                        detail={{
                            ...register('mobile', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                },
                                maxLength: {
                                    value: 11,
                                    message: 'شماره باید ۱۱ عدد باشد'
                                },
                                minLength: {
                                    value: 11,
                                    message: 'شماره باید ۱۱ عدد باشد'
                                }
                            })
                        }}
                        maxLength={11}
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
                                            options={postsList}
                                            value={value?.label}
                                            onChange={(event, newValue) => {
                                                onChange(newValue);
                                            }}
                                            sx={{ width: '100%' }}
                                            renderInput={params => <TextField {...params} />}
                                        />
                                    );
                                }}
                            />

                            <img src={medal} />
                        </div>
                        <p className='auto_complete_error'>{errors?.role?.message}</p>
                    </div>

                    <InputComponent
                        title='کد تعمیرکار'
                        placeHolder='کد تعمیرکار'
                        icon={magnifier}
                        type='text'
                        detail={{
                            ...register('code')
                        }}
                        error={errors?.code}
                    />

                    <FormButton
                        text={modalStatus === 'edit' ? 'ویرایش' : 'ثبت'}
                        type='submit'
                        backgroundColor={'#174787'}
                        color={'white'}
                        height={48}
                        loading={buttonLoader}
                    />
                </form>
            )}
        </AddModalWrapper>
    );
};

export default AddPersonnel;
