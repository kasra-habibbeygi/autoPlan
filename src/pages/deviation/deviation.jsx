import React, { useState } from 'react';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Button from '../../components/form-groups/button';

const Deviation = () => {
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'علت انحراف', key: 'deviationReason' },
        {
            id: 3,
            title: 'عملیات',
            key: 'actions',
            renderCell: () => (
                <>
                    <Button>
                        <img src={pen} alt='' />
                    </Button>
                    <Button>
                        <img src={trashBin} alt='' />
                    </Button>
                </>
            )
        }
    ];

    const rows = [
        {
            id: 1,
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
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
            deviationReason: 'عیوب پیش بینی نشده',
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

    return (
        <>
            <PagesHeader buttonTitle='ثبت انحراف جدید' onButtonClick={openModal} />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
        </>
    );
};

export default Deviation;
