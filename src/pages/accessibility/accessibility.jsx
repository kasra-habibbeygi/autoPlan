/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Axios from '../../configs/axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import eye from './../../assets/images/global/Eye.svg';
import UserPlusRounded from './../../assets/images/corrective/UserPlusRounded.svg';
import RoundGraph from './../../assets/images/corrective/RoundGraph.svg';
import { ActionCell } from '../deviation/deviation.style';
import PERMISSION from '../../utils/permission.ts';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import FormButton from '../../components/form-groups/form-button';
import Modal from '../../components/template/modal';
import { AccessibilityWrapper, ModalStyleBg } from './accessibility.style';
import ConfirmModal from '../../components/template/confirm-modal';
import AddPost from './../../components/pages/accessibility/add-post';
import AddPersonnel from './../../components/pages/accessibility/add-personell';
import { Tab, Tabs } from '@mui/material';

const Accessibility = () => {
    const userPermissions = useSelector(state => state.User.info.permission);
    const [modalStatus, setModalStatus] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [loader, setLoader] = useState(true);
    const [loaderTable, setLoaderTable] = useState(true);
    const [reload, setReload] = useState(false);
    const [reloadUser, setReloadUser] = useState(false);
    const [subModalStatus, setSubModalStatus] = useState();
    const [accessbitilityPersonel, setAccessibilityPersonel] = useState([]);
    const [accessbitilityPost, setAccessibilityPost] = useState([]);
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [confirmUserModalStatus, setConfirmUserModalStatus] = useState(false);
    const [specificAccessibilityId, setSpecificAccessibilityId] = useState();
    const [specificAccessibilityIdUser, setSpecificAccessibilityIdUser] = useState();
    const [buttonLoader, setButtonLoader] = useState(false);
    const [buttonLoaderUser, setButtonLoaderUser] = useState(false);
    const [showAllDetailsModal, setShowAllDetailsModal] = useState(false);
    const [editModalData, setEditModalData] = useState();
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const [pageStatusUser, setPageStatusUser] = useState({
        total: 1,
        current: 1
    });

    useEffect(() => {
        setLoader(true);
        setLoaderTable(true);
        Axios.get(`/worker/admin/organizational-position/list_create/?pageSize=10&page=${pageStatus.current}`)
            .then(res => {
                setAccessibilityPost(res.data.results);
                setLoader(false);
                setPageStatus({
                    ...pageStatus,
                    total: res.data.total
                });
            })
            .catch(() => {});
        Axios.get(`/worker/admin/personnel/list_create/?pageSize=10&page=${pageStatusUser.current}`)
            .then(res => {
                setAccessibilityPersonel(res.data.results);
                setLoaderTable(false);
                setPageStatusUser({
                    ...pageStatusUser,
                    total: res.data.total
                });
            })
            .catch(() => {});
    }, [reloadUser, reload, pageStatusUser.current]);

    const deleteHandler = () => {
        setButtonLoader(true);
        Axios.delete(`/worker/admin/organizational-position/retrieve_update_destroy/?pk=${specificAccessibilityId}`)
            .then(() => {
                setReload(!reload);
                toast.success('پست سازمانی  با موفقیت حذف شد');
                setConfirmModalStatus(false);
                setPageStatus({
                    ...pageStatus,
                    current: 1
                });
            })
            .catch(() => {})
            .finally(() => {
                setButtonLoader(false);
            });
    };

    const deleteHandlerUser = () => {
        setButtonLoaderUser(true);
        Axios.delete(`/worker/admin/personnel/retrieve_update_destroy/?pk=${specificAccessibilityIdUser}`)
            .then(() => {
                setReloadUser(prev => !prev);
                toast.success('پرسنل  با موفقیت حذف شد');
                setConfirmUserModalStatus(false);
                setPageStatus({
                    ...pageStatus,
                    current: 1
                });
            })
            .catch(() => {})
            .finally(() => {
                setButtonLoaderUser(false);
            });
    };

    const columnsPosts = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'نام پست', key: 'title' },
        {
            id: 3,
            title: 'دسترسی ها',
            renderCell: data => (
                <div className='truncate_cell'>
                    {data.permissions_info?.map((item, index) => (
                        <span key={`permission_${index}`}>{item.title},</span>
                    ))}
                </div>
            )
        },
        {
            id: 4,
            title: 'عملیات',
            key: 'actions',
            renderCell: item => (
                <ActionCell>
                    <FormButton
                        icon={eye}
                        onClick={() => {
                            setShowAllDetailsModal(true);
                            setEditModalData(item);
                        }}
                    />
                    <FormButton
                        icon={pen}
                        onClick={() => postsEditModalHandler(item)}
                        disabled={!userPermissions.includes(PERMISSION.ACCESS_POST.EDIT)}
                    />
                    <FormButton
                        icon={trashBin}
                        onClick={() => deleteModalHandler(item.id)}
                        disabled={!userPermissions.includes(PERMISSION.ACCESS_POST.DELETE)}
                    />
                </ActionCell>
            )
        }
    ];

    const columnsPersonnel = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'موبایل', renderCell: item => item?.personnel?.mobile_number },
        { id: 4, title: 'نقش کاربر', renderCell: item => item?.organizational_position_info?.title },
        { id: 5, title: 'نام و نام خانوادگی', renderCell: item => item?.personnel?.fullname },
        { id: 6, title: 'کد تعمیرکار', key: 'code' },
        {
            id: 7,
            title: 'عملیات',
            key: 'actions',
            renderCell: item => (
                <ActionCell>
                    <FormButton
                        icon={pen}
                        onClick={() => personnelEditModalHandler(item)}
                        disabled={!userPermissions.includes(PERMISSION.ACCESS_PERSONNEL.EDIT)}
                    />
                    <FormButton
                        icon={trashBin}
                        onClick={() => deleteModalHandlerUser(item?.id)}
                        disabled={!userPermissions.includes(PERMISSION.ACCESS_PERSONNEL.DELETE)}
                    />
                </ActionCell>
            )
        }
    ];

    const deleteModalHandler = id => {
        setConfirmModalStatus(true);
        setSpecificAccessibilityId(id);
    };

    const deleteModalHandlerUser = id => {
        setConfirmUserModalStatus(true);
        setSpecificAccessibilityIdUser(id);
    };

    const postsEditModalHandler = item => {
        setModalStatus('edit');
        setShowSubModal(true);
        setSubModalStatus('post');
        setSpecificAccessibilityId(item.id);
        setEditModalData(item);
    };

    const personnelEditModalHandler = item => {
        setModalStatus('edit');
        setShowSubModal(true);
        setSubModalStatus('personnel');
        setEditModalData(item);
    };

    const openModal = () => {
        setShowAddModal(true);
        setModalStatus('add');
    };

    const subModalCloseHandler = () => {
        setSubModalStatus();
        setModalStatus();
        setSubModalStatus();
        setSpecificAccessibilityId();
        setEditModalData();
    };

    return (
        <AccessibilityWrapper>
            <PagesHeader buttonTitle='دسترسی پنل' onButtonClick={openModal} />
            <div className='tabs_wrapper'>
                <Tabs value={tabValue} onChange={handleChange} textColor='inherit'>
                    <Tab label='پست سازمانی' sx={{ fontWeight: 700, fontSize: 16, color: 'black' }} />
                    <Tab label='پرسنل' sx={{ fontWeight: 700, fontSize: 16, color: 'black' }} />
                </Tabs>
            </div>

            {tabValue === 0 ? (
                <div className='table_wrapper'>
                    <Table
                        columns={columnsPosts}
                        rows={accessbitilityPost}
                        pageStatus={pageStatus}
                        setPageStatus={setPageStatus}
                        loading={loader}
                    />
                </div>
            ) : (
                <div className='table_wrapper'>
                    <Table
                        columns={columnsPersonnel}
                        rows={accessbitilityPersonel}
                        pageStatus={pageStatus}
                        setPageStatus={setPageStatus}
                        loading={loaderTable}
                    />
                </div>
            )}

            <Modal state={showAddModal} setState={setShowAddModal} maxWidth='sm'>
                <div className='button_wrapper'>
                    <FormButton
                        text='اضافه کردن پست'
                        icon={UserPlusRounded}
                        reverse='row-reverse'
                        backgroundColor={'#d9d9d9'}
                        color={'black'}
                        borderRadius={20}
                        onClick={() => {
                            setShowSubModal(true);
                            setSubModalStatus('post');
                        }}
                        disabled={!userPermissions.includes(PERMISSION.ACCESS_POST.ADD)}
                    />
                    <FormButton
                        text='اضافه کردن پرسنل'
                        icon={RoundGraph}
                        reverse='row-reverse'
                        backgroundColor={'#d9d9d9'}
                        color={'black'}
                        borderRadius={20}
                        onClick={() => {
                            setShowSubModal(true);
                            setSubModalStatus('personnel');
                        }}
                        disabled={!userPermissions.includes(PERMISSION.ACCESS_PERSONNEL.ADD)}
                    />
                </div>
            </Modal>

            <Modal state={showSubModal} setState={setShowSubModal} handleClose={subModalCloseHandler} bgStatus={true} maxWidth='md'>
                <ModalStyleBg>
                    {subModalStatus === 'post' ? (
                        <AddPost
                            setReload={setReloadUser}
                            setState={setShowSubModal}
                            editModalData={editModalData}
                            modalStatus={modalStatus}
                            subModalCloseHandler={subModalCloseHandler}
                        />
                    ) : (
                        subModalStatus === 'personnel' && (
                            <AddPersonnel
                                setReload={setReload}
                                setState={setShowSubModal}
                                editModalData={editModalData}
                                modalStatus={modalStatus}
                                subModalCloseHandler={subModalCloseHandler}
                            />
                        )
                    )}
                </ModalStyleBg>
            </Modal>

            <Modal state={showAllDetailsModal} setState={setShowAllDetailsModal} handleClose={subModalCloseHandler} maxWidth='sm'>
                <div className='showAll_container'>
                    <div className='item'>
                        <p className='title'>1. نام پست</p>
                        <p className='text'>
                            <span>{editModalData?.title}</span>
                        </p>
                    </div>
                    <div className='item'>
                        <p className='title'>2. دسترسی ها</p>
                        {editModalData?.permissions_info?.map(item => (
                            <p className='text' key={item.id}>
                                {item.title}
                            </p>
                        ))}
                    </div>
                </div>
            </Modal>
            <ConfirmModal
                status={confirmModalStatus}
                setStatus={setConfirmModalStatus}
                title='آیا از حذف این ردیف مطمئن هستید ؟'
                deleteHandler={deleteHandler}
                loading={buttonLoader}
            />

            <ConfirmModal
                status={confirmUserModalStatus}
                setStatus={setConfirmUserModalStatus}
                title='آیا از 11111 این ردیف مطمئن هستید ؟'
                deleteHandler={deleteHandlerUser}
                loading={buttonLoaderUser}
            />
        </AccessibilityWrapper>
    );
};

export default Accessibility;
