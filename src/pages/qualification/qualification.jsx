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
import Button from '../../components/form-groups/button';
import Modal from '../../components/template/modal';
import InputComponent from '../../components/form-groups/input-component';
import FormButton from '../../components/form-button/form-button';
import ProgressBar from '../../components/pages/qualification/progress-bar';
import SelectInput from '../../components/form-groups/select-input';

const Qualification = () => {
    const [showAddModal, setShowAddModal] = useState(false);
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
            date: '',
            blocking: '',
            mechanic: '',
            electrician: '',
            gas: ''
        },
        mode: 'onTouched'
    });

    const { errors } = formState;

    const formSubmit = () => {};

    const closeModalHandler = () => {
        reset();
    };

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
                        <SelectInput title='جلوبندی' icon={blocking} />
                        {/* <InputComponent
                            title='جلوبندی'
                            type='text'
                            icon={blocking}
                            detail={{
                                ...register('blocking', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.blocking}
                        /> */}
                        <SelectInput title='مکانیک' icon={ShockAbsorber} />

                        {/* <InputComponent
                            title='مکانیک'
                            type='text'
                            icon={ShockAbsorber}
                            detail={{
                                ...register('mechanic', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.mechanic}
                        /> */}
                        <SelectInput title='برق' icon={Accumulator} />

                        {/* <InputComponent
                            title='برق'
                            type='text'
                            icon={Accumulator}
                            detail={{
                                ...register('electrician', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.electrician}
                        /> */}
                        <SelectInput title='گاز' icon={GasStation} />

                        {/* <InputComponent
                            title='گاز'
                            type='text'
                            icon={GasStation}
                            detail={{
                                ...register('gas', {
                                    required: {
                                        value: true,
                                        message: 'این فیلد اجباری است'
                                    }
                                })
                            }}
                            error={errors?.gas}
                        /> */}

                        <FormButton text='ادامه' loading={false} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
                    </form>
                </div>
            </Modal>
        </QualificationWrapper>
    );
};

export default Qualification;
