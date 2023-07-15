/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

//style
import { UploadFileStyle } from './UploadFile.style';
import Excel from '../../assets/images/global/Excel.svg';

//mui
import IconButton from '@mui/material/IconButton';

const UploadFile = ({ name, fileName, detail, valueHandler }) => {
    return (
        <UploadFileStyle>
            <IconButton color='primary' component='label' className='upload' onChange={e => valueHandler(e)}>
                <input hidden accept='image/*' type='file' name={name} {...detail} />
                <div className='content'>
                    <img alt='uplpload file' src={Excel} />
                    <div>
                        <h3>لیست کسری قطعات</h3>
                        <p>
                            {fileName === ''
                                ? 'همچنین می توانید به جای اضافه کردن کسری قطعات به صورت تکی ، یک لیست با فرمت اکسل تهیه و در این بخش بارگزاری کنید '
                                : fileName}
                        </p>
                    </div>
                </div>
                {console.log(fileName)}
            </IconButton>
        </UploadFileStyle>
    );
};

export default UploadFile;
