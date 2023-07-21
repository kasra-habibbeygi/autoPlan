/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Axios from '../../configs/axios';
import { toast } from 'react-hot-toast';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import eye from './../../assets/images/global/Eye.svg';
import UserPlusRounded from './../../assets/images/corrective/UserPlusRounded.svg';
import RoundGraph from './../../assets/images/corrective/RoundGraph.svg';
import { ActionCell } from '../deviation/deviation.style';

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
        Axios.get(`personnelrole_mgmt/?pageSize=10&page=${pageStatus.current}`).then(res => {
            setAccessibilityPost(res.data.data);
            setLoader(false);
            setPageStatus({
                ...pageStatus,
                total: res.data.total
            });
        });
        Axios.get(`user_mgmt/?pageSize=10&page=${pageStatus.current}`).then(res => {
            setAccessibilityPersonel(res.data.data);
            setLoaderTable(false);
            setPageStatusUser({
                ...pageStatusUser,
                total: res.data.total
            });
        });
    }, [reloadUser, reload, pageStatusUser.current]);

    const deleteHandler = () => {
        setButtonLoader(true);
        Axios.delete(`personnelrole_mgmt/?id=${specificAccessibilityId}`)
            .then(() => {
                setReload(!reload);
                toast.success('پست سازمانی  با موفقیت حذف شد');
                setConfirmModalStatus(false);
            })
            .finally(() => {
                setButtonLoader(false);
            });
    };

    const deleteHandlerUser = () => {
        setButtonLoaderUser(true);
        Axios.delete(`user_mgmt/?id=${specificAccessibilityIdUser}`)
            .then(() => {
                setReloadUser(!reload);
                toast.success('پرسنل  با موفقیت حذف شد');
                setConfirmUserModalStatus(false);
            })
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
            key: 'accessibility',
            renderCell: data => (
                <div className='truncate_cell'>
                    {data.permission_titles?.map((item, index) => (
                        <span key={`permission_${index}`}>{item},</span>
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
                    <FormButton icon={eye} />
                    <FormButton icon={pen} onClick={() => editModalHandler(item)} />
                    <FormButton icon={trashBin} onClick={() => deleteModalHandler(item.id)} />
                </ActionCell>
            )
        }
    ];

    const columnsPersonnel = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'موبایل', key: 'mobile' },
        { id: 4, title: 'نقش کاربر', key: 'role__title' },
        { id: 5, title: 'نام و نام خانوادگی', key: 'user__first_name' },

        {
            id: 6,
            title: 'عملیات',
            key: 'actions',
            renderCell: item => (
                <ActionCell>
                    <FormButton icon={pen} />
                    <FormButton icon={trashBin} onClick={() => deleteModalHandlerUser(item.id)} />
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

    const editModalHandler = item => {
        setModalStatus('edit');
        setShowSubModal(true);
        setSubModalStatus('post');
        setSpecificAccessibilityId(item.id);
        setEditModalData(item);
    };

    const openModal = () => {
        setShowAddModal(true);
        setModalStatus('add');
    };

    return (
        <AccessibilityWrapper>
            <PagesHeader buttonTitle='دسترسی پنل' onButtonClick={openModal} />
            <p className='header'>دسترسی ها</p>
            <div className='tabs_wrapper'>
                <Tabs value={tabValue} onChange={handleChange} textColor='black'>
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
                    />
                </div>
            </Modal>

            <Modal state={showSubModal} setState={setShowSubModal} handleClose={() => setSubModalStatus()} bgStatus={true} maxWidth='md'>
                <ModalStyleBg>
                    {subModalStatus === 'post' ? (
                        <AddPost setReload={setReloadUser} reload={reloadUser} setState={setShowSubModal} />
                    ) : (
                        subModalStatus === 'personnel' && (
                            <AddPersonnel
                                setReload={setReload}
                                reload={reload}
                                setState={setShowSubModal}
                                specificAccessibilityId={specificAccessibilityId}
                                editModalData={editModalData}
                                modalStatus={modalStatus}
                            />
                        )
                    )}
                </ModalStyleBg>
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
