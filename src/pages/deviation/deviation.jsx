import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import enheraf from '../../assets/images/global/BlackHole.svg';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import FormButton from '../../components/form-button/form-button';
import Button from '../../components/form-groups/button';
import Modal from '../../components/template/modal';
import InputComponent from './../../components/form-groups/input-component';

const Deviation = () => {
    const [modalOpen, setModalOpen] = useState(false);

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

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'علت انحراف', key: 'deviationReason' },
        {
            id: 3,
            title: 'عملیات',
            key: 'actions',
            renderCell: () => (
                <>
                    <Button>
                        <img src={pen} alt='' />
                    </Button>
                    <Button>
                        <img src={trashBin} alt='' />
                    </Button>
                </>
            )
        }
    ];

    const rows = [
        {
            id: 1,
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
            car: 'پژو',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        }
    ];

    const openModal = () => {
        setModalOpen(true);
    };
    const formSubmit = () => {};

    return (
        <>
            <PagesHeader buttonTitle='ثبت انحراف جدید' onButtonClick={openModal} />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
            <Modal state={modalOpen} setState={setModalOpen} maxWidth='sm'>
                <h2>ثبت انحراف جدید</h2>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <InputComponent
                        title='علت انحراف'
                        type='text'
                        icon={enheraf}
                        detail={{
                            ...register('text', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.text}
                    />
                    <FormButton text='ثبت' loading={false} type='submit' />
                </form>
            </Modal>
        </>
    );
};

export default Deviation;
