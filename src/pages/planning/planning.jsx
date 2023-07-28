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

const Planning = () => {
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);
    const [Step1Id, setStep1Id] = useState();
    const [Step2Id, setStep2Id] = useState();
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [step, setStep] = useState(1);
    const [planningList, PlanningList] = useState();
    const [reload, setReload] = useState(false);
    const [modalFormStatus, setModalFormStatus] = useState('add');
    const [chosenEditItemDetails, setChosenEditItemDetails] = useState();
    const [filtersDetail, setFiltersDetail] = useState({
        timeFilter: '',
        sectionFilter: '',
        personFilter: ''
    });

    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const openModal = () => {
        setIsModalOpen(true);
        setModalFormStatus('add');
    };

    useEffect(() => {
        setTableLoading(true);

        Axios.get(`/worker/admin/time-to-troubleshoot/list_create/?pageSize=10&page=${pageStatus.current}`, {
            params: {
                ...(filtersDetail.timeFilter && {
                    some: 'gdaslksgh'
                }),
                ...(filtersDetail.sectionFilter && {
                    some: 'gdaslksgh'
                }),
                ...(filtersDetail.personFilter && {
                    some: 'gdaslksgh'
                })
            }
        })
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
        {
            id: 2,
            title: 'برند خودرو',
            key: 'car_brand',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.vehicle_specifications_info?.car_brand === null ||
                    data?.diagnosis_info?.vehicle_specifications_info?.car_brand === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.vehicle_specifications_info?.car_brand}
                </div>
            )
        },
        {
            id: 3,
            title: 'مدل خودرو',
            key: 'car_model',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.vehicle_specifications_info?.car_model === null ||
                    data?.diagnosis_info?.vehicle_specifications_info?.car_model === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.vehicle_specifications_info?.car_model}
                </div>
            )
        },
        {
            id: 4,
            title: 'نام آورنده',
            key: 'customer_name',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.vehicle_specifications_info?.customer_name === null ||
                    data?.diagnosis_info?.vehicle_specifications_info?.customer_name === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.vehicle_specifications_info?.customer_name}
                </div>
            )
        },
        {
            id: 5,
            title: 'موبایل',
            key: 'customer_mobile_number',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.vehicle_specifications_info?.customer_mobile_number === null ||
                    data?.diagnosis_info?.vehicle_specifications_info?.customer_mobile_number === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.vehicle_specifications_info?.customer_mobile_number}
                </div>
            )
        },
        {
            id: 6,
            title: 'پلاک خودرو',
            key: 'plate_number',
            renderCell: data => (
                <div className='plaque'>
                    <span>{data?.diagnosis_info?.vehicle_specifications_info?.plaque_1}</span>
                    <span>{data?.diagnosis_info?.vehicle_specifications_info?.plaque_2}</span>
                    <span>{data?.diagnosis_info?.vehicle_specifications_info?.plaque_3}</span>
                    <span>-</span>
                    <span>{data?.diagnosis_info?.vehicle_specifications_info?.plaque_4}</span>
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
            id: 10,
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
            id: 11,
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
            id: 12,
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
            id: 13,
            title: 'زمان پایان واقعی',
            key: 'exact_end_time',
            renderCell: data => <div>{data.exact_end_time === null || data.exact_end_time === '' ? 'تعریف نشده' : data.exact_end_time}</div>
        },
        {
            id: 14,
            title: 'تعجیل در شروع',
            key: 'start_with_haste',
            renderCell: data => (
                <div>{data.start_with_haste === null || data.start_with_haste === '' ? 'ندارد' : data.start_with_haste}</div>
            )
        },
        {
            id: 15,
            title: 'تعجیل در پایان',
            key: 'end_with_haste',
            renderCell: data => <div>{data.end_with_haste === null || data.end_with_haste === '' ? 'ندارد' : data.end_with_haste}</div>
        },
        {
            id: 16,
            title: 'تاخیر در شروع',
            key: 'delayed_start',
            renderCell: data => <div>{data.delayed_start === null || data.delayed_start === '' ? 'ندارد' : data.delayed_start}</div>
        },
        {
            id: 17,
            title: 'تاخیر در پایان',
            key: 'delayed_end',
            renderCell: data => <div>{data.delayed_end === null || data.delayed_end === '' ? 'ندارد' : data.delayed_end}</div>
        },
        {
            id: 18,
            title: 'علت انحراف',
            key: 'the_reason_for_the_deviation',
            renderCell: data => (
                <div>
                    {data?.diagnosis_info?.exact_end_time === null || data?.diagnosis_info?.exact_end_time === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.exact_end_time}
                </div>
            )
        },

        {
            id: 19,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => (
                <ActionCell>
                    <FormButton
                        icon={pen}
                        onClick={() => {
                            setIsModalOpen(true);
                            setModalFormStatus('edit');
                            setChosenEditItemDetails(data);
                        }}
                    />
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
                <FilterModal setFiltersDetail={setFiltersDetail} setReload={setReload} setShowFilterModal={setShowFilterModal} />
            </Modal>
            <Modal
                state={modalIsOpen}
                setState={setIsModalOpen}
                bgStatus={true}
                handleClose={() => {
                    setModalFormStatus();
                    setChosenEditItemDetails();
                }}
            >
                <div className='formControl'>
                    <h2>برنامه ریزی تعمیرات</h2>
                    <ProgressBar step={step} />
                    {step === 1 && (
                        <CarDetail
                            setStep={setStep}
                            setStep1Id={setStep1Id}
                            modalFormStatus={modalFormStatus}
                            chosenEditItemDetails={chosenEditItemDetails}
                        />
                    )}

                    {step === 2 && (
                        <Diagnosis
                            setStep={setStep}
                            Step1Id={Step1Id}
                            setStep2Id={setStep2Id}
                            modalFormStatus={modalFormStatus}
                            chosenEditItemDetails={chosenEditItemDetails}
                        />
                    )}

                    {step === 3 && (
                        <Time
                            setStep={setStep}
                            Step2Id={Step2Id}
                            modalFormStatus={modalFormStatus}
                            chosenEditItemDetails={chosenEditItemDetails}
                        />
                    )}
                </div>
            </Modal>
        </PlanningField>
    );
};

export default Planning;
