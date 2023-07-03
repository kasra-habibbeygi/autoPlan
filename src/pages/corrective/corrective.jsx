import React, { useState } from 'react';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import eye from './../../assets/images/global/Eye.svg';
import arrow from './../../assets/images/global/arrowUpChart.svg';

//Components
import Table from '../../components/table/Table';
import PagesHeader from '../../components/pages-header/pages-header';
import Button from '../../components/form-groups/button';
import { PercentWrapper } from './corrective.style';

const Corrective = () => {
    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'اقدام اصلاحی', key: 'correctiveAction' },
        {
            id: 3,
            title: 'درصد انحراف به کل',
            renderCell: row => (
                <PercentWrapper>
                    %<p>{row.correctivePercent}</p>
                    <img src={arrow} alt='' />
                </PercentWrapper>
            )
        },
        {
            id: 4,
            title: 'عملیات',
            key: 'actions',
            renderCell: () => (
                <>
                    <Button>
                        <img src={eye} alt='' />
                    </Button>
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
            correctiveAction: 'خواب ماندن تعمیر کار شماره ۸',
            correctivePercent: '۴۰',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 2,
            correctiveAction: 'خواب ماندن تعمیر کار شماره ۸',
            correctivePercent: '۴۰',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 3,
            correctiveAction: 'خواب ماندن تعمیر کار شماره ۸',
            correctivePercent: '۴۰',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 4,
            correctiveAction: 'خواب ماندن تعمیر کار شماره ۸',
            correctivePercent: '۴۰',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 5,
            correctiveAction: 'خواب ماندن تعمیر کار شماره ۸',
            correctivePercent: '۴۰',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 6,
            correctiveAction: 'خواب ماندن تعمیر کار شماره ۸',
            correctivePercent: '۴۰',
            model: 1350,
            license: '66 985 ص 42',
            mechanicCode: 23,
            position: 23,
            mobileNumber: '093851813529',
            pyramid: 23
        },
        {
            id: 7,
            correctiveAction: 'خواب ماندن تعمیر کار شماره ۸',
            correctivePercent: '۴۰',
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
            <PagesHeader buttonTitle='اقدام اصلاحی' onButtonClick={openModal} />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
        </>
    );
};

export default Corrective;
