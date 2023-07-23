/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from './../../configs/axios';

//style
import { UploadFileStyle } from './UploadFile.style';
import Excel from '../../assets/images/global/Excel.svg';

//mui
import IconButton from '@mui/material/IconButton';
import FormButton from './form-button';
import { toast } from 'react-hot-toast';

const UploadFile = ({ setReload, setIsModalOpen, setSpecificDeviationId, setTabValue }) => {
    const [buttonLoader, setButtonLoader] = useState(false);
    const [fileName, setFileName] = useState('');

    const { register, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            file: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const formSubmit = data => {
        setButtonLoader(true);
        const formData = new FormData();
        formData.append('file', data.file[0]);

        Axios.post('worker/admin/lack-parts-excel/create/', formData)
            .then(() => {
                setReload(prev => !prev);
                toast.success('کسری قطعات با موفقیت ثبت شد');
                setIsModalOpen(false);
                reset();
                setSpecificDeviationId();
                setTabValue(0);
            })
            .catch(() => {})
            .finally(() => {
                setButtonLoader(false);
            });
    };

    return (
        <UploadFileStyle onSubmit={handleSubmit(formSubmit)} error={errors?.file?.message}>
            <IconButton color='primary' component='label' className='upload'>
                <input
                    hidden
                    type='file'
                    accept='.xls, .xlsx'
                    {...register('file', {
                        required: {
                            value: true,
                            message: 'این فیلد اجباری است'
                        },
                        onChange: filedValue => setFileName(filedValue?.target?.files?.[0]?.name)
                    })}
                />
                <div className='content'>
                    <img alt='upload file' src={Excel} />
                    <div>
                        <h3>لیست کسری قطعات</h3>
                        <p>
                            {!fileName
                                ? ' می توانید به جای اضافه کردن کسری قطعات به صورت تکی ، یک لیست با فرمت اکسل تهیه و در این بخش بارگزاری کنید '
                                : fileName}
                        </p>
                    </div>
                </div>
            </IconButton>
            <p className='error_message'>{errors?.file?.message}</p>

            <FormButton text='ارسال' loading={buttonLoader} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
        </UploadFileStyle>
    );
};

export default UploadFile;
