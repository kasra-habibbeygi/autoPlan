import React, { useState } from 'react';

//Assets

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';

const Deficiency = () => {
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });
    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'تاریخ', key: 'date' },
        { id: 3, title: 'نام قطعه', key: 'partName' },
        { id: 4, title: 'نوع خودرو', key: 'carType' }
    ];

    const rows = [
        {
            id: 1,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 2,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 3,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 4,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 5,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 6,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        },
        {
            id: 7,
            date: '۱۴۰۲-۰۴-۰۸',
            partName: 'جک جعبه فرمان',
            carType: 'شاهین'
        }
    ];

    const openModal = () => {
        //codes
    };

    return (
        <>
            <PagesHeader buttonTitle='اضافه کردن کسری قطعات' onButtonClick={openModal} />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
        </>
    );
};

export default Deficiency;
