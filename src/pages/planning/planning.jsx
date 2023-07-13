import React, { useState } from 'react';

//Assets
import { PlanningField } from './planning.style';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import ProgressBar from '../../components/pages/planning/progress-bar';
import FilterModal from '../../components/pages/planning/filter-modal';
import CarDetail from '../../components/pages/planning/car-detail';
import Diagnosis from '../../components/pages/planning/diagnosis';
import Time from '../../components/pages/planning/time';

const Planning = () => {
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [step, setStep] = useState(1);
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });
    const openModal = () => {
        setIsModalOpen(true);
    };

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
                    {step === 1 && <CarDetail setStep={setStep} />}

                    {step === 2 && <Diagnosis setStep={setStep} />}

                    {step === 3 && <Time setStep={setStep} />}
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
