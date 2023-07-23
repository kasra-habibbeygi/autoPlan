import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';
import { toast } from 'react-hot-toast';

//Assets
import { FormWrapper } from './work-time-form.style';
import brokenArrow from './../../../assets/images/global/brokenArrow.svg';

//Components
import FormButton from '../../form-groups/form-button';
import DatePickerComponent from '../../form-groups/date-picker';

//Mui
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

const WorkTimeForm = () => {
    const [time, setTime] = useState({
        start_time: '',
        end_time: ''
    });
    const [buttonLoader, setButtonLoader] = useState(false);
    const [reload, setReload] = useState(false);
    const [getTime, setGetTime] = useState();

    // const { handleSubmit, formState, control } = useForm({
    //     defaultValues: {
    //         start_time: '',
    //         finished_time: ''
    //     },
    //     mode: 'onTouched'
    // });

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

        Axios.put(`worker/admin/representation-working-hours/update/${getTime.id}`, time)
            .then(() => {
                toast.success('ساعتی کاری شما با موفقیت ثبت شد');
                setReload(!reload);
            })
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

    console.log(getTime);

    return (
        <FormWrapper>
            <p className='title'>ساعت کار نمایندگی</p>
            <form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker', 'MobileTimePicker', 'DesktopTimePicker', 'StaticTimePicker']}>
                        <DemoItem label='ساعت شروع کار نمایندگی'>
                            <MobileTimePicker
                                defaultValue={dayjs('2022-04-17T15:30')}
                                onChange={newValue => timeOnChange(newValue, 'start_time')}
                            />
                        </DemoItem>
                        <DemoItem label='ساعت پایان کار نمایندگی'>
                            <MobileTimePicker
                                defaultValue={dayjs('2022-04-17T15:30')}
                                onChange={newValue => timeOnChange(newValue, 'end_time')}
                            />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
                <FormButton
                    text={getTime?.length > 0 ? 'ویرایش' : 'ثبت'}
                    icon={brokenArrow}
                    type='submit'
                    backgroundColor={'#174787'}
                    color={'white'}
                    height={48}
                    onClick={getTime?.length > 0 ? EditFormSubmit : formSubmit}
                    loading={buttonLoader}
                />
            </form>
        </FormWrapper>
    );
};

export default WorkTimeForm;
