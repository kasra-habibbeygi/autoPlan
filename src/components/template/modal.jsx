import React from 'react';

//Assets
import { ModalStyle } from './modal.styles';
import bg from '../../assets/images/global/bg.svg';

//mui
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const Modal = ({ state, setState, handleClose, children, bgStatus = false, maxWidth = 'lg', fullScreen = false }) => {
    return (
        <ModalStyle bgStatus={bgStatus} bg={bg}>
            <Dialog
                open={state}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {
                    setState && setState(false);
                    handleClose && handleClose();
                }}
                fullWidth={true}
                maxWidth={maxWidth}
                disablePortal
                scroll='body'
                fullScreen={fullScreen}
            >
                <div className='childrenStyle'>{children}</div>
            </Dialog>
        </ModalStyle>
    );
};

export default Modal;
