import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//Assets
import Bus from '../../assets/images/icons/Bus.svg';
import Arrow from '../../assets/images/global/arrow.svg';
import { PlanningField } from './planning.style';
import PhoneIcon from '../../assets/images/login/addPhone.svg';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import InputComponent from '../../components/form-groups/input-component';
import ProgressBar from '../../components/pages/planning/progress-bar';
import FormButton from '../../components/form-groups/form-button';
import FilterModal from '../../components/pages/planning/filter-modal';

const Planning = () => {
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [step, setStep] = useState(3);
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            date: '',
            internetReception: '',
            phoneReception: '',
            presentReception: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const openModal = () => {
        setIsModalOpen(true);
    };

    const formSubmit = () => {};

    return (
        <PlanningField>
            <PagesHeader
                buttonTitle='ثبت برنامه جدید'
                onButtonClick={openModal}
                hasFilter={true}
                onFilterClick={() => setShowFilterModal(true)}
            />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
            <Modal state={showFilterModal} setState={setShowFilterModal} maxWidth='sm'>
                <FilterModal />
            </Modal>
            <Modal state={modalIsOpen} setState={setIsModalOpen} bgStatus={true}>
                <div className='formControl'>
                    <h2>برنامه ریزی تعمیرات</h2>
                    <ProgressBar step={step} />
                    {step === 1 && (
                        <form onSubmit={handleSubmit(formSubmit)}>
                            <InputComponent
                                title='برند'
                                placeHolder='برند خودرو'
                                type='text'
                                icon={Bus}
                                detail={{
                                    ...register('name', {
                                        required: {
                                            value: true,
                                            message: 'این فیلد اجباری است'
                                        }
                                    })
                                }}
                                error={errors?.name}
                            />
                            <InputComponent
                                title='مدل'
                                placeHolder='مدل خودرو'
                                type='text'
                                icon={Bus}
                                detail={{
                                    ...register('name', {
                                        required: {
                                            value: true,
                                            message: 'این فیلد اجباری است'
                                        }
                                    })
                                }}
                                error={errors?.name}
                            />
                            <InputComponent
                                title='نام آورنده'
                                placeHolder='نام آورنده خودرو'
                                type='text'
                                icon={Bus}
                                detail={{
                                    ...register('name', {
                                        required: {
                                            value: true,
                                            message: 'این فیلد اجباری است'
                                        }
                                    })
                                }}
                                error={errors?.name}
                            />
                            <InputComponent
                                title='شماره موبایل'
                                placeHolder='09----------'
                                type='text'
                                icon={PhoneIcon}
                                detail={{
                                    ...register('name', {
                                        required: {
                                            value: true,
                                            message: 'این فیلد اجباری است'
                                        }
                                    })
                                }}
                                error={errors?.name}
                            />
                            <FormButton
                                text='بعدی'
                                icon={Arrow}
                                loading={false}
                                width='fit-content'
                                className='login'
                                backgroundColor={'#174787'}
                                onClick={() => {}}
                                height='48px'
                                type='submit'
                            />
                        </form>
                    )}

                    {step === 2 && (
                        <form className='form_double_col'>
                            <div className='col'>
                                <InputComponent
                                    title='نوع تعمیر'
                                    placeHolder='نوع تعمیر خودرو'
                                    type='text'
                                    icon={PhoneIcon}
                                    detail={{
                                        ...register('name', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.name}
                                />
                                <InputComponent
                                    title='جایگاه'
                                    placeHolder='جایگاه تعمیر خودرو'
                                    type='text'
                                    icon={PhoneIcon}
                                    detail={{
                                        ...register('name', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.name}
                                />
                                <InputComponent
                                    title='کد تعمیر کار | نام تعمیر کار'
                                    placeHolder='کد | نام تعمیر کار خودرو'
                                    type='text'
                                    icon={PhoneIcon}
                                    detail={{
                                        ...register('name', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.name}
                                />
                                <InputComponent
                                    title='شماره هرم'
                                    placeHolder='شماره هرم'
                                    type='text'
                                    icon={PhoneIcon}
                                    detail={{
                                        ...register('name', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.name}
                                />
                            </div>
                            <div className='col'>
                                <InputComponent
                                    title='تاریخ'
                                    placeHolder='تاریخ مراجعه خودرو'
                                    type='text'
                                    icon={PhoneIcon}
                                    detail={{
                                        ...register('name', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.name}
                                />
                                <InputComponent
                                    title='زمان تقریبی شروع'
                                    placeHolder='زمان تقریبی شروع تعمیر خودرو'
                                    type='text'
                                    icon={PhoneIcon}
                                    detail={{
                                        ...register('name', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.name}
                                />
                                <InputComponent
                                    title='زمان تقریبی پایان'
                                    placeHolder='زمان تقریبی پایان تعمیر خودرو'
                                    type='text'
                                    icon={PhoneIcon}
                                    detail={{
                                        ...register('name', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.name}
                                />
                                <InputComponent
                                    title='قطعات مورد نیاز تعمیرات'
                                    placeHolder=''
                                    type='text'
                                    icon={PhoneIcon}
                                    detail={{
                                        ...register('name', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.name}
                                />
                            </div>
                            <FormButton
                                text='بعدی'
                                icon={Arrow}
                                loading={false}
                                width='fit-content'
                                className='submit'
                                backgroundColor={'#174787'}
                                onClick={() => {}}
                                height='48px'
                                type='submit'
                            />
                        </form>
                    )}

                    {step === 3 && (
                        <>
                            <form className='form_double_col'>
                                <div className='col'>
                                    <InputComponent
                                        title='زمان تقریبی شروع'
                                        placeHolder='1402/04/08 - 20:20'
                                        type='text'
                                        icon={PhoneIcon}
                                        detail={{
                                            ...register('name', {
                                                required: {
                                                    value: true,
                                                    message: 'این فیلد اجباری است'
                                                }
                                            })
                                        }}
                                        error={errors?.name}
                                    />
                                    <InputComponent
                                        title='زمان واقعی شروع'
                                        placeHolder='1402/04/08 - 19:20'
                                        type='text'
                                        icon={PhoneIcon}
                                        detail={{
                                            ...register('name', {
                                                required: {
                                                    value: true,
                                                    message: 'این فیلد اجباری است'
                                                }
                                            })
                                        }}
                                        error={errors?.name}
                                    />
                                </div>
                                <div className='col'>
                                    <InputComponent
                                        title='زمان تقریبی پایان'
                                        placeHolder='1402/04/08 - 20:20'
                                        type='text'
                                        icon={PhoneIcon}
                                        detail={{
                                            ...register('name', {
                                                required: {
                                                    value: true,
                                                    message: 'این فیلد اجباری است'
                                                }
                                            })
                                        }}
                                        error={errors?.name}
                                    />
                                    <InputComponent
                                        title='زمان واقعی پایان'
                                        placeHolder='1402/04/08 - 19:20'
                                        type='text'
                                        icon={PhoneIcon}
                                        detail={{
                                            ...register('name', {
                                                required: {
                                                    value: true,
                                                    message: 'این فیلد اجباری است'
                                                }
                                            })
                                        }}
                                        error={errors?.name}
                                    />
                                </div>
                            </form>
                            <div className='summary'>
                                <div className='right_field'>
                                    <div className='pill'>
                                        <p>تاخیر در شروع</p>
                                        <div>
                                            <img src={PhoneIcon} alt='' />
                                            یک ساعت تاخیر در شروع
                                        </div>
                                    </div>
                                    <div className='pill'>
                                        <p>تاخیر در شروع</p>
                                        <div>
                                            <img src={PhoneIcon} alt='' />
                                            یک ساعت تاخیر در شروع
                                        </div>
                                    </div>
                                    <div className='pill'>
                                        <p>تاخیر در شروع</p>
                                        <div>
                                            <img src={PhoneIcon} alt='' />
                                            یک ساعت تاخیر در شروع
                                        </div>
                                    </div>
                                    <div className='pill'>
                                        <p>تاخیر در شروع</p>
                                        <div>
                                            <img src={PhoneIcon} alt='' />
                                            یک ساعت تاخیر در شروع
                                        </div>
                                    </div>
                                </div>
                                <div className='left_field'>
                                    <InputComponent
                                        title='زمان تقریبی شروع'
                                        placeHolder='1402/04/08 - 20:20'
                                        type='text'
                                        icon={PhoneIcon}
                                        detail={{
                                            ...register('name', {
                                                required: {
                                                    value: true,
                                                    message: 'این فیلد اجباری است'
                                                }
                                            })
                                        }}
                                        error={errors?.name}
                                    />
                                </div>
                            </div>
                            <FormButton
                                text='بعدی'
                                icon={Arrow}
                                loading={false}
                                width='fit-content'
                                className='submit'
                                backgroundColor={'#174787'}
                                onClick={() => {}}
                                height='48px'
                                type='submit'
                            />
                        </>
                    )}
                </div>
            </Modal>
        </PlanningField>
    );
};

export default Planning;

const columns = [
    { id: 1, title: 'ردیف', key: 'index' },
    { id: 2, title: 'نوع تعمیر', key: 'repairType' },
    { id: 3, title: 'خودرو', key: 'car' },
    { id: 4, title: 'مدل', key: 'model' },
    { id: 5, title: 'پلاک خودرو', key: 'license' },
    { id: 6, title: 'کد تعمیرکار', key: 'mechanicCode' },
    { id: 7, title: 'جایگاه', key: 'position' },
    { id: 8, title: 'موبایل', key: 'mobileNumber' },
    { id: 9, title: 'هرم', key: 'pyramid' }
];

const rows = [
    {
        id: 1,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 2,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 3,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 4,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 5,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 6,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    },
    {
        id: 7,
        repairType: 'برق',
        car: 'پژو',
        model: 1350,
        license: '66 985 ص 42',
        mechanicCode: 23,
        position: 23,
        mobileNumber: '093851813529',
        pyramid: 23
    }
];
