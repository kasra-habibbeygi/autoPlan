/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Axios from '../../configs/axios';

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
import AddPost from '../../components/pages/accessibility/add-post';
import AddPersonnel from '../../components/pages/accessibility/add-personell';
import ConfirmModal from '../../components/template/confirm-modal';
import { toast } from 'react-hot-toast';

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
    const [specificAccessibilityId, setSpecificAccessibilityId] = useState();
    const [buttonLoader, setButtonLoader] = useState(false);
    const [editModalData, setEditModalData] = useState();

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
        Axios.delete(`personnelrole_mgmt/?id=${specificAccessibilityId}`).then(() => {
            setButtonLoader(false);
            setReload(!reload);
            toast.success('پست سازمانی  با موفقیت حذف شد');
            setConfirmModalStatus(false);
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
                    {data.permission.map((item, index) => (
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
            renderCell: () => (
                <ActionCell>
                    <FormButton icon={pen} />
                    <FormButton icon={trashBin} />
                </ActionCell>
            )
        }
    ];

    const deleteModalHandler = id => {
        setConfirmModalStatus(true);
        setSpecificAccessibilityId(id);
    };

    const editModalHandler = item => {
        setModalStatus('edit');
        setShowSubModal(true);
        setSubModalStatus('personnel');
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
            <div className='table_wrapper'>
                <p className='table_header'>پست سازمانی</p>
                {/* <Table
                    columns={columnsPosts}
                    rows={accessbitilityPost}
                    pageStatus={pageStatus}
                    setPageStatus={setPageStatus}
                    loading={loader}
                /> */}
            </div>

            <br />
            <br />

            <div className='table_wrapper'>
                <p className='table_header'>پرسنل</p>
                <Table
                    columns={columnsPersonnel}
                    rows={accessbitilityPersonel}
                    pageStatus={pageStatus}
                    setPageStatus={setPageStatus}
                    loading={loaderTable}
                />
            </div>

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
                            setSubModalStatus('personnel');
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
                            setSubModalStatus('post');
                        }}
                    />
                </div>
            </Modal>

            <Modal state={showSubModal} setState={setShowSubModal} handleClose={() => setSubModalStatus()} bgStatus={true} maxWidth='md'>
                <ModalStyleBg>
                    {subModalStatus === 'post' ? (
                        <AddPost />
                    ) : subModalStatus === 'personnel' ? (
                        <AddPersonnel
                            setReload={setReload}
                            reload={reload}
                            setState={setShowSubModal}
                            modalStatus={modalStatus}
                            specificAccessibilityId={specificAccessibilityId}
                            editModalData={editModalData}
                        />
                    ) : null}
                </ModalStyleBg>
            </Modal>
            <ConfirmModal
                status={confirmModalStatus}
                setStatus={setConfirmModalStatus}
                title='آیا از حذف این ردیف مطمئن هستید ؟'
                deleteHandler={deleteHandler}
                loading={buttonLoader}
            />
        </AccessibilityWrapper>
    );
};

export default Accessibility;
