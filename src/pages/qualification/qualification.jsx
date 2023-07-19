/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../configs/axios';
import { useSelector } from 'react-redux';

//Assets
import ShockAbsorber from '../../assets/images/icons/ShockAbsorber.svg';
import Accumulator from '../../assets/images/icons/Accumulator.svg';
import blocking from '../../assets/images/icons/blocking.svg';
import GasStation from '../../assets/images/icons/GasStation.svg';
import { QualificationWrapper } from './qualification.style';
import { ActionCell } from '../deviation/deviation.style';
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import SelectInput from '../../components/form-groups/select-input';
import AddDetailModal from '../../components/pages/qualification/add-detail-modal';
import FormButton from '../../components/form-groups/form-button';
import DatePickerComponent from '../../components/form-groups/date-picker';
import ConfirmModal from '../../components/template/confirm-modal';

// Tools
import Tools from '../../utils/tools';
import PERMISSION from '../../utils/permission.ts';
import { toast } from 'react-hot-toast';

const Qualification = () => {
    const userPermissions = useSelector(state => state.User.info.permission);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [subModalStatus, setSubModalStatus] = useState();
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [specificQualificationId, setSpecificQualificationId] = useState();
    const [modalStep, setModalStep] = useState(1);
    const [loader, setLoader] = useState(true);
    const [reload, setReload] = useState(false);
    const [qualificationList, setQualificationList] = useState();
    const [buttonLoader, setButtonLoader] = useState({
        modalButton: false,
        delete: false
    });

    const [details, setDetails] = useState({
        blockingList: [],
        mechanicList: [],
        electricList: [],
        gasList: []
    });

    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const { control, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            date: ''
        },
        mode: 'onTouched'
    });
    const { errors, submitCount } = formState;

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'تاریخ', key: 'date', renderCell: data => Tools.changeDateToJalali(data.date_created) },
        { id: 3, title: 'جلوبندی', key: 'blocking_number' },
        { id: 4, title: 'مکانیک', key: 'mechanic_number' },
        { id: 4, title: 'گاز', key: 'gas_number' },
        { id: 5, title: 'برق', key: 'elec_number' },
        { id: 5, title: 'هیبرید', key: 'hybrid_number' },
        {
            id: 7,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => (
                <ActionCell>
                    <FormButton
                        icon={pen}
                        onClick={() => setShowAddModal(true)}
                        disabled={!userPermissions.includes(PERMISSION.CAPACITY.EDIT)}
                    />
                    <FormButton
                        icon={trashBin}
                        onClick={() => deleteModalHandler(data.id)}
                        disabled={!userPermissions.includes(PERMISSION.CAPACITY.DELETE)}
                    />
                </ActionCell>
            )
        }
    ];

    const formSubmit = () => {
        details.blockingList.length > 0 && details.electricList.length > 0 && details.gasList.length > 0 && details.mechanicList.length > 0;
    };

    const closeModalHandler = () => {
        reset();
        setDetails({
            blockingList: [],
            mechanicList: [],
            electricList: [],
            gasList: []
        });
    };

    const closeSubModalHandler = () => {
        setSubModalStatus();
        setShowSubModal(false);
    };

    const deleteModalHandler = id => {
        setConfirmModalStatus(true);
        setSpecificQualificationId(id);
    };

    const deleteHandler = () => {
        setButtonLoader({ ...buttonLoader, delete: true });
        Axios.delete(`workshop_capacity_mgmt/?id=${specificQualificationId}`).then(() => {
            setButtonLoader({ ...buttonLoader, delete: false });
            setReload(!reload);
            toast.success('ظرفیت  با موفقیت حذف شد');
            setConfirmModalStatus(false);
        });
    };
    console.log(specificQualificationId);
    useEffect(() => {
        setLoader(true);
        Axios.get(`workshop_capacity_mgmt/?page_size=10&page=${pageStatus.current}`).then(res => {
            setQualificationList(res.data.data);
            setPageStatus({
                ...pageStatus,
                total: res.data.total
            });
            setLoader(false);
        });
    }, [pageStatus.current, reload]);

    return (
        <QualificationWrapper>
            <PagesHeader
                buttonTitle='ثبت ظرفیت سنجی جدید'
                secondFiled='ساعت کاری مجموعه : ۸ ساعت'
                onButtonClick={() => setShowAddModal(true)}
                disabled={!userPermissions.includes(PERMISSION.CAPACITY.ADD)}
            />
            <Table columns={columns} rows={qualificationList} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={loader} />
            <Modal state={showAddModal} setState={setShowAddModal} bgStatus={true} handleClose={closeModalHandler}>
                <div className='formControl'>
                    <h2>فرم ظرفیت سنجی</h2>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <div className='date_wrapper'>
                            <Controller
                                control={control}
                                name='date'
                                rules={{ required: 'این فیلد اجباری است' }}
                                render={({ field: { onChange, value } }) => {
                                    return <DatePickerComponent value={value} onChange={onChange} title='تاریخ' error={errors?.date} />;
                                }}
                            />
                        </div>

                        <SelectInput
                            title='جلوبندی'
                            icon={blocking}
                            onClick={() => {
                                setShowSubModal(true);
                                setSubModalStatus('جلوبندی');
                            }}
                            items={details.blockingList}
                            submitCount={submitCount}
                            setDetails={setDetails}
                            placeHolder='ظرفیت سنجی جلوبندی'
                        />

                        <SelectInput
                            title='مکانیک'
                            icon={ShockAbsorber}
                            onClick={() => {
                                setShowSubModal(true);
                                setSubModalStatus('مکانیک');
                            }}
                            items={details.mechanicList}
                            submitCount={submitCount}
                            setDetails={setDetails}
                            placeHolder='ظرفیت سنجی مکانیکی'
                        />

                        <SelectInput
                            title='برق'
                            icon={Accumulator}
                            onClick={() => {
                                setShowSubModal(true);
                                setSubModalStatus('برق');
                            }}
                            items={details.electricList}
                            submitCount={submitCount}
                            setDetails={setDetails}
                            placeHolder='ظرفیت سنجی برق کار'
                        />

                        <SelectInput
                            title='گاز'
                            icon={GasStation}
                            onClick={() => {
                                setShowSubModal(true);
                                setSubModalStatus('گاز');
                            }}
                            items={details.gasList}
                            submitCount={submitCount}
                            setDetails={setDetails}
                            placeHolder='ظرفیت سنجی گاز کار'
                        />

                        <SelectInput
                            title='هیبرید'
                            icon={GasStation}
                            onClick={() => {
                                setShowSubModal(true);
                                setSubModalStatus('هیبرید');
                            }}
                            items={details.gasList}
                            submitCount={submitCount}
                            setDetails={setDetails}
                            placeHolder='ظرفیت سنجی هیبرید'
                        />

                        <FormButton text='ثبت' type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
                    </form>
                </div>
            </Modal>
            <Modal state={showSubModal} setState={setShowSubModal} maxWidth='sm' handleClose={closeSubModalHandler}>
                <AddDetailModal subModalStatus={subModalStatus} setDetails={setDetails} closeSubModalHandler={closeSubModalHandler} />
            </Modal>
            <ConfirmModal
                status={confirmModalStatus}
                setStatus={setConfirmModalStatus}
                title='آیا از حذف این ردیف مطمئن هستید ؟'
                deleteHandler={deleteHandler}
                loading={buttonLoader.delete}
            />
        </QualificationWrapper>
    );
};

export default Qualification;
