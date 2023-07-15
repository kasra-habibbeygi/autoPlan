import React from 'react';

//Assets
import { MobileAlertWrapper } from './mobile-alert-modal.style';
import { Alert } from '@mui/material';

//Components

const MobileAlertModal = () => {
    return (
        <MobileAlertWrapper>
            <Alert severity='error'>
                <p>سایت در موبایل پشتیبانی نمیشود !</p>
            </Alert>
            <Alert severity='warning'>
                <p>لطفا تنها با تبلت یا صفحه های بزرگ تر وارد شوید</p>
            </Alert>
        </MobileAlertWrapper>
    );
};

export default MobileAlertModal;
