/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Autocomplete, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

//assets
import circle from './../../../assets/images/icons/circle.svg';
import { FormWrapper } from './add-detail-modal.style';
import decreesArrow from './../../../assets/images/icons/decreesArrow.svg';
import increaseArrow from './../../../assets/images/icons/increaseArrow.svg';
import blocking from './../../../assets/images/icons/blocking.svg';

//components
import FormButton from '../../form-groups/form-button';

const AddDetailModal = ({ subModalStatus, setDetails, closeSubModalHandler, personnelList, seatList }) => {
    const [filteredPersonnelList, setFilteredPersonnelList] = useState([]);
    const [filteredSeatList, setFilteredSeatList] = useState([]);
    const { register, handleSubmit, control, formState, getValues, setValue, reset } = useForm({
        defaultValues: {
            name: '',
            station: '',
            workTime: 1
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const sendForm = data => {
        setDetails(prev => {
            if (prev[subModalStatus]) {
                return {
                    ...prev,
                    [subModalStatus]: [
                        ...prev[subModalStatus],
                        {
                            name: filteredPersonnelList.filter(item => item.label === data.name)[0].value,
                            time: data.workTime,
                            type: filteredSeatList.filter(item => item.label === data.station)[0].value,
                            fullText: `${data.name} : ${data.workTime} ساعت کاری-در جایگاه ${data.station}`
                        }
                    ]
                };
            }
            return {
                ...prev,
                [subModalStatus]: [
                    {
                        name: filteredPersonnelList.filter(item => item.label === data.name)[0].value,
                        time: data.workTime,
                        type: filteredSeatList.filter(item => item.label === data.station)[0].value,
                        fullText: `${data.name} : ${data.workTime} ساعت کاری-در جایگاه ${data.station}`
                    }
                ]
            };
        });

        closeSubModalHandler();
        reset();
    };

    useEffect(() => {
        let temp = [];
        personnelList.map(item => {
            if (item.organizational_position_info.title === subModalStatus) {
                temp.push({
                    label: item.personnel.fullname,
                    value: item.id
                });
            }
            return;
        });
        setFilteredPersonnelList(temp);

        let seatTemp = [];
        seatList.map(item => {
            if (item.type_info.title === subModalStatus) {
                seatTemp.push({
                    label: item.code,
                    value: item.id
                });
            }
            return;
        });
        setFilteredSeatList(seatTemp);
    }, [subModalStatus]);

    return (
        <FormWrapper onSubmit={handleSubmit(sendForm)}>
            <p>{`نام نیروی ${subModalStatus}`}</p>
            <div className={errors?.name?.message ? 'auto_complete auto_complete_error' : 'auto_complete'}>
                <Controller
                    control={control}
                    name='name'
                    rules={{ required: 'این فیلد اجباری است' }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <Autocomplete
                                options={filteredPersonnelList}
                                value={value?.label}
                                onChange={(_, newValue) => {
                                    onChange(newValue?.label);
                                }}
                                sx={{ width: '100%' }}
                                renderInput={params => <TextField {...params} />}
                            />
                        );
                    }}
                />

                <img src={circle} />
            </div>
            <p className='auto_error'>{errors?.name?.message}</p>
            <p>جایگاه نیرو</p>
            <div className={errors?.station?.message ? 'auto_complete auto_complete_error' : 'auto_complete'}>
                <Controller
                    control={control}
                    name='station'
                    rules={{ required: 'این فیلد اجباری است' }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <Autocomplete
                                options={filteredSeatList}
                                value={value?.label}
                                onChange={(_, newValue) => {
                                    onChange(newValue?.label);
                                }}
                                sx={{ width: '100%' }}
                                renderInput={params => <TextField {...params} />}
                            />
                        );
                    }}
                />

                <img src={blocking} />
            </div>
            <p className='auto_error'>{errors?.station?.message}</p>

            <p style={{ marginBottom: '10px' }}>ساعت کاری نیرو</p>
            <div className='work_hour'>
                <div>
                    <p>تعداد ساعت کار {subModalStatus} : </p>
                    <p> {getValues().workTime} ساعت کاری</p>
                </div>
                <div className='input_wrapper'>
                    <FormButton
                        icon={increaseArrow}
                        onClick={() => getValues().workTime < 24 && setValue('workTime', getValues().workTime + 1)}
                    />
                    <input {...register('workTime')} readOnly />
                    <FormButton
                        icon={decreesArrow}
                        onClick={() => getValues().workTime > 1 && setValue('workTime', getValues().workTime - 1)}
                    />
                </div>
            </div>

            <FormButton text='ثبت' loading={false} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
        </FormWrapper>
    );
};

export default AddDetailModal;
