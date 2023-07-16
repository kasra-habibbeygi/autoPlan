import { toast } from 'react-toastify';

const notify = (title, type = 'info') => {
    toast(title, {
        type: type,
        theme: 'colored'
    });
};

export default notify;
