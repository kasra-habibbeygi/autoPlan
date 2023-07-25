/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

//Assets
import check from '../../../assets/images/icons/check.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';
import Axios from './../../../configs/axios';

//Components
import FormButton from '../../form-groups/form-button';
import { Autocomplete, TextField } from '@mui/material';

const ResponsibleForAction = ({ setStep, setAllDetail, allDetail, chosenEditItemDetails }) => {
    const [personnel, setPersonnel] = useState([{ value: '', label: '', id: '' }]);
    const { handleSubmit, formState, setValue, control } = useForm({
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
            if (chosenEditItemDetails?.action_officials_info) {
                const newArray = chosenEditItemDetails?.action_officials_info?.map((item, index) => ({
                    [`correction_${index + 1}`]: { label: item.fullname, value: item.id }
                }));

                newArray.forEach((item, index) => setValue(`correction_${index + 1}`, item[`correction_${index + 1}`]));
            }
        });
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        setAllDetail(prev => ({
            ...prev,
            actionPerson: data
        }));
        setStep(5);

        // setButtonLoading(true);
        // const jsonString = JSON.stringify(data);

        // if (isDirty) {
        //     Axios.put(`reform_action/set_action_agent/?id=${allDetail?.mainId}`, {
        //         action_agent: jsonString
        //     })
        //         .then(() => {
        //             setAllDetail(prev => ({
        //                 ...prev,
        //                 actionPerson: jsonString
        //             }));
        //             setReload(prev => !prev);
        //             setStep(5);
        //         })
        //         .catch(() => {})
        //         .finally(() => setButtonLoading(false));
        // } else {
        //     setAllDetail(prev => ({
        //         ...prev,
        //         actionPerson: jsonString
        //     }));
        //     setStep(5);
        // }
    };

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                {allDetail?.actions.map((item, index) => (
                    <div className='auto_complete_wrapper' key={item.action}>
                        <p className='auto_title'>{`مسئول اقدام ${item.action}`}</p>
                        <div
                            className={errors?.[`correction_${index + 1}`]?.message ? 'auto_complete auto_complete_error' : 'auto_complete'}
                        >
                            <Controller
                                control={control}
                                name={`correction_${index + 1}`}
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

                            <img src={check} />
                        </div>
                        <p className='auto_error'>{errors?.[`correction_${index + 1}`]?.message}</p>
                    </div>
                ))}

                <FormButton text='بعدی' type='submit' backgroundColor={'#174787'} color={'white'} height={48} icon={arrow} />
                <FormButton text='قبلی' backgroundColor='#174787' color='white' height={48} onClick={() => setStep(3)} margin={'20px 0'} />
            </form>
        </Style>
    );
};

export default ResponsibleForAction;
