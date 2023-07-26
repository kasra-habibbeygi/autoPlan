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
import { Autocomplete, TextField } from '@mui/material';

const Effective = ({ setStep, setAllDetail, chosenEditItemDetails }) => {
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
        Axios.get('/worker/admin/organizational-position/list_create/?page_size=500').then(res => {
            let personnelArray = res.data.results.map(item => ({
                label: item.title,
                value: item.id
            }));

            setPersonnel(personnelArray);
            // if (chosenEditItemDetails?.action_officials_info) {
            //     const newArray = chosenEditItemDetails?.action_officials_info?.map((item, index) => ({
            //         [`correction_${index + 1}`]: { label: item.fullname, value: item.id }
            //     }));

            //     newArray.forEach((item, index) => setValue(`correction_${index + 1}`, item[`correction_${index + 1}`]));
            // }
        });

        // if (chosenEditItemDetails?.effective_control_agent && chosenEditItemDetails?.effective_control_date) {
        //     setValue('effective_date', tools.changeIsoDateToTimeStamp(chosenEditItemDetails?.effective_control_date));
        //     setValue('inCharge_person', chosenEditItemDetails?.effective_control_agent);
        // }
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setAllDetail(prev => ({
            ...prev,
            effective_detail: data
        }));
        setStep(8);
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
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

                <FormButton text='بعدی' icon={arrow} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
            </form>
        </Style>
    );
};

export default Effective;
