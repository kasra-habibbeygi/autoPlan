import React from 'react';

// Assets
import { MainField } from './confirm-modal.style';

// MUI
import { Dialog, Slide } from '@mui/material';

// Component
import FormButton from '../form-groups/form-button';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const ConfirmModal = ({ status, setStatus, title }) => {
    return (
        <MainField>
            <Dialog
                disablePortal
                open={status}
                TransitionComponent={Transition}
                keepMounted={false}
                onClose={() => setStatus(false)}
                fullWidth={true}
                maxWidth='sm'
                scroll='body'
            >
                <div className='modal_content_field'>
                    <h3>{title}</h3>
                    <div className='button_group'>
                        <FormButton text='خیر' backgroundColor='#5F7D88' onClick={() => setStatus(false)} />
                        <FormButton text='بله' backgroundColor='#174787' />
                    </div>
                </div>
            </Dialog>
        </MainField>
    );
};

export default ConfirmModal;
