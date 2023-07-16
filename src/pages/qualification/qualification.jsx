import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

//Assets
import ShockAbsorber from '../../assets/images/icons/ShockAbsorber.svg';
import Accumulator from '../../assets/images/icons/Accumulator.svg';
import blocking from '../../assets/images/icons/blocking.svg';
import GasStation from '../../assets/images/icons/GasStation.svg';
import { QualificationWrapper } from './qualification.style';
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import { ActionCell } from '../deviation/deviation.style';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import SelectInput from '../../components/form-groups/select-input';
import AddDetailModal from '../../components/pages/qualification/add-detail-modal';
import FormButton from '../../components/form-groups/form-button';
import DatePickerComponent from '../../components/form-groups/date-picker';
import ConfirmModal from '../../components/template/confirm-modal';

const Qualification = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [subModalStatus, setSubModalStatus] = useState();
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [step, setStep] = useState(1);
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

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'تاریخ', key: 'date' },
        { id: 3, title: 'جلوبندی', key: 'blocking' },
        { id: 4, title: 'مکانیک', key: 'mechanic' },
        { id: 5, title: 'برق', key: 'electric' },
        { id: 6, title: 'گاز', key: 'gas' },
        {
            id: 7,
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

    const rows = [
        {
            id: 1,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 2,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 3,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 4,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 5,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 6,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 7,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        }
    ];

    const { control, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            date: ''
        },
        mode: 'onTouched'
    });

    const { errors, submitCount } = formState;

    const formSubmit = data => {
        if (
            details.blockingList.length > 0 &&
            details.electricList.length > 0 &&
            details.gasList.length > 0 &&
            details.mechanicList.length > 0
        ) {
            console.log(data);
        }
    };

    const closeModalHandler = () => {
        setStep(1);
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

    return (
        <QualificationWrapper step={step}>
            <PagesHeader
                buttonTitle='ثبت ظرفیت سنجی جدید'
                secondFiled='ساعت کاری مجموعه : ۸ ساعت'
                onButtonClick={() => setShowAddModal(true)}
            />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
            <Modal state={showAddModal} setState={setShowAddModal} bgStatus={true} handleClose={closeModalHandler}>
                <div className='formControl'>
                    <h2>فرم ظرفیت سنجی</h2>
                    {/* <ProgressBar step={step} /> */}
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <Controller
                            control={control}
                            name='date'
                            rules={{ required: 'این فیلد اجباری است' }}
                            render={({ field: { onChange, value } }) => {
                                return <DatePickerComponent value={value} onChange={onChange} title='تاریخ' error={errors?.date} />;
                            }}
                        />

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

                        <FormButton text='ادامه' type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
                    </form>
                </div>
            </Modal>

            <Modal state={showSubModal} setState={setShowSubModal} maxWidth='sm' handleClose={closeSubModalHandler}>
                <AddDetailModal subModalStatus={subModalStatus} setDetails={setDetails} closeSubModalHandler={closeSubModalHandler} />
            </Modal>
            <ConfirmModal status={confirmModalStatus} setStatus={setConfirmModalStatus} title='آیا از حذف این ردیف مطمئن هستید ؟' />
        </QualificationWrapper>
    );
};

export default Qualification;
