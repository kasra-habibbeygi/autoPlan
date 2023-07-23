/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Axios from '../../configs/axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
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
import PERMISSION from '../../utils/permission.ts';

const Station = () => {
    const userPermissions = useSelector(state => state.User.info.permission);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState('');
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [typeList, setTypeList] = useState([]);
    const [stationData, setStationData] = useState();
    const [loader, setLoader] = useState(true);
    const [reload, setReload] = useState(false);
    const [specificDeviationId, setSpecificDeviationId] = useState();
    const [buttonLoader, setButtonLoader] = useState({
        modalButton: false,
        delete: false
    });

    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const { register, control, handleSubmit, formState, reset, setValue } = useForm({
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        setLoader(true);
        Axios.get(`worker/admin/seat-capacity/list_create/?page=${pageStatus.current}`).then(res => {
            setStationData(res.data.results);
            setPageStatus({
                ...pageStatus,
                total: res?.data?.total
            });
            setLoader(false);
        });
        Axios.get('worker/admin/organizational-position/list_create/?page_size=500').then(res => {
            let posts = res.data.results.map(item => ({
                label: item.title,
                value: item.id
            }));

            setTypeList(posts);
        });
    }, [pageStatus.current, reload]);

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        {
            id: 2,
            title: 'تاریخ',
            key: 'create_at'
        },
        { id: 4, title: 'کد', key: 'code' },
        { id: 5, title: 'وضعیت قطعات', key: 'equipment_status', renderCell: data => (data.equipment_status ? 'کامل' : 'ناقص') },
        { id: 6, title: 'وضعیت تجهیزات', key: 'condition_of_parts', renderCell: data => (data.condition_of_parts ? 'کامل' : 'ناقص') },
        {
            id: 7,
            title: 'نوع',
            key: 'type',
            renderCell: data => typeList.filter(item => item.value === data.type)[0]?.label
        },
        {
            id: 8,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => (
                <ActionCell>
                    <FormButton
                        icon={pen}
                        onClick={() => editModalHandler(data)}
                        disabled={!userPermissions.includes(PERMISSION.SEAT_CAPACITY.EDIT)}
                    />
                    <FormButton
                        icon={trashBin}
                        onClick={() => deleteModalHandler(data.id)}
                        disabled={!userPermissions.includes(PERMISSION.SEAT_CAPACITY.DELETE)}
                    />
                </ActionCell>
            )
        }
    ];

    const formSubmit = data => {
        setButtonLoader({ ...buttonLoader, modalButton: true });
        if (modalStatus === 'add') {
            Axios.post('/worker/admin/seat-capacity/list_create/', data)
                .then(() => {
                    setButtonLoader({ ...buttonLoader, modalButton: false });
                    setReload(!reload);
                    toast.success('جایگاه جدید با موفقیت ثبت شد');
                    setModalOpen(false);
                    reset();
                })
                .catch(() => {});
        } else {
            Axios.put(`/worker/admin/seat-capacity/retrieve_update_destroy/?pk=${specificDeviationId}`, data)
                .then(() => {
                    setButtonLoader({ ...buttonLoader, modalButton: false });
                    setReload(!reload);
                    toast.success('جایگاه با موفقیت ویرایش شد');
                    setModalOpen(false);
                    reset();
                })
                .catch(() => {});
        }
    };

    const editModalHandler = data => {
        setModalStatus('edit');
        setModalOpen(true);
        setValue('title', data.title);
        setValue('code', data.code);
        setValue('type', data.type);
        setValue('condition_of_parts', data.condition_of_parts);
        setValue('equipment_status', data.equipment_status);
        setSpecificDeviationId(data.id);
    };

    const deleteModalHandler = id => {
        setConfirmModalStatus(true);
        setSpecificDeviationId(id);
    };

    const addModalHandler = () => {
        setModalStatus('add');
        setModalOpen(true);
        setValue('condition_of_parts', false);
        setValue('equipment_status', false);
    };

    const deleteHandler = () => {
        setButtonLoader({ ...buttonLoader, delete: true });
        Axios.delete(`worker/admin/seat-capacity/retrieve_update_destroy/?pk=${specificDeviationId}`).then(() => {
            setButtonLoader({ ...buttonLoader, delete: false });
            setReload(!reload);
            toast.success('جایگاه  با موفقیت حذف شد');
            setConfirmModalStatus(false);
        });
    };

    return (
        <StationWrapper error={errors?.type?.message}>
            <PagesHeader
                buttonTitle='ثبت جایگاه جدید'
                secondFiled='ساعت کاری مجموعه : ۸ ساعت'
                onButtonClick={addModalHandler}
                disabled={!userPermissions.includes(PERMISSION.SEAT_CAPACITY.ADD)}
            />
            <Table columns={columns} rows={stationData} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={loader} />
            <Modal state={modalOpen} setState={setModalOpen} handleClose={reset} bgStatus={true}>
                <div className='formControl'>
                    {modalStatus === 'add' ? <h2>فرم ثبت جایگاه</h2> : <h2>ویرایش جایگاه</h2>}
                    <form onSubmit={handleSubmit(formSubmit)}>
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
                                                options={typeList}
                                                value={typeList?.filter(item => item.value === value)[0]}
                                                onChange={(_, newValue) => {
                                                    onChange(newValue?.value);
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

                        <div className='radios'>
                            <p className='title'>وضعیت قطعات</p>
                            <Controller
                                control={control}
                                name='condition_of_parts'
                                render={({ field: { onChange, value } }) => (
                                    <RadioGroup row value={value} onChange={event => onChange(event.target.value)}>
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio />}
                                            label='ناقص'
                                            sx={{ backgroundColor: 'transparent' }}
                                        />
                                        <FormControlLabel
                                            value={true}
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
                                name='equipment_status'
                                render={({ field: { onChange, value } }) => (
                                    <RadioGroup row value={value} onChange={event => onChange(event.target.value)}>
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio />}
                                            label='ناقص'
                                            sx={{ backgroundColor: 'transparent' }}
                                        />
                                        <FormControlLabel
                                            value={true}
                                            control={<Radio />}
                                            label='کامل'
                                            sx={{ backgroundColor: 'transparent' }}
                                        />
                                    </RadioGroup>
                                )}
                            />
                            <p className='error'>{errors?.equipmentStatus?.message}</p>
                        </div>
                        <FormButton
                            text='ادامه'
                            type='submit'
                            backgroundColor='#174787'
                            color='white'
                            height={48}
                            loading={buttonLoader.modalButton}
                        />
                    </form>
                </div>
            </Modal>
            <ConfirmModal
                status={confirmModalStatus}
                setStatus={setConfirmModalStatus}
                title='آیا از حذف این ردیف مطمئن هستید ؟'
                deleteHandler={deleteHandler}
                loading={buttonLoader.delete}
            />
        </StationWrapper>
    );
};

export default Station;
