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

const Accessibility = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [loader, setLoader] = useState(true);
    const [loaderTable, setLoaderTable] = useState(true);
    const [reload, setReload] = useState(false);
    const [reloadUser, setReloadUser] = useState(false);
    const [subModalStatus, setSubModalStatus] = useState();
    const [accessbitilityPersonel, setAccessibilityPersonel] = useState();
    const [accessbitilityPost, setAccessibilityPost] = useState();

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
        Axios.get(`personnelrole_mgmt/?page=${pageStatus.current}`).then(res => {
            setAccessibilityPost(res.data.data);
            console.log(accessbitilityPost);
            setLoader(false);
            setPageStatus({
                ...pageStatus,
                total: res.data.total
            });
        });
        Axios.get(`user_mgmt/?page=${pageStatus.current}`).then(res => {
            setAccessibilityPersonel(res.data.data);
            // console.log(accessbitilityPersonel);
            setLoaderTable(false);
            setPageStatusUser({
                ...pageStatusUser,
                total: res.data.total
            });
        });
    }, [reloadUser, reload, pageStatusUser.current]);

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
            renderCell: () => (
                <ActionCell>
                    <FormButton icon={eye} />
                    <FormButton icon={pen} />
                    <FormButton icon={trashBin} />
                </ActionCell>
            )
        }
    ];

    const columnsPersonnel = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'موبایل', key: 'mobileNumber' },
        { id: 3, title: 'نام کاربری', key: 'userName' },
        { id: 4, title: 'نقش کاربر', key: 'userRole' },
        { id: 5, title: 'نام و نام خانوادگی', key: 'fullName' },

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

    const rowsPost = [
        {
            id: 1,
            postName: 'ادمین',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی'
        },
        {
            id: 2,
            postName: 'ادمین',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی'
        },
        {
            id: 3,
            postName: 'ادمین',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی'
        },
        {
            id: 4,
            postName: 'ادمین',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی'
        },
        {
            id: 5,
            postName: 'ادمین',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی'
        },
        {
            id: 6,
            postName: 'ادمین',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی'
        },
        {
            id: 7,
            postName: 'ادمین',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی'
        }
    ];

    const rowsPersonnel = [
        {
            id: 1,
            mobileNumber: '09383939515',
            userName: 'aliSomeOne',
            userRole: 'ادمین اصلی',
            fullName: 'محسن چاووشی'
        },
        {
            id: 2,
            mobileNumber: '09383939515',
            userName: 'aliSomeOne',
            userRole: 'ادمین اصلی',
            fullName: 'محسن چاووشی'
        },
        {
            id: 3,
            mobileNumber: '09383939515',
            userName: 'aliSomeOne',
            userRole: 'ادمین اصلی',
            fullName: 'محسن چاووشی'
        },
        {
            id: 4,
            mobileNumber: '09383939515',
            userName: 'aliSomeOne',
            userRole: 'ادمین اصلی',
            fullName: 'محسن چاووشی'
        },
        {
            id: 5,
            mobileNumber: '09383939515',
            userName: 'aliSomeOne',
            userRole: 'ادمین اصلی',
            fullName: 'محسن چاووشی'
        },
        {
            id: 6,
            mobileNumber: '09383939515',
            userName: 'aliSomeOne',
            userRole: 'ادمین اصلی',
            fullName: 'محسن چاووشی'
        }
    ];

    const openModal = () => {
        setShowAddModal(true);
    };

    return (
        <AccessibilityWrapper>
            <PagesHeader buttonTitle='دسترسی پنل' onButtonClick={openModal} />
            <div className='table_wrapper'>
                <p className='table_header'>پست سازمانی</p>
                <Table
                    columns={columnsPosts}
                    rows={accessbitilityPost}
                    pageStatus={pageStatus}
                    setPageStatus={setPageStatus}
                    loading={loader}
                />
            </div>

            <br />
            <br />
            <br />

            <div className='table_wrapper'>
                <p className='table_header'>پرسنل</p>
                <Table
                    columns={columnsPersonnel}
                    rows={rowsPersonnel}
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
                    {subModalStatus === 'post' ? <AddPost /> : subModalStatus === 'personnel' ? <AddPersonnel /> : null}{' '}
                </ModalStyleBg>
            </Modal>
        </AccessibilityWrapper>
    );
};

export default Accessibility;
