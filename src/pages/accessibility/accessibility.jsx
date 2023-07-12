import React, { useState } from 'react';

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
import { AccessibilityWrapper } from './accessibility.style';
import AddPost from '../../components/pages/accessibility/add-post';
import AddPersonnel from '../../components/pages/accessibility/add-personell';

const Accessibility = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [subModalStatus, setSubModalStatus] = useState();
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'موبایل', key: 'mobileNumber' },
        { id: 3, title: 'پست کاربر', key: 'userRole' },
        { id: 4, title: 'دسترسی ها', key: 'accessibility' },

        {
            id: 5,
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

    const rows = [
        {
            id: 1,
            userRole: 'ادمین اصلی',
            correctivePercent: '۴۰',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی',
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 2,
            userRole: 'ادمین اصلی',
            correctivePercent: '۴۰',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی',
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 3,
            userRole: 'ادمین اصلی',
            correctivePercent: '۴۰',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی',
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 4,
            userRole: 'ادمین اصلی',
            correctivePercent: '۴۰',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی',
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 5,
            userRole: 'ادمین اصلی',
            correctivePercent: '۴۰',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی',
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 6,
            userRole: 'ادمین اصلی',
            correctivePercent: '۴۰',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی',
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 7,
            userRole: 'ادمین اصلی',
            correctivePercent: '۴۰',
            accessibility: 'ظرفیت سنجی، انبارداری، پذیرش، گزارش گیری، اقدام اصلاحی',
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        }
    ];

    const openModal = () => {
        setShowAddModal(true);
    };

    return (
        <AccessibilityWrapper>
            <PagesHeader buttonTitle='دسترسی پنل' onButtonClick={openModal} />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
            <Modal state={showAddModal} setState={setShowAddModal} maxWidth='sm'>
                <div className='button_wrapper'>
                    <FormButton
                        text='اضافه کردن پرسنل'
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
                        text='اضافه کردن پست'
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

            <Modal state={showSubModal} setState={setShowSubModal} handleClose={() => setSubModalStatus()}>
                {subModalStatus === 'post' ? <AddPost /> : subModalStatus === 'personnel' ? <AddPersonnel /> : null}
            </Modal>
        </AccessibilityWrapper>
    );
};

export default Accessibility;
