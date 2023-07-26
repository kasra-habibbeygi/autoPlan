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

const Planning = () => {
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);
    const [Step1Id, setStep1Id] = useState();
    const [Step2Id, setStep2Id] = useState();
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [step, setStep] = useState(1);
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
        Axios.get('/worker/admin/vehicle-specifications/list_create/')
            .then(res => {
                PlanningList(res.data.results);

                setPageStatus({
                    ...pageStatus,
                    total: res.data.total
                });
            })
            .catch(() => {})
            .finally(() => setTableLoading(false));
    }, [reload, pageStatus.current]);

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'برند خودرو', key: 'car_brand' },
        { id: 3, title: 'مدل خودرو', key: 'car_model' },
        { id: 4, title: 'نام آورنده', key: 'customer_name' },
        { id: 5, title: 'موبایل', key: 'customer_mobile_number' },
        {
            id: 6,
            title: 'پلاک خودرو',
            key: 'plate_number',
            renderCell: data => (
                <div className='plaque'>
                    <span>{data.plaque_1}</span>
                    <span>{data.plaque_2}</span>
                    <span>{data.plaque_3}</span>
                    <span>-</span>
                    <span>{data.plaque_4}</span>
                </div>
            )
        },
        {
            id: 7,
            title: 'نام تعمیرکار',
            key: 'repairman',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.repairman === null || data?.diagnosis_info?.repairman === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.repairman}
                </div>
            )
        },
        {
            id: 8,
            title: 'جایگاه',
            key: 'station',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.repairman === null || data?.diagnosis_info?.repairman === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.repairman}
                </div>
            )
        },
        {
            id: 9,
            title: 'نوع تعمیر',
            key: 'type_of_repair',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.type_of_repair === null || data?.diagnosis_info?.type_of_repair === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.type_of_repair}
                </div>
            )
        },
        {
            id: 12,
            title: 'زمان شروع تقریبی',
            key: 'estimated_start_repair_time',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.approximate_start_time === null || data?.diagnosis_info?.approximate_start_time === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.approximate_start_time}
                </div>
            )
        },
        {
            id: 13,
            title: 'زمان پایان تقریبی',
            key: 'estimated_end_repair_time',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.exact_start_time === null || data?.diagnosis_info?.approximate_end_time === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.approximate_end_time}
                </div>
            )
        },
        {
            id: 10,
            title: 'زمان شروع واقعی',
            key: 'exact_start_time',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.exact_start_time === null || data?.diagnosis_info?.exact_start_time === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.exact_start_time}
                </div>
            )
        },
        {
            id: 11,
            title: 'زمان پایان واقعی',
            key: 'exact_end_time',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.exact_end_time === null || data?.diagnosis_info?.exact_end_time === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.exact_end_time}
                </div>
            )
        },

        {
            id: 14,
            title: 'عملیات',
            key: 'actions',
            renderCell: () => (
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
            <Table columns={columns} rows={planningList} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={tableLoading} />
            <Modal state={showFilterModal} setState={setShowFilterModal} maxWidth='sm'>
                <FilterModal />
            </Modal>
            <Modal state={modalIsOpen} setState={setIsModalOpen} bgStatus={true}>
                <div className='formControl'>
                    <h2>برنامه ریزی تعمیرات</h2>
                    <ProgressBar step={step} />
                    {step === 1 && <CarDetail setStep={setStep} setStep1Id={setStep1Id} />}

                    {step === 2 && <Diagnosis setStep={setStep} Step1Id={Step1Id} setStep2Id={setStep2Id} />}

                    {step === 3 && <Time setStep={setStep} Step2Id={Step2Id} />}
                </div>
            </Modal>
        </PlanningField>
    );
};

export default Planning;
