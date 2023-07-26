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

const ConfirmModal = ({ status, setStatus, title, deleteHandler, loading }) => {
    return (
        <Dialog
            open={status}
            TransitionComponent={Transition}
            keepMounted={false}
            onClose={() => setStatus(false)}
            fullWidth={true}
            maxWidth='sm'
            scroll='body'
        >
            <MainField>
                <div className='modal_content_field'>
                    <h3>{title}</h3>
                    <div className='button_group'>
                        <FormButton text='خیر' backgroundColor='#5F7D88' onClick={() => setStatus(false)} />
                        <FormButton text='بله' backgroundColor='#174787' onClick={deleteHandler} loading={loading} />
                    </div>
                </div>
            </MainField>
        </Dialog>
    );
};

export default ConfirmModal;
