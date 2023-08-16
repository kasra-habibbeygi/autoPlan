/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable vars-on-top */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../configs/axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

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
import PERMISSION from '../../utils/permission.ts';
import { Checkbox, FormControlLabel } from '@mui/material';
import DatePickerComponent from '../../components/form-groups/date-picker';
import tools from '../../utils/tools';

const Qualification = () => {
    const userPermissions = useSelector(state => state.User.info.permission);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [reload, setReload] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [dateFilterCheckboxValue, setDateFilterCheckboxValue] = useState(false);
    const [subModalStatus, setSubModalStatus] = useState();
    const [specificQualificationId, setSpecificQualificationId] = useState();
    const [specificData, setSpecificData] = useState();
    const [qualificationList, setQualificationList] = useState();
    const [modalActionType, setModalActionType] = useState('add');
    const [details, setDetails] = useState({});
    const [typesList, setTypesList] = useState([]);
    const [seatList, setSeatList] = useState([]);
    const [personnelList, setPersonnelList] = useState([]);
    const [reportList, setReportList] = useState([]);
    const [dateSearch, setDateSearch] = useState('');
    const [valueDate, setValueDate] = useState({
        timeStamp: '',
        date: ''
    });

    const [loader, setLoader] = useState({
        table: false,
        add: false
    });
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

    const {
        handleSubmit: handleSubmit1,
        formState: formState1,
        control
    } = useForm({
        mode: 'onTouched'
    });
    const { errors } = formState1;

    const date = new Date();
    const today = tools.changeDateToJalali(date, false).replaceAll('/', '-');

    var columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'تاریخ', key: 'date' },
        { id: 3, title: 'نام', key: 'name', renderCell: data => data.user_info.personnel.fullname },
        {
            id: 4,
            title: 'زمان کاری',
            key: 'time',
            renderCell: data => `${data.time.split(':')[0]} ساعت و ${data.time.split(':')[1]} دقیقه`
        },
        { id: 5, title: 'کد جایگاه', key: 'code', renderCell: data => data.type.code },
        { id: 6, title: 'اسم جایگاه', key: 'code', renderCell: data => data.type.type_info.title },
        {
            id: 7,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => {
                const createdDate = data?.create_at.slice(0, 10);
                const isMatch = createdDate !== today;
                return (
                    <ActionCell>
                        <FormButton
                            icon={pen}
                            onClick={() => editModalHandler(data)}
                            disabled={!userPermissions.includes(PERMISSION.CAPACITY_MEASUREMENT.EDIT) || isMatch}
                        />
                        <FormButton
                            icon={trashBin}
                            onClick={() => deleteModalHandler(data.id)}
                            disabled={!userPermissions.includes(PERMISSION.CAPACITY_MEASUREMENT.DELETE) || isMatch}
                        />
                    </ActionCell>
                );
            }
        }
    ];

    const onChangeDate = data => {
        let dateFormat = tools.changeTimeStampToDate(data);
        setValueDate({ ...valueDate, timeStamp: data });
        setValueDate({ ...valueDate, date: dateFormat });
    };

    const formSubmit = () => {
        var formData = new FormData();
        console.log(formData);
        const newData = { ...details, date: valueDate.date };
        formData.append('data', JSON.stringify(newData));
        // formData.append('date', valueDate.date);
        setLoader({
            ...loader,
            add: true
        });

        if (modalActionType === 'add') {
            Axios.post('worker/admin/capacity-measurement/list_create/', formData)
                .then(() => {
                    setReload(!reload);
                    setShowAddModal(false);
                    toast.success('ظرفیت جدید با موفقیت اضافه شد');
                })
                .catch(() => {})
                .finally(() => {
                    setLoader({
                        ...loader,
                        add: false
                    });
                });
        }
    };

    const closeModalHandler = () => {
        reset();
        setDetails({});
    };

    const closeSubModalHandler = () => {
        setSubModalStatus();
        setShowSubModal(false);
        setSpecificData();
        setModalActionType('add');
    };

    const deleteModalHandler = id => {
        setConfirmModalStatus(true);
        setSpecificQualificationId(id);
    };

    const deleteHandler = () => {
        setButtonLoader({ ...buttonLoader, delete: true });
        Axios.delete(`worker/admin/capacity-measurement/retrieve_update_destroy/?pk=${specificQualificationId}`)
            .then(() => {
                setConfirmModalStatus(false);
                setReload(!reload);
                setPageStatus({
                    ...pageStatus,
                    current: 1
                });
            })
            .catch(() => {})
            .finally(() => {
                setButtonLoader({ ...buttonLoader, delete: false });
            });
    };

    const searchSubmit = data => {
        setDateSearch(tools.changeTimeStampToDate(data.effective_date));
        setReload(!reload);
    };

    useEffect(() => {
        let query = '';
        let search_date = '';
        setLoader({
            ...loader,
            table: true
        });

        if (dateFilterCheckboxValue) {
            query += '&date_now=true';
        }
        if (dateSearch) {
            query += `&date=${dateSearch}`;
            search_date += `&date=${dateSearch}`;
        }

        Axios.get(`worker/admin/capacity-measurement/list_create/?page=${pageStatus.current}${query}`)
            .then(res => {
                setPageStatus({
                    ...pageStatus,
                    total: res.data.total
                });

                setQualificationList(res.data.results);
            })
            .finally(() =>
                setLoader({
                    ...loader,
                    table: false
                })
            )
            .catch(() => {});

        Axios.get(`worker/admin/capacity-measurement/report/?${search_date}`)
            .then(res => {
                setReportList(res.data.result);
            })
            .catch(() => {});
    }, [pageStatus.current, reload, dateFilterCheckboxValue]);

    const editModalHandler = data => {
        setModalActionType('edit');
        setShowSubModal(true);
        setSubModalStatus(data.type.type_info.title);
        setSpecificData({
            name: {
                label: data?.user_info?.personnel?.fullname,
                value: data?.user_info?.personnel?.id
            },
            station: {
                label: data?.type?.code,
                value: data?.type?.id
            },
            hour: data?.time?.split(':')[0],
            min: data?.time?.split(':')[1],
            editId: data?.id
        });
    };

    useEffect(() => {
        Axios.get('worker/admin/organizational-position/list_create/?page_size=15')
            .then(res => {
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
            })
            .catch(() => {});
        Axios.get('worker/admin/personnel/list_create/?page_size=500')
            .then(res => {
                setPersonnelList(res.data.results);
            })
            .catch(() => {});

        Axios.get('worker/admin/seat-capacity/list_create/?page_size=500')
            .then(res => {
                const newArray = res?.data?.results?.filter(item => item.station_status);
                setSeatList(newArray);
            })
            .catch(() => {});
    }, []);

    return (
        <QualificationWrapper>
            <PagesHeader
                buttonTitle='ثبت ظرفیت سنجی جدید'
                onButtonClick={() => setShowAddModal(true)}
                disabled={!userPermissions.includes(PERMISSION.CAPACITY_MEASUREMENT.ADD)}
            />
            <div className='filter_field'>
                <FormControlLabel
                    control={<Checkbox value={dateFilterCheckboxValue} onChange={e => setDateFilterCheckboxValue(e.target.checked)} />}
                    label='فیلتر بر اساس تاریخ امروز'
                />
                <form onSubmit={handleSubmit1(searchSubmit)} className='search_style'>
                    <Controller
                        control={control}
                        name='effective_date'
                        rules={{ required: 'این فیلد اجباری است' }}
                        render={({ field: { onChange, value } }) => {
                            return <DatePickerComponent value={value} onChange={onChange} error={errors?.effective_date} />;
                        }}
                    />
                    <FormButton text='جستجو' type='submite' backgroundColor='#174787' color='white' />
                </form>

                <FormButton text='نمایش گزارش مجموع ظرفیت های امروز' onClick={() => setDetailModal(true)} />
            </div>
            <Table
                columns={columns}
                rows={qualificationList}
                pageStatus={pageStatus}
                setPageStatus={setPageStatus}
                loading={loader.table}
            />
            <Modal state={showAddModal} setState={setShowAddModal} bgStatus={true} handleClose={closeModalHandler}>
                <div className='formControl'>
                    <h2>فرم ظرفیت سنجی</h2>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <DatePickerComponent
                            value={valueDate.timeStamp}
                            onChange={onChangeDate}
                            title='انتخاب تاریخ'
                            error={errors?.date}
                        />
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
                        <FormButton text='ثبت' type='submit' backgroundColor='#174787' color='white' height={48} loading={loader.add} />
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
                    details={details}
                    specificData={specificData}
                    showSubModal={showSubModal}
                    modalActionType={modalActionType}
                    setReload={setReload}
                    setShowSubModal={setShowSubModal}
                />
            </Modal>
            <Modal state={detailModal} setState={setDetailModal} maxWidth='sm' handleClose={() => setDetailModal(false)}>
                <div className='details_main_field'>
                    {reportList?.map(item => (
                        <div key={`details_modal_item${item.id}`} className='item_field'>
                            <h4>{item.type}</h4>
                            <p>تعداد نفرات : {item.number_of_staff}</p>
                            <p>
                                مجموع ساعت کاری : {item.total_hours.hours}:{item.total_hours.minutes}
                            </p>
                        </div>
                    ))}
                </div>
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
