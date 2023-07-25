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

    console.log(Step1Id);

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
            .catch(() => {});
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
        { id: 7, title: 'کد تعمیرکار', key: 'mechanic_code' },
        { id: 8, title: 'جایگاه', key: 'station' },
        { id: 9, title: 'نوع تعمیر', key: 'repair_type' },

        {
            id: 10,
            title: 'زمان شروع واقعی',
            key: 'actual_start_repair_time',
            renderCell: data => Tools.changeDateToJalali(data.actual_start_repair_time)
        },
        {
            id: 11,
            title: 'زمان پایان واقعی',
            key: 'actual_end_repair_time',
            renderCell: data => Tools.changeDateToJalali(data.actual_end_repair_time)
        },
        {
            id: 12,
            title: 'زمان شروع تقریبی',
            key: 'estimated_start_repair_time',
            renderCell: data => Tools.changeDateToJalali(data.estimated_start_repair_time)
        },
        {
            id: 13,
            title: 'زمان پایان تقریبی',
            key: 'estimated_end_repair_time',
            renderCell: data => Tools.changeDateToJalali(data.estimated_end_repair_time)
        },
        {
            id: 14,
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
                    {step === 1 && <CarDetail setStep={setStep} setStep1Id={setStep1Id} />}

                    {step === 2 && <Diagnosis setStep={setStep} Step1Id={Step1Id} setStep2Id={setStep2Id} />}

                    {step === 3 && <Time setStep={setStep} Step2Id={Step2Id} />}
                </div>
            </Modal>
        </PlanningField>
    );
};

export default Planning;
