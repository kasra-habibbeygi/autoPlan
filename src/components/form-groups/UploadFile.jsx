/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

//style
import { UploadFileStyle } from './UploadFile.style';
import Excel from '../../assets/images/global/Excel.svg';

//mui
import IconButton from '@mui/material/IconButton';

const UploadFile = ({ value, setFileValue }) => {
    return (
        <UploadFileStyle>
            <IconButton color='primary' component='label' className='upload'>
                <input
                    hidden
                    type='file'
                    onChange={e => {
                        const file = e.target.files[0];
                        setFileValue(file);
                    }}
                />
                <div className='content'>
                    <img alt='uplpload file' src={Excel} />
                    <div>
                        <h3>لیست کسری قطعات</h3>
                        <p>
                            {value === ''
                                ? 'همچنین می توانید به جای اضافه کردن کسری قطعات به صورت تکی ، یک لیست با فرمت اکسل تهیه و در این بخش بارگزاری کنید '
                                : value?.name}
                        </p>
                    </div>
                </div>
            </IconButton>
        </UploadFileStyle>
    );
};

export default UploadFile;
