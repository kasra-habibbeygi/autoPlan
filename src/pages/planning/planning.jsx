import React, { useState } from 'react';

//Assets

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';

const Planning = () => {
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'نوع تعمیر', key: 'repairType' },
        { id: 3, title: 'خودرو', key: 'car' },
        { id: 4, title: 'مدل', key: 'model' },
        { id: 5, title: 'پلاک خودرو', key: 'license' },
        { id: 6, title: 'کد تعمیرکار', key: 'mechanicCode' },
        { id: 7, title: 'جایگاه', key: 'position' },
        { id: 8, title: 'موبایل', key: 'mobileNumber' },
        { id: 9, title: 'هرم', key: 'pyramid' }
    ];

    const rows = [
        {
            id: 1,
            repairType: 'برق',
            car: 'پژو',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 2,
            repairType: 'برق',
            car: 'پژو',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 3,
            repairType: 'برق',
            car: 'پژو',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 4,
            repairType: 'برق',
            car: 'پژو',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 5,
            repairType: 'برق',
            car: 'پژو',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 6,
            repairType: 'برق',
            car: 'پژو',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 7,
            repairType: 'برق',
            car: 'پژو',
            model: 1350,
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

    const filterHandler = () => {
        //codes
    };

    return (
        <>
            <PagesHeader buttonTitle='ثبت برنامه جدید' onButtonClick={openModal} hasFilter={true} onFilterClick={filterHandler} />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
        </>
    );
};

export default Planning;
