/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//style
import { UploadFileStyle } from './UploadFile.style';
import Excel from '../../assets/images/global/Excel.svg';

//mui
import IconButton from '@mui/material/IconButton';
import FormButton from './form-button';

const UploadFile = () => {
    const [buttonLoader, setButtonLoader] = useState(false);
    const [fileName, setFileName] = useState('');

    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            file: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const formSubmit = data => {};

    return (
        <UploadFileStyle onSubmit={handleSubmit(formSubmit)} error={errors?.file?.message}>
            <IconButton color='primary' component='label' className='upload'>
                <input
                    hidden
                    type='file'
                    {...register('file', {
                        required: {
                            value: true,
                            message: 'این فیلد اجباری است'
                        },
                        onChange: filedValue => setFileName(filedValue?.target?.files?.[0]?.name)
                    })}
                />
                <div className='content'>
                    <img alt='uplpload file' src={Excel} />
                    <div>
                        <h3>لیست کسری قطعات</h3>
                        <p>
                            {!fileName
                                ? 'همچنین می توانید به جای اضافه کردن کسری قطعات به صورت تکی ، یک لیست با فرمت اکسل تهیه و در این بخش بارگزاری کنید '
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
