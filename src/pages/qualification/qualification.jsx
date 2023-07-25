/* eslint-disable consistent-return */
/* eslint-disable vars-on-top */
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

const Qualification = () => {
    const [details, setDetails] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [subModalStatus, setSubModalStatus] = useState();
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [specificQualificationId, setSpecificQualificationId] = useState();
    const [reload, setReload] = useState(false);
    const [qualificationList, setQualificationList] = useState();
    const [typesList, setTypesList] = useState([]);
    const [seatList, setSeatList] = useState([]);
    const [personnelList, setPersonnelList] = useState([]);
    const [tableCol, setTableCol] = useState([]);
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

    const formSubmit = () => {
        var formData = new FormData();
        formData.append('data', JSON.stringify(details));
        setLoader({
            ...loader,
            add: true
        });

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
        specificQualificationId.map(item => {
            Axios.delete(`worker/admin/capacity-measurement/retrieve_update_destroy/?pk=${item}`)
                .then(() => {
                    setConfirmModalStatus(false);
                    setReload(!reload);
                })
                .catch(() => {})
                .finally(() => {
                    setButtonLoader({ ...buttonLoader, delete: false });
                });
        });
    };

    useEffect(() => {
        setLoader({
            ...loader,
            table: true
        });
        Axios.get(`/worker/admin/capacity-measurement/list_create/?page=${pageStatus.current}`)
            .then(res => {
                setPageStatus({
                    ...pageStatus,
                    total: res.data.total
                });

                const groupedData = {};

                res.data.results.forEach(item => {
                    const date = item.create_at.split(' - ')[0];
                    if (groupedData[date]) {
                        groupedData[date].ids.push(item.id);
                        groupedData[date].type.push(item.type);

                        if (!groupedData[date].time[item.type.type_info.title] || !groupedData[date].user[item.type.type_info.title]) {
                            groupedData[date].time[item.type.type_info.title] = [];
                            groupedData[date].user[item.type.type_info.title] = [];
                        }
                        groupedData[date].time[item.type.type_info.title].push(item.time);
                        groupedData[date].user[item.type.type_info.title].push(item.user);
                    } else {
                        groupedData[date] = {
                            ...item,
                            ids: [item.id],
                            type: [item.type],
                            user: [],
                            time: {
                                [item.type.type_info.title]: [item.time]
                            }
                        };
                    }
                });

                console.log(Object.values(groupedData));

                setQualificationList(Object.values(groupedData));
            })
            .finally(() =>
                setLoader({
                    ...loader,
                    table: false
                })
            )
            .catch(() => {});
    }, [pageStatus.current, reload]);

    const dataProvider = data => {
        let newData = {};
        data.type.map(item => {
            const arrTemp = [];
            Object.keys(data.time).map(item1 => {
                if (item1 === item.type_info.title) {
                    data.time[item1].map(timeItem => {
                        let time = timeItem.split(':');
                        arrTemp.push({
                            time: timeItem,
                            user: data.user.id,
                            fullText: `${data.user.fullname} : ${time[0]} ساعت ${time[1]} دقیقه کاری -در جایگاه ${item.code}`,
                            type: item.type
                        });
                    });
                }
            });

            newData[item.type_info.title] = arrTemp;
        });

        setDetails(newData);
    };

    useEffect(() => {
        var columns = [
            { id: 1, title: 'ردیف', key: 'index' },
            { id: 2, title: 'تاریخ', key: 'create_at' },
            {
                id: 100,
                title: 'عملیات',
                key: 'actions',
                renderCell: data => (
                    <ActionCell>
                        <FormButton
                            icon={pen}
                            onClick={() => {
                                setShowAddModal(true);
                                dataProvider(data);
                            }}
                        />
                        <FormButton icon={trashBin} onClick={() => deleteModalHandler(data.ids)} />
                    </ActionCell>
                )
            }
        ];

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

            res.data.results.map((item, index) => {
                if (item.technical_force) {
                    columns.splice(1 + index, 0, {
                        id: 2,
                        title: item.title,
                        key: 'title',
                        renderCell: data => {
                            let hour = 0;
                            let personnel = 0;
                            let min = 0;

                            data.type.map(item2 => {
                                if (item.title === item2.type_info.title) {
                                    personnel += 1;
                                }
                            });

                            Object.keys(data.time).map(item2 => {
                                if (item.title === item2) {
                                    let localHour = 0;
                                    let localMin = 0;

                                    data.time[item2].map(timeData => {
                                        localHour += parseInt(timeData.split(':')[0]);
                                        localMin += parseInt(timeData.split(':')[1]);
                                    });
                                    hour = localHour;

                                    if (localMin < 60) {
                                        min = localMin;
                                    } else {
                                        min = localMin % 60;
                                        hour += parseInt(localMin / 60);
                                    }
                                }
                            });

                            return `${personnel} نفر ، ${hour} ساعت و ${min} دقیقه`;
                        }
                    });
                }
            });

            setTableCol(columns);
            setTypesList(temp);
        });
        Axios.get('worker/admin/personnel/list_create/?page_size=500').then(res => {
            setPersonnelList(res.data.results);
        });

        Axios.get('worker/admin/seat-capacity/list_create/?page_size=500').then(res => {
            setSeatList(res.data.results);
        });
    }, []);

    return (
        <QualificationWrapper>
            <PagesHeader
                buttonTitle='ثبت ظرفیت سنجی جدید'
                secondFiled='ساعت کاری مجموعه : ۸ ساعت'
                onButtonClick={() => setShowAddModal(true)}
            />
            <Table
                columns={tableCol}
                rows={qualificationList}
                pageStatus={pageStatus}
                setPageStatus={setPageStatus}
                loading={loader.table}
            />
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
