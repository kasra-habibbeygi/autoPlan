import React, { useState } from 'react';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import eye from './../../assets/images/global/Eye.svg';
import arrow from './../../assets/images/global/arrowUpChart.svg';
import { PercentWrapper } from './corrective.style';
import { ActionCell } from '../deviation/deviation.style';

//Components
import Table from '../../components/template/Table';
import PagesHeader from '../../components/template/pages-header';
import Modal from '../../components/template/modal';
import ProgressBar from '../../components/pages/corrective/progress-bar';
import FormButton from '../../components/form-groups/form-button';
import Problem from '../../components/pages/corrective/problem';
import Rootting from '../../components/pages/corrective/rootting';
import Action from '../../components/pages/corrective/action';
import ResponsibleForAction from '../../components/pages/corrective/ResponsibleForAction';

const Corrective = () => {
    const [step, setStep] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
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
        setIsModalOpen(true);
    };

    // console.log(step);

    return (
        <>
            <PagesHeader buttonTitle='اقدام اصلاحی' onButtonClick={openModal} />
            <Table columns={columns} rows={rows} pageStatus={pageStatus} setPageStatus={setPageStatus} />
            <Modal state={isModalOpen} setState={setIsModalOpen} maxWidth='lg'>
                <h2>اقدام اصلاحی</h2>
                <ProgressBar step={step} />
                {step === 1 ? (
                    <Problem setStep={setStep} />
                ) : step === 2 ? (
                    <Rootting setStep={setStep} />
                ) : step === 3 ? (
                    <Action setStep={setStep} />
                ) : step === 4 ? (
                    <ResponsibleForAction setStep={setStep} />
                ) : step === 5 ? (
                    <Problem setStep={setStep} />
                ) : step === 6 ? (
                    <Problem setStep={setStep} />
                ) : (
                    step === 7 && <Problem />
                )}
            </Modal>
        </>
    );
};

export default Corrective;
