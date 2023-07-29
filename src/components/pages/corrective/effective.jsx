/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

//Assets
import user from '../../../assets/images/icons/User.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';
import Axios from './../../../configs/axios';

//Components
import FormButton from '../../form-groups/form-button';
import DatePickerComponent from '../../form-groups/date-picker';
import tools from '../../../utils/tools';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

const Effective = ({ setStep, setAllDetail, chosenEditItemDetails, setReload, allDetail }) => {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    const [personnel, setPersonnel] = useState([{ value: '', label: '', id: '' }]);

    const { handleSubmit, formState, control, setValue } = useForm({
        defaultValues: {
            effective_date: '',
            inCharge_person: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    useEffect(() => {
        setDataLoading(true);

        Axios.get('/worker/admin/organizational-position/list_create/?page_size=500')
            .then(res => {
                let personnelArray = res.data.results.map(item => ({
                    label: item.title,
                    value: item.id
                }));

                setPersonnel(personnelArray);

                if (chosenEditItemDetails?.controller_info && chosenEditItemDetails?.control_completion_date) {
                    setValue('effective_date', tools.changeDateToTimeStamp(chosenEditItemDetails?.control_completion_date));
                    setValue('inCharge_person', {
                        label: chosenEditItemDetails?.controller_info?.fullname,
                        value: chosenEditItemDetails?.controller_info?.id
                    });
                }
            })
            .finally(() => setDataLoading(false));
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        if (data?.inCharge_person?.value && data?.effective_date) {
            setAllDetail(prev => ({
                ...prev,
                effective_detail: data
            }));
            setStep(8);
        } else {
            setButtonLoading(true);

            const newData = {
                result: allDetail.action_result,
                controller: data?.inCharge_person?.value,
                control_completion_date: tools.changeTimeStampToDate(data?.effective_date)
            };

            Axios.put(`/worker/admin/corrective-action/retrieve_update_destroy/?pk=${chosenEditItemDetails?.id}`, newData)
                .then(() => {
                    setReload(prev => !prev);
                    setAllDetail(prev => ({
                        ...prev,
                        effective_detail: data
                    }));
                    setStep(8);
                })
                .catch(err => console.log(err))
                .finally(() => setButtonLoading(false));
        }
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                {dataLoading ? (
                    <div className='loading'>
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <Controller
                            control={control}
                            name='effective_date'
                            rules={{ required: 'این فیلد اجباری است' }}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <DatePickerComponent
                                        value={value}
                                        onChange={onChange}
                                        title='تاریخ کنترل اثر بخشی'
                                        error={errors?.effective_date}
                                    />
                                );
                            }}
                        />

                        <div className='auto_complete_wrapper'>
                            <p className='auto_title'>مسئول کنترل اثر بخشی</p>
                            <div className={errors?.inCharge_person?.message ? 'auto_complete auto_complete_error' : 'auto_complete'}>
                                <Controller
                                    control={control}
                                    name={'inCharge_person'}
                                    rules={{ required: 'این فیلد اجباری است' }}
                                    render={({ field: { onChange, value } }) => {
                                        return (
                                            <Autocomplete
                                                options={personnel}
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

                                <img src={user} />
                            </div>
                            <p className='auto_error'>{errors?.inCharge_person?.message}</p>
                        </div>

                        <FormButton
                            text='بعدی'
                            icon={arrow}
                            type='submit'
                            backgroundColor={'#174787'}
                            color={'white'}
                            height={48}
                            loading={buttonLoading}
                        />
                        <FormButton
                            text='قبلی'
                            backgroundColor='#174787'
                            color='white'
                            height={48}
                            onClick={() => setStep(6)}
                            margin={'20px 0'}
                        />
                    </>
                )}
            </form>
        </Style>
    );
};

export default Effective;
