/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../configs/axios';

//Assets
import { CustomStyleWrapper } from './custom.style';
import medal from './../../../assets/images/icons/Medal.svg';
import DatePickerComponent from '../../form-groups/date-picker';
import FormButton from '../../form-groups/form-button';
import tools from '../../../utils/tools';

const BarChartCustom = ({ detail }) => {
    const [usersList, setUsersList] = useState([]);
    const [buttonLoader, setButtonLoader] = useState(false);

    useEffect(() => {
        if (detail) {
            setUsersList([]);
            Object.entries(detail)?.map(
                ([title, value]) =>
                    title !== 'link' && Object.entries(value)?.map(([innerTitle]) => setUsersList(prev => [...prev, innerTitle]))
            );
        }
    }, []);

    console.log(usersList);

    const { handleSubmit, control } = useForm({
        defaultValues: {
            person: '',
            start: '',
            end: ''
        },

        mode: 'onTouched'
    });

    const formSubmit = data => {
        setButtonLoader(true);

        Axios.get('https://api.autoplaning.ir/api/amount-of-deviation/', {
            params: {
                ...(data.start && {
                    start: tools.changeTimeStampToDate(data.start)
                }),
                ...(data.end && {
                    end: tools.changeTimeStampToDate(data.end)
                }),
                ...(data.person && {
                    person: data.person
                })
            }
        })
            .then(() => {
                //
            })
            .catch(() => {})
            .finally(() => setButtonLoader(false));
    };

    return (
        <CustomStyleWrapper onSubmit={handleSubmit(formSubmit)}>
            <Grid container spacing={1.5}>
                <Grid item xs={12} md={6}>
                    <Controller
                        control={control}
                        name='start'
                        render={({ field: { onChange, value } }) => {
                            return <DatePickerComponent value={value} onChange={onChange} title='تاریخ شروع' minDate={new Date()} />;
                        }}
                    />

                    <Controller
                        control={control}
                        name='end'
                        render={({ field: { onChange, value } }) => {
                            return <DatePickerComponent value={value} onChange={onChange} title='تاریخ پایان' minDate={new Date()} />;
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='auto_complete_wrapper'>
                        <p className='auto_complete_title'>نام کاربر</p>
                        <div className='auto_complete'>
                            <Controller
                                control={control}
                                name='person'
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <Autocomplete
                                            options={usersList}
                                            value={value}
                                            onChange={(event, newValue) => {
                                                onChange(newValue);
                                            }}
                                            sx={{ width: '100%' }}
                                            renderInput={params => <TextField {...params} />}
                                        />
                                    );
                                }}
                            />

                            <img src={medal} />
                        </div>
                    </div>

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

export default BarChartCustom;
