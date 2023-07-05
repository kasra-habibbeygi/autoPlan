import React, { useState } from 'react';

//Assets

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Button from '../../components/form-groups/button';

const Qualification = () => {
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'تاریخ', key: 'date' },
        { id: 3, title: 'جلوبندی', key: 'blocking' },
        { id: 4, title: 'مکانیک', key: 'mechanic' },
        { id: 5, title: 'برق', key: 'electric' },
        { id: 6, title: 'گاز', key: 'gas' },
        {
            id: 7,
            title: 'جایگاه',
            key: 'position',
            renderCell: () => <Button>مشاهده</Button>
        }
    ];

    const rows = [
        {
            id: 1,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 2,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 3,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 4,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 5,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 6,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        },
        {
            id: 7,
            date: '۱۴۰۲-۰۴-۰۸',
            blocking: 13,
            mechanic: 37,
            electric: 25,
            gas: 23
        }
    ];

    const openModal = () => {
        //codes
    };

    return (
        <>
            <PagesHeader buttonTitle='ثبت ظرفیت سنجی جدید' onButtonClick={openModal} />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
        </>
    );
};

export default Qualification;
