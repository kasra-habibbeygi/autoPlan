/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from '../../configs/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

//Assets
import blocking from '../../assets/images/icons/blocking.svg';
import { QualificationWrapper } from './qualification.style';
import { ActionCell } from '../deviation/deviation.style';
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import SelectInput from '../../components/form-groups/select-input';
import AddDetailModal from '../../components/pages/qualification/add-detail-modal';
import FormButton from '../../components/form-groups/form-button';
import ConfirmModal from '../../components/template/confirm-modal';

// Tools
import Tools from '../../utils/tools';
import PERMISSION from '../../utils/permission.ts';

const Qualification = () => {
    const userPermissions = useSelector(state => state.User.info.permission);
    const [details, setDetails] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [subModalStatus, setSubModalStatus] = useState();
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [specificQualificationId, setSpecificQualificationId] = useState();
    const [loader, setLoader] = useState(true);
    const [reload, setReload] = useState(false);
    const [qualificationList, setQualificationList] = useState();
    const [typesList, setTypesList] = useState([]);
    const [seatList, setSeatList] = useState([]);
    const [personnelList, setPersonnelList] = useState([]);
    const [buttonLoader, setButtonLoader] = useState({
        modalButton: false,
        delete: false
    });

    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const { handleSubmit, formState, reset } = useForm({
        mode: 'onTouched'
    });
    const { submitCount } = formState;

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'تاریخ', key: 'date', renderCell: data => Tools.changeDateToJalali(data.date_created) },
        { id: 3, title: 'جلوبندی', key: 'blocking_number' },
        { id: 4, title: 'مکانیک', key: 'mechanic_number' },
        { id: 5, title: 'گاز', key: 'gas_number' },
        { id: 6, title: 'برق', key: 'elec_number' },
        { id: 7, title: 'هیبرید', key: 'hybrid_number' },
        {
            id: 8,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => (
                <ActionCell>
                    <FormButton
                        icon={pen}
                        onClick={() => setShowAddModal(true)}
                        disabled={!userPermissions.includes(PERMISSION.CAPACITY_MEASUREMENT.EDIT)}
                    />
                    <FormButton
                        icon={trashBin}
                        onClick={() => deleteModalHandler(data.id)}
                        disabled={!userPermissions.includes(PERMISSION.CAPACITY_MEASUREMENT.DELETE)}
                    />
                </ActionCell>
            )
        }
    ];

    useEffect(() => {
        setLoader(true);
        Axios.get(`/worker/admin/capacity-measurement/list_create/?page=${pageStatus.current}`)
            .then(res => {
                setQualificationList(res.data.results);
                setPageStatus({
                    ...pageStatus,
                    total: res.data.total
                });
            })
            .finally(() => setLoader(false))
            .catch(() => {});

        Axios.get('worker/admin/organizational-position/list_create/?page_size=500').then(res => {
            let temp = [];

            res.data.results.map(item => {
                if (item.technical_force) {
                    temp.push({
                        label: item.title,
                        value: item.id
                    });
                }

                return;
            });

            setTypesList(temp);
        });

        Axios.get('worker/admin/personnel/list_create/?page_size=500').then(res => {
            setPersonnelList(res.data.results);
        });

        Axios.get('worker/admin/seat-capacity/list_create/?page_size=500').then(res => {
            setSeatList(res.data.results);
        });
    }, [pageStatus.current, reload]);

    const formSubmit = () => {
        var formData = new FormData();
        formData.append('data', JSON.stringify(details));

        Axios.post('worker/admin/capacity-measurement/list_create/', formData);
    };

    const closeModalHandler = () => {
        reset();
        setDetails({});
    };

    const closeSubModalHandler = () => {
        setSubModalStatus();
        setShowSubModal(false);
    };

    const deleteModalHandler = id => {
        setConfirmModalStatus(true);
        setSpecificQualificationId(id);
    };

    const deleteHandler = () => {
        setButtonLoader({ ...buttonLoader, delete: true });
        Axios.delete(`worker/admin/capacity-measurement/retrieve_update_destroy/?pk=${specificQualificationId}`)
            .then(() => {
                setReload(!reload);
                toast.success('ظرفیت  با موفقیت حذف شد');
                setConfirmModalStatus(false);
            })
            .catch(() => {})
            .finally(() => {
                setButtonLoader({ ...buttonLoader, delete: false });
            });
    };

    return (
        <QualificationWrapper>
            <PagesHeader
                buttonTitle='ثبت ظرفیت سنجی جدید'
                secondFiled='ساعت کاری مجموعه : ۸ ساعت'
                onButtonClick={() => setShowAddModal(true)}
                disabled={!userPermissions.includes(PERMISSION.CAPACITY_MEASUREMENT.ADD)}
            />
            <Table columns={columns} rows={qualificationList} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={loader} />
            <Modal state={showAddModal} setState={setShowAddModal} bgStatus={true} handleClose={closeModalHandler}>
                <div className='formControl'>
                    <h2>فرم ظرفیت سنجی</h2>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        {typesList.map(item => (
                            <SelectInput
                                key={item?.value}
                                title={item?.label}
                                icon={blocking}
                                onClick={() => {
                                    setShowSubModal(true);
                                    setSubModalStatus(item?.label);
                                }}
                                items={details[item?.label]}
                                submitCount={submitCount}
                                setDetails={setDetails}
                                placeHolder={`ظرفیت سنجی ${item?.label}`}
                            />
                        ))}
                        <FormButton text='ثبت' type='submit' backgroundColor='#174787' color='white' height={48} />
                    </form>
                </div>
            </Modal>
            <Modal state={showSubModal} setState={setShowSubModal} maxWidth='sm' handleClose={closeSubModalHandler}>
                <AddDetailModal
                    subModalStatus={subModalStatus}
                    setDetails={setDetails}
                    closeSubModalHandler={closeSubModalHandler}
                    personnelList={personnelList}
                    seatList={seatList}
                />
            </Modal>
            <ConfirmModal
                status={confirmModalStatus}
                setStatus={setConfirmModalStatus}
                title='آیا از حذف این ردیف مطمئن هستید ؟'
                deleteHandler={deleteHandler}
                loading={buttonLoader.delete}
            />
        </QualificationWrapper>
    );
};

export default Qualification;
