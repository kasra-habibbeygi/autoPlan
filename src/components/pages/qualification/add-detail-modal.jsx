/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
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

const AddDetailModal = ({ subModalStatus, setDetails, closeSubModalHandler, personnelList, seatList, specificData, showSubModal }) => {
    const [filteredPersonnelList, setFilteredPersonnelList] = useState([]);
    const [filteredSeatList, setFilteredSeatList] = useState([]);
    const [domLoaded, setDomLoaded] = useState(false);
    const { register, handleSubmit, control, formState, getValues, setValue, reset } = useForm({
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
                            user: filteredPersonnelList.filter(item => item.label === data.name.label)[0]?.value,
                            time: `${data.hour}:${data.min}:00`,
                            type: filteredSeatList.filter(item => item.label === data.station.label)[0]?.value,
                            fullText: `${data.name.label} : ${data.hour} ساعت ${data.min} دقیقه کاری -در جایگاه ${data.station.label}`
                        }
                    ]
                };
            }
            return {
                ...prev,
                [subModalStatus]: [
                    {
                        user: filteredPersonnelList.filter(item => item.label === data.name.label)[0]?.value,
                        time: `${data.hour}:${data.min}:00`,
                        type: filteredSeatList.filter(item => item.label === data.station.label)[0]?.value,
                        fullText: `${data.name.label} : ${data.hour} ساعت ${data.min} دقیقه کاری -در جایگاه ${data.station.label}`
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

    useEffect(() => {
        setValue('name', '');
        setValue('station', '');
        setValue('hour', 1);
        setValue('min', 0);

        if (specificData) {
            setValue('name', specificData.name);
            setValue('station', specificData.station);
            setValue('hour', parseInt(specificData.hour));
            setValue('min', parseInt(specificData.min));
        }

        setTimeout(() => {
            setDomLoaded(true);
        }, 100);
    }, [showSubModal]);

    return (
        <FormWrapper onSubmit={handleSubmit(sendForm)}>
            <p>{`نام نیروی ${subModalStatus}`}</p>
            <div className={errors?.name?.message ? 'auto_complete auto_complete_error' : 'auto_complete'}>
                {domLoaded && (
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
                                        onChange(newValue);
                                    }}
                                    sx={{ width: '100%' }}
                                    renderInput={params => <TextField {...params} />}
                                />
                            );
                        }}
                    />
                )}

                <img src={circle} />
            </div>
            <p className='auto_error'>{errors?.name?.message}</p>
            <p>جایگاه نیرو</p>
            <div className={errors?.station?.message ? 'auto_complete auto_complete_error' : 'auto_complete'}>
                {domLoaded && (
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
                                        onChange(newValue);
                                    }}
                                    sx={{ width: '100%' }}
                                    renderInput={params => <TextField {...params} />}
                                />
                            );
                        }}
                    />
                )}

                <img src={blocking} />
            </div>
            <p className='auto_error'>{errors?.station?.message}</p>

            <p style={{ marginBottom: '10px' }}>ساعت کاری نیرو</p>
            <div className='work_hour'>
                <div>
                    <p>تعداد ساعت کار {subModalStatus} : </p>
                    <p> {getValues().hour} ساعت کاری</p>
                </div>
                <div className='input_wrapper'>
                    <FormButton icon={increaseArrow} onClick={() => getValues().hour < 24 && setValue('hour', getValues().hour + 1)} />
                    <input {...register('hour')} readOnly />
                    <FormButton icon={decreesArrow} onClick={() => getValues().hour > 1 && setValue('hour', getValues().hour - 1)} />
                </div>
            </div>
            <p style={{ marginBottom: '10px' }}>دقیقه کاری نیرو</p>
            <div className='work_hour'>
                <div>
                    <p>تعداد دقیقه کار {subModalStatus} : </p>
                    <p> {getValues().min} دقیقه کاری</p>
                </div>
                <div className='input_wrapper'>
                    <FormButton icon={increaseArrow} onClick={() => getValues().min < 50 && setValue('min', getValues().min + 10)} />
                    <input {...register('min')} readOnly />
                    <FormButton icon={decreesArrow} onClick={() => getValues().min > 1 && setValue('min', getValues().min - 10)} />
                </div>
            </div>

            <FormButton text='ثبت' loading={false} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
        </FormWrapper>
    );
};

export default AddDetailModal;
