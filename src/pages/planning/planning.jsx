/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Axios from '../../configs/axios';
import { useSelector } from 'react-redux';
import PERMISSION from '../../utils/permission.ts';
import { useSearchParams } from 'react-router-dom';

//Assets
import { PlanningField } from './planning.style';
import pen from './../../assets/images/global/pen.svg';
import { ActionCell } from '../deviation/deviation.style';

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
import ConfirmModal from '../../components/template/confirm-modal';

// Tools
import tools from '../../utils/tools';

const Planning = () => {
    const userPermissions = useSelector(state => state.User.info.permission);
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);
    const [Step1Id, setStep1Id] = useState();
    const [Step2Id, setStep2Id] = useState();
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [step, setStep] = useState(1);
    const [planningList, setPlanningList] = useState();
    const [reload, setReload] = useState(false);
    const [modalFormStatus, setModalFormStatus] = useState('add');
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [chosenEditItemDetails, setChosenEditItemDetails] = useState();
    const [deflection, setDeflection] = useState({});
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const [searchParams] = useSearchParams();

    const openModal = () => {
        setIsModalOpen(true);
        setModalFormStatus('add');
    };

    useEffect(() => {
        setTableLoading(true);
        setPlanningList();

        const dateQuery = searchParams.get('date');
        const typeIdQuery = searchParams.get('type_id');
        const personnelIdQuery = searchParams.get('personnel_id');

        setPageStatus(prev => ({
            ...prev,
            current: 1
        }));

        Axios.get(`worker/admin/vehicle-specifications/list_create/?pageSize=10&page=${pageStatus.current}`, {
            params: {
                ...(dateQuery && {
                    date: dateQuery
                }),
                ...(typeIdQuery && {
                    type_id: typeIdQuery
                }),
                ...(personnelIdQuery && {
                    personnel_id: personnelIdQuery
                })
            }
        })
            .then(res => {
                setPlanningList(res.data.results);

                setPageStatus({
                    ...pageStatus,
                    total: res.data.total
                });
            })
            .catch(() => {})
            .finally(() => setTableLoading(false));
    }, [reload, pageStatus.current, searchParams]);

    const date = new Date();
    const today = tools.changeDateToJalali(date, false).replaceAll('/', '-');

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 1, title: 'تاریخ برنامه', key: 'date' },
        {
            id: 2,
            title: 'برند خودرو',
            key: 'car_brand',
            renderCell: data => <div>{!data?.car_brand || data?.car_brand === '' ? 'تعریف نشده' : data?.car_brand}</div>
        },
        {
            id: 3,
            title: 'مدل خودرو',
            key: 'car_model',
            renderCell: data => <div>{!data?.car_model || data?.car_model === '' ? 'تعریف نشده' : data?.car_model}</div>
        },
        {
            id: 4,
            title: 'نام آورنده',
            key: 'customer_name',
            renderCell: data => <div>{!data?.customer_name || data?.customer_name === '' ? 'تعریف نشده' : data?.customer_name}</div>
        },
        {
            id: 5,
            title: 'موبایل',
            key: 'customer_mobile_number',
            renderCell: data => (
                <div>
                    {!data?.customer_mobile_number || data?.customer_mobile_number === '' ? 'تعریف نشده' : data?.customer_mobile_number}
                </div>
            )
        },
        {
            id: 6,
            title: 'پلاک خودرو',
            key: 'plate_number',
            renderCell: data => (
                <div className='plaque'>
                    <span>{data?.plaque_1}</span>
                    <span>{data?.plaque_2}</span>
                    <span>{data?.plaque_3}</span>
                    <span>-</span>
                    <span>{data?.plaque_4}</span>
                </div>
            )
        },
        {
            id: 7,
            title: 'نام تعمیرکار',
            key: 'repairman',
            renderCell: data => (
                <div>
                    {!data?.diagnosis_info?.repairman_info?.user_info?.personnel?.fullname ||
                    data?.diagnosis_info?.repairman_info?.user_info?.personnel?.fullname === ''
                        ? 'تعریف نشده'
                        : data?.diagnosis_info?.repairman_info?.user_info?.personnel?.fullname}
                </div>
            )
        },
        {
            id: 8,
            title: 'جایگاه',
            key: 'station',
            renderCell: data => (
                <div>
                    {!data?.diagnosis_info?.repairman || data?.diagnosis_info?.repairman === ''
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
                    {!data?.diagnosis_info?.type_of_repair || data?.diagnosis_info?.type_of_repair === ''
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
                    {!data?.diagnosis_info?.approximate_start_time || data?.diagnosis_info?.approximate_start_time === ''
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
                    {!data?.diagnosis_info?.approximate_end_time || data?.diagnosis_info?.approximate_end_time === ''
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
                    {!data?.time_to_troubleshoot_info?.exact_start_time || data?.time_to_troubleshoot_info?.exact_start_time === ''
                        ? 'تعریف نشده'
                        : data?.time_to_troubleshoot_info?.exact_start_time}
                </div>
            )
        },
        {
            id: 13,
            title: 'زمان پایان واقعی',
            key: 'exact_end_time',
            renderCell: data => (
                <div>
                    {!data?.time_to_troubleshoot_info?.exact_end_time || data?.time_to_troubleshoot_info?.exact_end_time === ''
                        ? 'تعریف نشده'
                        : data?.time_to_troubleshoot_info?.exact_end_time}
                </div>
            )
        },
        {
            id: 14,
            title: 'تعجیل در شروع',
            key: 'start_with_haste',
            renderCell: data => (
                <div>
                    {!data?.time_to_troubleshoot_info?.start_with_haste || data?.time_to_troubleshoot_info?.start_with_haste === ''
                        ? 'تعریف نشده'
                        : data?.time_to_troubleshoot_info?.start_with_haste}
                </div>
            )
        },
        {
            id: 15,
            title: 'تعجیل در پایان',
            key: 'end_with_haste',
            renderCell: data => (
                <div>
                    {!data?.time_to_troubleshoot_info?.end_with_haste || data?.time_to_troubleshoot_info?.end_with_haste === ''
                        ? 'تعریف نشده'
                        : data?.time_to_troubleshoot_info?.end_with_haste}
                </div>
            )
        },
        {
            id: 16,
            title: 'تاخیر در شروع',
            key: 'delayed_start',
            renderCell: data => (
                <div>
                    {!data?.time_to_troubleshoot_info?.delayed_start || data?.time_to_troubleshoot_info?.delayed_start === ''
                        ? 'تعریف نشده'
                        : data?.time_to_troubleshoot_info?.delayed_start}
                </div>
            )
        },
        {
            id: 17,
            title: 'تاخیر در پایان',
            key: 'delayed_end',
            renderCell: data => (
                <div>
                    {!data?.time_to_troubleshoot_info?.delayed_end || data?.time_to_troubleshoot_info?.delayed_end === ''
                        ? 'تعریف نشده'
                        : data?.time_to_troubleshoot_info?.delayed_end}
                </div>
            )
        },
        {
            id: 18,
            title: 'علت انحراف',
            key: 'the_reason_for_the_deviation',
            renderCell: data => (
                <div>
                    {!data?.time_to_troubleshoot_info?.the_reason_for_the_deviation_info?.reason ||
                    data?.time_to_troubleshoot_info?.the_reason_for_the_deviation_info?.reason === ''
                        ? 'تعریف نشده'
                        : data?.time_to_troubleshoot_info?.the_reason_for_the_deviation_info?.reason}
                </div>
            )
        },

        {
            id: 19,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => {
                const createdDate = data?.create_at.slice(0, 10);
                const isMatch = createdDate !== today;
                return (
                    <ActionCell>
                        <FormButton
                            icon={pen}
                            onClick={() => {
                                setIsModalOpen(true);
                                setModalFormStatus('edit');
                                setChosenEditItemDetails(data);
                            }}
                            disabled={
                                isMatch ||
                                !userPermissions.includes(PERMISSION.VEHICLE_SPECIFICATIONS.ADD_EDIT_VEHICLE_DETAILS) ||
                                !userPermissions.includes(PERMISSION.VEHICLE_SPECIFICATIONS.ADD_EDIT_DIAGNOSIS) ||
                                !userPermissions.includes(PERMISSION.VEHICLE_SPECIFICATIONS.ADD_EDIT_TIME)
                            }
                        />
                    </ActionCell>
                );
            }
        }
    ];

    const confirmModalHandler = () => {
        Axios.post('worker/admin/time-to-troubleshoot/automatic-alculation/', deflection)
            .then(() => {
                setConfirmModalStatus(false);
            })
            .catch(() => {})
            .finally(() => {
                setReload(!reload);
            });
    };

    return (
        <PlanningField>
            <PagesHeader
                buttonTitle='ثبت برنامه جدید'
                onButtonClick={openModal}
                hasFilter={true}
                onFilterClick={() => setShowFilterModal(true)}
                disabled={!userPermissions.includes(PERMISSION.VEHICLE_SPECIFICATIONS.ADD_EDIT_VEHICLE_DETAILS)}
            />
            <Table columns={columns} rows={planningList} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={tableLoading} />
            <Modal state={showFilterModal} setState={setShowFilterModal} maxWidth='sm'>
                <FilterModal setReload={setReload} setShowFilterModal={setShowFilterModal} />
            </Modal>
            <Modal
                state={modalIsOpen}
                setState={setIsModalOpen}
                bgStatus={true}
                handleClose={() => {
                    setModalFormStatus();
                    setChosenEditItemDetails();
                    setStep(1);
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
                            setReload={setReload}
                            setIsModalOpen={setIsModalOpen}
                        />
                    )}
                    {step === 2 && (
                        <Diagnosis
                            setStep={setStep}
                            Step1Id={Step1Id}
                            setStep2Id={setStep2Id}
                            modalFormStatus={modalFormStatus}
                            chosenEditItemDetails={chosenEditItemDetails}
                            setReload={setReload}
                            setIsModalOpen={setIsModalOpen}
                        />
                    )}
                    {step === 3 && (
                        <Time
                            setStep={setStep}
                            Step2Id={Step2Id}
                            modalFormStatus={modalFormStatus}
                            chosenEditItemDetails={chosenEditItemDetails}
                            setReload={setReload}
                            setIsModalOpen={setIsModalOpen}
                            setConfirmModalStatus={setConfirmModalStatus}
                            setDeflection={setDeflection}
                        />
                    )}
                </div>
            </Modal>
            <ConfirmModal
                status={confirmModalStatus}
                setStatus={setConfirmModalStatus}
                title='آیا میخواهید انحراف به صورت اتوماتیک محاسبه شود ؟'
                deleteHandler={confirmModalHandler}
                loading={false}
            />
        </PlanningField>
    );
};

export default Planning;
