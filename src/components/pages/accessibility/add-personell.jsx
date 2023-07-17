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

const AddPersonnel = ({ setReload, reload, setState, modalStatus, setSpecificAccessibilityId, editModalData }) => {
    const [permissionList, setPermissionList] = useState([{ value: '', lable: '', id: '' }]);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [test, setTest] = useState([]);
    const { register, handleSubmit, formState, control, reset, setValue } = useForm({
        defaultValues: {
            post_name: '',
            accesses: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    useEffect(() => {
        Axios.get('permission-list/').then(res => {
            let permission = res.data.results.map(item => ({
                label: item.title,
                value: item.title,
                id: item.id
            }));
            setPermissionList(permission);

            if (modalStatus === 'edit') {
                setValue('title', editModalData.title);

                let equals = [];

                for (let obj1 of permission) {
                    for (let obj2 of editModalData.permission) {
                        if (obj1.id === obj2.id) {
                            equals.push(obj1);
                        }
                    }
                }

                setTest(equals);
            }
        });
    }, []);

    useEffect(() => {
        setValue('permissions', test);
    }, [test]);

    const formSubmit = data => {
        setButtonLoader(true);

        if (modalStatus === 'add') {
            Axios.post('personnelrole_mgmt/', data).then(() => {
                setButtonLoader(false);
                setReload(!reload);
                setState(false);
                toast.success('پست جدید با موفقیت ثبت شد');
                reset();
            });
        } else {
            Axios.put(`personnelrole_mgmt/?id=${setSpecificAccessibilityId}`, data).then(() => {
                setButtonLoader({ ...buttonLoader, modalButton: false });
                setReload(!reload);
                toast.success('انحراف  با موفقیت ویرایش شد');
                setState(false);
                reset();
            });
        }
    };

    return (
        <AddModalWrapper error={errors?.accesses?.message}>
            <h3>اضافه کردن پست سازمانی جدید</h3>
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
                                        getOptionLabel={option => option.label}
                                        onChange={(_, newValue) => {
                                            onChange(newValue.map(value => value?.id));
                                        }}
                                        sx={{ width: '100%' }}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                );
                            }}
                        />
                        <img src={UserHandUp} />
                    </div>
                    <p className='auto_complete_error'>{errors?.accesses?.message}</p>
                </div>
                <FormButton text='ثبت' type='submit' backgroundColor='#174787' color='white' height={48} loading={buttonLoader} />
            </form>
        </AddModalWrapper>
    );
};

export default AddPersonnel;
