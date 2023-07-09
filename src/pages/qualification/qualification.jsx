import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//Assets
import CalendarDate from '../../assets/images/icons/CalendarDate.svg';
import ShockAbsorber from '../../assets/images/icons/ShockAbsorber.svg';
import Accumulator from '../../assets/images/icons/Accumulator.svg';
import blocking from '../../assets/images/icons/blocking.svg';
import GasStation from '../../assets/images/icons/GasStation.svg';
import { QualificationWrapper } from './qualification.style';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import InputComponent from '../../components/form-groups/input-component';
import FormButton from '../../components/form-groups/form-button';
import ProgressBar from '../../components/pages/qualification/progress-bar';
import SelectInput from '../../components/form-groups/select-input';
import AddDetailModal from '../../components/pages/qualification/add-detail-modal';

const Qualification = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [subModalStatus, setSubModalStatus] = useState();
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
            title: 'جایگاه',
            key: 'position',
            renderCell: () => <FormButton text={'مشاهده'} />
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

    const { register, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            date: ''
        },
        mode: 'onTouched'
    });

    const { errors, submitCount } = formState;

    const formSubmit = () => {};

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

    // console.log(details);

    return (
        <QualificationWrapper>
            <PagesHeader
                buttonTitle='ثبت ظرفیت سنجی جدید'
                secondFiled='ساعت کاری مجموعه : ۸ ساعت'
                onButtonClick={() => setShowAddModal(true)}
            />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
            <Modal state={showAddModal} setState={setShowAddModal} bgStatus={true} handleClose={closeModalHandler}>
                <div className='formControl'>
                    <h2>فرم ظرفیت سنجی</h2>
                    <ProgressBar />
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <InputComponent
                            title='تاریخ'
                            icon={CalendarDate}
                            type='date'
                            detail={{
                                ...register('date', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.date}
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
                        />

                        <FormButton text='ادامه' loading={false} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
                    </form>
                </div>
            </Modal>

            <Modal state={showSubModal} setState={setShowSubModal} maxWidth='sm' handleClose={closeSubModalHandler}>
                <AddDetailModal subModalStatus={subModalStatus} setDetails={setDetails} closeSubModalHandler={closeSubModalHandler} />
            </Modal>
        </QualificationWrapper>
    );
};

export default Qualification;
