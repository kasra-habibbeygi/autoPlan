/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Axios from '../../configs/axios';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import notes from './../../assets/images/sideBar/Notes.svg';
import document from './../../assets/images/sideBar/DocumentAdd.svg';
import widget from './../../assets/images/sideBar/WidgetAdd.svg';
import { ActionCell } from '../deviation/deviation.style';
import { StationWrapper } from './station.style';

//Components
import FormButton from '../../components/form-groups/form-button';
import PagesHeader from '../../components/template/pages-header';
import Table from '../../components/template/Table';
import Modal from '../../components/template/modal';
import InputComponent from '../../components/form-groups/input-component';
import ConfirmModal from '../../components/template/confirm-modal';

// Tools
import Tools from '../../utils/tools';

const Station = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [stationData, setStationData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    useEffect(() => {
        setLoader(true);
        Axios.get(`station_mgmt/?page_size=10&page=${pageStatus.current}`).then(res => {
            setStationData(res.data.data);
            setPageStatus({
                ...pageStatus,
                total: res.data.total
            });
            setLoader(false);
        });
    }, [pageStatus.current]);

    const stationTypeNameChanger = item => {
        if (item === 'gas') {
            return 'گاز کار';
        } else if (item === 'mechanic') {
            return 'مکانیک';
        } else if (item === 'elec') {
            return 'برق کار';
        } else if (item === 'blocking') {
            return 'جلوبندی';
        }
        return 'هیبرید';
    };

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        {
            id: 2,
            title: 'تاریخ',
            key: 'date_created',
            renderCell: data => Tools.changeDateToJalali(data.date_created)
        },
        { id: 3, title: 'عنوان', key: 'title' },
        { id: 4, title: 'کد', key: 'code' },
        { id: 5, title: 'وضعیت قطعات', key: 'equipment_status', renderCell: data => (data.equipment_status ? 'کامل' : 'ناقص') },
        { id: 6, title: 'وضعیت تجهیزات', key: 'tools_status', renderCell: data => (data.tools_status ? 'کامل' : 'ناقص') },
        {
            id: 7,
            title: 'نوع',
            key: 'station_type',
            renderCell: data => stationTypeNameChanger(data.station_type)
        },
        {
            id: 8,
            title: 'عملیات',
            key: 'actions',
            renderCell: () => (
                <ActionCell>
                    <FormButton icon={pen} onClick={() => setShowAddModal(true)} />
                    <FormButton icon={trashBin} onClick={() => setConfirmModalStatus(true)} />
                </ActionCell>
            )
        }
    ];

    const { register, control, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            title: '',
            code: '',
            type: '',
            partsStatus: '',
            equipmentStatus: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = data => {};

    return (
        <StationWrapper error={errors?.type?.message}>
            <PagesHeader
                buttonTitle='ثبت جایگاه جدید'
                secondFiled='ساعت کاری مجموعه : ۸ ساعت'
                onButtonClick={() => setShowAddModal(true)}
            />
            <Table columns={columns} rows={stationData} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={loader} />
            <Modal state={showAddModal} setState={setShowAddModal} handleClose={reset} bgStatus={true}>
                <div className='formControl'>
                    <h2>فرم ثبت جایگاه</h2>

                    <form onSubmit={handleSubmit(formSubmit)}>
                        <InputComponent
                            title='عنوان'
                            icon={notes}
                            detail={{
                                ...register('title', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.title}
                            placeHolder='عنوان'
                        />

                        <InputComponent
                            title='کد'
                            icon={document}
                            detail={{
                                ...register('code', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.code}
                            placeHolder='کد'
                        />

                        <div className='auto_complete_wrapper'>
                            <p className='auto_complete_title'>نوع</p>
                            <div className='auto_complete'>
                                <Controller
                                    control={control}
                                    name='type'
                                    rules={{ required: 'این فیلد اجباری است' }}
                                    render={({ field: { onChange, value } }) => {
                                        return (
                                            <Autocomplete
                                                options={top100Films}
                                                value={value?.label}
                                                onChange={(event, newValue) => {
                                                    onChange(newValue?.label);
                                                }}
                                                sx={{ width: '100%' }}
                                                renderInput={params => <TextField {...params} />}
                                            />
                                        );
                                    }}
                                />

                                <img src={widget} />
                            </div>
                            <p className='auto_complete_error'>{errors?.type?.message}</p>
                        </div>

                        <div className='radios'>
                            <p className='title'>وضعیت قطعات</p>
                            <Controller
                                control={control}
                                name='partsStatus'
                                rules={{ required: 'این فیلد اجباری است' }}
                                render={({ field: { onChange, value } }) => (
                                    <RadioGroup
                                        row
                                        name='radio-buttons-group'
                                        value={value}
                                        onChange={event => onChange(event.target.value)}
                                    >
                                        <FormControlLabel
                                            value='imperfect'
                                            control={<Radio />}
                                            label='ناقص'
                                            sx={{ backgroundColor: 'transparent' }}
                                        />
                                        <FormControlLabel
                                            value='perfect'
                                            control={<Radio />}
                                            label='کامل'
                                            sx={{ backgroundColor: 'transparent' }}
                                        />
                                    </RadioGroup>
                                )}
                            />
                            <p className='error'>{errors?.partsStatus?.message}</p>
                        </div>

                        <div className='radios'>
                            <p className='title'>وضعیت تجهیزات</p>
                            <Controller
                                control={control}
                                name='equipmentStatus'
                                rules={{ required: 'این فیلد اجباری است' }}
                                render={({ field: { onChange, value } }) => (
                                    <RadioGroup
                                        row
                                        name='radio-buttons-group'
                                        value={value}
                                        onChange={event => onChange(event.target.value)}
                                    >
                                        <FormControlLabel
                                            value='imperfect'
                                            control={<Radio />}
                                            label='ناقص'
                                            sx={{ backgroundColor: 'transparent' }}
                                        />
                                        <FormControlLabel
                                            value='perfect'
                                            control={<Radio />}
                                            label='کامل'
                                            sx={{ backgroundColor: 'transparent' }}
                                        />
                                    </RadioGroup>
                                )}
                            />
                            <p className='error'>{errors?.equipmentStatus?.message}</p>
                        </div>

                        <FormButton text='ادامه' type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
                    </form>
                </div>
            </Modal>

            <ConfirmModal status={confirmModalStatus} setStatus={setConfirmModalStatus} title='آیا از حذف این ردیف مطمئن هستید ؟' />
        </StationWrapper>
    );
};

export default Station;

const top100Films = [
    { label: 'مکانیک', year: 1994 },
    { label: 'هیبرید', year: 1994 },
    { label: 'برق کار', year: 1994 },
    { label: 'گاز کار', year: 1994 },
    { label: 'جلو بندی', year: 1994 }
];
