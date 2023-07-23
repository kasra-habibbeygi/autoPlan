import React, { useEffect, useState } from 'react';
import Axios from '../../../configs/axios';
import { toast } from 'react-hot-toast';

//Assets
import { FormWrapper } from './work-time-form.style';
import brokenArrow from './../../../assets/images/global/brokenArrow.svg';

//Components
import FormButton from '../../form-groups/form-button';

//Mui
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

const WorkTimeForm = () => {
    const [time, setTime] = useState({
        start_time: '',
        end_time: ''
    });

    const [buttonLoader, setButtonLoader] = useState(false);
    const [reload, setReload] = useState(false);
    const [getTime, setGetTime] = useState();

    const formSubmit = e => {
        e.preventDefault();
        setButtonLoader(true);

        Axios.post('/worker/admin/representation-working-hours/list_create/', time)
            .then(() => {
                toast.success('ساعتی کاری شما با موفقیت ثبت شد');
                setReload(!reload);
            })
            .finally(() => {
                setButtonLoader(false);
            });
    };
    const EditFormSubmit = e => {
        e.preventDefault();
        setButtonLoader(true);

        Axios.put(`worker/admin/representation-working-hours/update/?pk=${getTime[0].id}`, time)
            .then(() => {
                toast.success('ساعتی کاری شما با موفقیت ثبت شد');
                setReload(!reload);
            })
            .catch(() => {})
            .finally(() => {
                setButtonLoader(false);
            });
    };

    const timeOnChange = (value, name) => {
        const hours = value?.$H;
        const minutes = value?.$m;
        setTime({ ...time, [name]: `${hours}:${minutes}` });
    };

    useEffect(() => {
        Axios.get('worker/admin/representation-working-hours/list_create/').then(res => {
            setGetTime(res.data.results);
        });
    }, [reload]);

    return (
        <FormWrapper>
            <p className='title'>ساعت کار نمایندگی</p>
            <form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker', 'MobileTimePicker', 'DesktopTimePicker', 'StaticTimePicker']}>
                        <DemoItem label='ساعت شروع کار نمایندگی'>
                            <MobileTimePicker onChange={newValue => timeOnChange(newValue, 'start_time')} />
                        </DemoItem>
                        <DemoItem label='ساعت پایان کار نمایندگی'>
                            <MobileTimePicker onChange={newValue => timeOnChange(newValue, 'end_time')} />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
                <FormButton
                    text={getTime?.length > 0 ? 'ویرایش' : 'ثبت'}
                    icon={brokenArrow}
                    type='submit'
                    backgroundColor='#174787'
                    color='white'
                    height={48}
                    onClick={getTime?.length > 0 ? EditFormSubmit : formSubmit}
                    loading={buttonLoader}
                />
            </form>
        </FormWrapper>
    );
};

export default WorkTimeForm;
