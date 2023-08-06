import React, { useState } from 'react';
import { CustomStyleWrapper } from './custom.style';
import { Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import FormButton from '../../form-groups/form-button';
import DatePickerComponent from '../../form-groups/date-picker';
import Axios from '../../../configs/axios';
import tools from '../../../utils/tools';
const TimeBaseForm = ({ url }) => {
    const [buttonLoader, setButtonLoader] = useState(false);

    const { handleSubmit, control } = useForm({
        defaultValues: {
            start: '',
            end: ''
        }
    });

    const formSubmit = data => {
        setButtonLoader(true);

        Axios.get(`https://api.autoplaning.ir${url}`, {
            params: {
                ...(data.start && {
                    start: tools.changeTimeStampToDate(data.start)
                }),
                ...(data.end && {
                    end: tools.changeTimeStampToDate(data.end)
                })
            }
        })
            .then(res => {
                if (res?.data?.link) {
                    location.href = `https://api.autoplaning.ir/${res.data?.link}`;
                }
            })
            .catch(() => {})
            .finally(() => {
                setTimeout(() => {
                    setButtonLoader(false);
                }, 1000);
            });
    };

    return (
        <CustomStyleWrapper onSubmit={handleSubmit(formSubmit)}>
            <Grid container spacing={1.5}>
                <Grid item xs={12} md={6}>
                    <Controller
                        control={control}
                        name='start'
                        render={({ field: { onChange, value } }) => {
                            return <DatePickerComponent value={value} onChange={onChange} title='تاریخ شروع' />;
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        control={control}
                        name='end'
                        render={({ field: { onChange, value } }) => {
                            return <DatePickerComponent value={value} onChange={onChange} title='تاریخ پایان' />;
                        }}
                    />
                    <FormButton
                        text='دانلود'
                        type='submit'
                        backgroundColor={'#174787'}
                        color={'white'}
                        height={48}
                        loading={buttonLoader}
                        fontSize={'13px'}
                        margin={'35px 0 0 0'}
                    />
                </Grid>
            </Grid>
        </CustomStyleWrapper>
    );
};

export default TimeBaseForm;
