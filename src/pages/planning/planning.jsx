/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Axios from '../../configs/axios';

//Assets
import { PlanningField } from './planning.style';
import pen from './../../assets/images/global/pen.svg';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import ProgressBar from '../../components/pages/planning/progress-bar';
import FilterModal from '../../components/pages/planning/filter-modal';
import CarDetail from '../../components/pages/planning/car-detail';
import Diagnosis from '../../components/pages/planning/diagnosis';
import Time from '../../components/pages/planning/time';
import FormButton from '../../components/form-groups/form-button';
import { ActionCell } from '../deviation/deviation.style';

// Tools
import Tools from '../../utils/tools';

const Planning = () => {
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [step, setStep] = useState(2);
    const [planningList, PlanningList] = useState();
    const [reload, setReload] = useState(false);

    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        Axios.get('admission/')
            .then(res => {
                PlanningList(res.data.data);

                setPageStatus({
                    ...pageStatus,
                    total: res.data.total
                });
            })
            .catch(() => {});
    }, [reload, pageStatus.current]);

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'نوع تعمیر', key: 'repair_type' },
        { id: 3, title: 'خودرو', key: 'car_title' },
        { id: 4, title: 'مدل', key: 'car_model' },
        { id: 5, title: 'پلاک خودرو', key: 'plate_number' },
        { id: 6, title: 'کد تعمیرکار', key: 'mechanic_code' },
        { id: 7, title: 'جایگاه', key: 'station' },
        { id: 8, title: 'موبایل', key: 'mobile_number' },
        {
            id: 8,
            title: 'زمان شروع واقعی',
            key: 'actual_start_repair_time',
            renderCell: data => Tools.changeDateToJalali(data.actual_start_repair_time)
        },
        {
            id: 8,
            title: 'زمان پایان واقعی',
            key: 'actual_end_repair_time',
            renderCell: data => Tools.changeDateToJalali(data.actual_end_repair_time)
        },
        {
            id: 8,
            title: 'زمان شروع تقریبی',
            key: 'estimated_start_repair_time',
            renderCell: data => Tools.changeDateToJalali(data.estimated_start_repair_time)
        },
        {
            id: 8,
            title: 'زمان پایان تقریبی',
            key: 'estimated_end_repair_time',
            renderCell: data => Tools.changeDateToJalali(data.estimated_end_repair_time)
        },
        {
            id: 7,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => (
                <ActionCell>
                    <FormButton icon={pen} />
                </ActionCell>
            )
        }
    ];

    return (
        <PlanningField>
            <PagesHeader
                buttonTitle='ثبت برنامه جدید'
                onButtonClick={openModal}
                hasFilter={true}
                onFilterClick={() => setShowFilterModal(true)}
            />
            <Table columns={columns} rows={planningList} pageStatus={pageStatus} setPageStatus={setPageStatus} />
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
