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

    useEffect(() => {
        Axios.get('worker/admin/representation-working-hours/list_create/').then(res => {
            console.log(res.data.results[0]);
            res.data.results.length &&
                setTime({
                    start_time: new Date(`1970-01-01T${res.data.results[0].start_time}Z`),
                    end_time: new Date(`1970-01-01T${res.data.results[0].end_time}Z`)
                });
            setGetTime(res.data.results);
        });
    }, [reload]);

    const formSubmit = e => {
        e.preventDefault();
        if (time.start_time && time.end_time) {
            setButtonLoader(true);
            const sendTimeStructure = timeMaker(time);

            Axios.post('/worker/admin/representation-working-hours/list_create/', sendTimeStructure)
                .then(() => {
                    toast.success('ساعتی کاری شما با موفقیت ثبت شد');
                    setReload(!reload);
                })
                .finally(() => {
                    setButtonLoader(false);
                });
        }
    };

    const EditFormSubmit = e => {
        e.preventDefault();
        setButtonLoader(true);
        const sendTimeStructure = timeMaker(time);

        Axios.put(`worker/admin/representation-working-hours/update/?pk=${getTime[0].id}`, sendTimeStructure)
            .then(() => {
                toast.success('ساعتی کاری شما با موفقیت ثبت شد');
                setReload(!reload);
            })
            .catch(() => {})
            .finally(() => {
                setButtonLoader(false);
            });
    };

    const timeMaker = time => {
        const startHours = time.start_time?.$H;
        const startMinutes = time.start_time?.$m;
        const finishHours = time.end_time?.$H;
        const finishMinutes = time.end_time?.$m;

        const realTime = {
            start_time: `${startHours}:${startMinutes}`,
            end_time: `${finishHours}:${finishMinutes}`
        };
        return realTime;
    };

    return (
        <FormWrapper>
            <p className='title'>ساعت کار نمایندگی</p>
            <form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker', 'MobileTimePicker', 'DesktopTimePicker', 'StaticTimePicker']}>
                        <DemoItem label='ساعت شروع کار نمایندگی'>
                            <MobileTimePicker
                                value={time.start_time}
                                onChange={newValue => setTime(prev => ({ ...prev, start_time: newValue }))}
                            />
                        </DemoItem>
                        <DemoItem label='ساعت پایان کار نمایندگی'>
                            <MobileTimePicker
                                value={time.end_time}
                                onChange={newValue => setTime(prev => ({ ...prev, end_time: newValue }))}
                            />
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
