import React, { useState } from 'react';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import eye from './../../assets/images/global/Eye.svg';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import FormButton from '../../components/form-groups/form-button';
import { ActionCell } from '../deviation/deviation.style';

const Accessibility = () => {
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
        //codes
    };

    return (
        <>
            <PagesHeader buttonTitle='دسترسی پنل' onButtonClick={openModal} />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
        </>
    );
};

export default Accessibility;
