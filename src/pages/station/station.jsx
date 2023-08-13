/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Checkbox, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Axios from '../../configs/axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import document from './../../assets/images/sideBar/DocumentAdd.svg';
import widget from './../../assets/images/sideBar/WidgetAdd.svg';
import { ActionCell } from '../deviation/deviation.style';
import { StationWrapper } from './station.style';
import plus from './../../assets/images/icons/plus.svg';
import closeIcon from './../../assets/images/global/closeIcon.svg';

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
    const [activeStation, setActiveStation] = useState(true);
    const [inputsValue, setInputsValue] = useState({
        partsInput: '',
        equipmentInput: ''
    });
    const [statusArrays, setStatusArrays] = useState({
        parts: [],
        equipment: []
    });
    const [buttonLoader, setButtonLoader] = useState({
        modalButton: false,
        delete: false
    });

    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const addInputPartRef = useRef();
    const addInputEquipmentRef = useRef();

    const { register, control, handleSubmit, formState, reset, setValue, watch } = useForm({
        mode: 'onTouched'
    });
    const { errors } = formState;

    const conditionOfParts = watch('condition_of_parts');
    const equipmentStatus = watch('equipment_status');

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
            let temp = [];

            res.data.results.map(item => {
                if (item.technical_force) {
                    temp.push({
                        label: item.title,
                        value: item.id
                    });
                }

                return;
            });

            setTypeList(temp);
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

        const newData = {
            ...data,
            condition_of_parts: JSON.parse(data.condition_of_parts),
            equipment_status: JSON.parse(data.equipment_status),
            list_of_condition_of_parts: statusArrays.parts.map(item => item.label),
            list_of_equipment_status: statusArrays.equipment.map(item => item.label),
            station_status: activeStation
        };

        if (modalStatus === 'add') {
            Axios.post('/worker/admin/seat-capacity/list_create/', newData)
                .then(() => {
                    setReload(!reload);
                    toast.success('جایگاه جدید با موفقیت ثبت شد');
                    setModalOpen(false);
                    closeModalFunctions();
                })
                .catch(() => {})
                .finally(() => setButtonLoader({ ...buttonLoader, modalButton: false }));
        } else {
            Axios.put(`/worker/admin/seat-capacity/retrieve_update_destroy/?pk=${specificDeviationId}`, newData)
                .then(() => {
                    setReload(!reload);
                    toast.success('جایگاه با موفقیت ویرایش شد');
                    setModalOpen(false);
                    closeModalFunctions();
                })
                .catch(() => {})
                .finally(() => setButtonLoader({ ...buttonLoader, modalButton: false }));
        }
    };

    const editModalHandler = data => {
        setModalStatus('edit');
        setModalOpen(true);
        setValue('code', data.code);
        setValue('type', data.type);
        setValue('condition_of_parts', data.condition_of_parts);
        setValue('equipment_status', data.equipment_status);
        setStatusArrays({
            parts: data.lack_parts.map(item => ({
                id: uuidv4(),
                label: item.title
            })),
            equipment: data.equipment_deficits.map(item => ({
                id: uuidv4(),
                label: item.equipment
            }))
        });
        setActiveStation(data.station_status);
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

    const closeModalFunctions = () => {
        reset();
        setStatusArrays({
            parts: [],
            equipment: []
        });
        setInputsValue({
            partsInput: '',
            equipmentInput: ''
        });
        setActiveStation(false);
        setSpecificDeviationId();
    };

    const addPartsHandler = () => {
        if (inputsValue.partsInput.trim()) {
            setStatusArrays(prev => ({
                ...prev,
                parts: [...prev.parts, { id: uuidv4(), label: inputsValue.partsInput }]
            }));
            setInputsValue(prev => ({
                ...prev,
                partsInput: ''
            }));

            addInputPartRef.current.focus();
        }
    };

    const addEquipmentHandler = () => {
        if (inputsValue.equipmentInput.trim()) {
            setStatusArrays(prev => ({
                ...prev,
                equipment: [...prev.equipment, { id: uuidv4(), label: inputsValue.equipmentInput }]
            }));
            setInputsValue(prev => ({
                ...prev,
                equipmentInput: ''
            }));

            addInputEquipmentRef.current.focus();
        }
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
            <Modal state={modalOpen} setState={setModalOpen} handleClose={closeModalFunctions} bgStatus={true}>
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
                        {(conditionOfParts === 'false' || conditionOfParts === false) && (
                            <>
                                <div className='choose_input'>
                                    <p className='choose_input_title'>نام قطعه</p>
                                    <div className='choose_input_wrapper'>
                                        <input
                                            type='text'
                                            className='choose_input_filed'
                                            placeholder='نام قطعه'
                                            ref={addInputPartRef}
                                            value={inputsValue.partsInput}
                                            onChange={e =>
                                                setInputsValue(prev => ({
                                                    ...prev,
                                                    partsInput: e.target.value
                                                }))
                                            }
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addPartsHandler();
                                                }
                                            }}
                                        />
                                        <FormButton icon={plus} width='fit-content' padding='5px' onClick={addPartsHandler} />
                                    </div>
                                </div>

                                <div className='options_array'>
                                    {statusArrays.parts.map(item => (
                                        <div
                                            className='options_wrapper'
                                            key={item.id}
                                            onClick={() =>
                                                setStatusArrays(prev => ({
                                                    ...prev,
                                                    parts: prev.parts.filter(filed => filed !== item)
                                                }))
                                            }
                                        >
                                            <p className='options_text'>{item.label}</p>
                                            <img src={closeIcon} className='options_img' />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
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

                        {(equipmentStatus === 'false' || equipmentStatus === false) && (
                            <>
                                <div className='choose_input'>
                                    <p className='choose_input_title'>نام تجهیزات</p>
                                    <div className='choose_input_wrapper'>
                                        <input
                                            type='text'
                                            className='choose_input_filed'
                                            placeholder='نام تجهیزات'
                                            ref={addInputEquipmentRef}
                                            value={inputsValue.equipmentInput}
                                            onChange={e =>
                                                setInputsValue(prev => ({
                                                    ...prev,
                                                    equipmentInput: e.target.value
                                                }))
                                            }
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addEquipmentHandler();
                                                }
                                            }}
                                        />
                                        <FormButton icon={plus} width='fit-content' padding='5px' onClick={addEquipmentHandler} />
                                    </div>
                                </div>
                                <div className='options_array'>
                                    {statusArrays.equipment.map(item => (
                                        <div
                                            className='options_wrapper'
                                            key={item.id}
                                            onClick={() =>
                                                setStatusArrays(prev => ({
                                                    ...prev,
                                                    equipment: prev.equipment.filter(filed => filed !== item)
                                                }))
                                            }
                                        >
                                            <p className='options_text'>{item.label}</p>
                                            <img src={closeIcon} className='options_img' />
                                        </div>
                                    ))}
                                </div>

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={activeStation}
                                            onChange={e => setActiveStation(e.target.checked)}
                                            checked={activeStation}
                                        />
                                    }
                                    label='جایگاه فعال'
                                    sx={{ marginBottom: '30px' }}
                                />
                            </>
                        )}
                        <FormButton
                            text={modalStatus === 'edit' ? 'ویرایش' : 'ثبت'}
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
