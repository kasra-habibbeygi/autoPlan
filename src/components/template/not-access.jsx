import React from 'react';

// Assets
import { MainField } from './not-access.style';
import Fingerprint from '../../assets/images/icons/fingerprint.svg';

const NotAccessField = () => {
    return (
        <MainField>
            <img src={Fingerprint} alt='' />
            شما به این بخش دسترسی ندارید !
        </MainField>
    );
};

export default NotAccessField;
