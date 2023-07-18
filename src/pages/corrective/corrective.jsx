/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Axios from '../../configs/axios';
import { useSelector } from 'react-redux';

//Assets
import trashBin from './../../assets/images/global/TrashBin.svg';
import pen from './../../assets/images/global/pen.svg';
import eye from './../../assets/images/global/Eye.svg';
import { ModalStyleBg } from './corrective.style';
import { ActionCell } from '../deviation/deviation.style';
import PERMISSION from '../../utils/permission.ts';

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
import ExecuteDate from '../../components/pages/corrective/execute-date';
import Result from '../../components/pages/corrective/result';
import Effective from '../../components/pages/corrective/effective';
import ShowAll from '../../components/pages/corrective/show-all';
import ConfirmModal from '../../components/template/confirm-modal';
import { toast } from 'react-hot-toast';

const Corrective = () => {
    const userPermissions = useSelector(state => state.User.info.permission);
    const [step, setStep] = useState(1);
    const [allDetail, setAllDetail] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [correctiveData, setCorrectiveData] = useState();
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);
    const [chosenEditItemDetails, setChosenEditItemDetails] = useState();
    const [DetailsIsModalOpen, setDetailsIsModalOpen] = useState(false);
    const [reload, setReload] = useState(false);
    const [loader, setLoader] = useState(true);
    const [specificDeviationId, setSpecificDeviationId] = useState();

    const [buttonLoader, setButtonLoader] = useState({
        delete: false
    });

    const [pageStatus, setPageStatus] = useState({
        total: 1,
        current: 1
    });

    const columns = [
        { id: 1, title: 'ردیف', key: 'index' },
        { id: 2, title: 'مشکل', key: 'problem' },
        { id: 3, title: 'مسئول', key: 'action_agent' },
        {
            id: 4,
            title: 'عملیات',
            key: 'actions',
            renderCell: data => (
                <ActionCell>
                    <FormButton icon={eye} onClick={() => setDetailsIsModalOpen(true)} />
                    <FormButton
                        icon={pen}
                        onClick={() => {
                            setIsModalOpen(true);
                            setChosenEditItemDetails(data);
                        }}
                        disabled={!userPermissions.includes(PERMISSION.CORRECTIVE_ACTION.EDIT)}
                    />
                    <FormButton
                        icon={trashBin}
                        onClick={() => deleteModalHandler(data.id)}
                        disabled={!userPermissions.includes(PERMISSION.CORRECTIVE_ACTION.DELETE)}
                    />
                </ActionCell>
            )
        }
    ];

    useEffect(() => {
        setLoader(true);
        Axios.get(`reform_action/?page=${pageStatus.current}`)
            .then(res => {
                setCorrectiveData(res.data.data);
                setPageStatus({
                    ...pageStatus,
                    total: res.data.total
                });
            })
            .finally(() => setLoader(false));
    }, [reload, pageStatus.current]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const deleteHandler = () => {
        setButtonLoader({ ...buttonLoader, delete: true });
        Axios.delete(`reform_action/?id=${specificDeviationId}`).then(() => {
            setButtonLoader({ ...buttonLoader, delete: false });
            setReload(!reload);
            toast.success('اقدام اصلاحی  با موفقیت حذف شد');
            setConfirmModalStatus(false);
        });
    };

    const deleteModalHandler = id => {
        setConfirmModalStatus(true);
        setSpecificDeviationId(id);
    };

    return (
        <>
            <PagesHeader
                buttonTitle='اقدام اصلاحی'
                onButtonClick={openModal}
                disabled={!userPermissions.includes(PERMISSION.CORRECTIVE_ACTION.ADD)}
            />
            <Table columns={columns} rows={correctiveData} pageStatus={pageStatus} setPageStatus={setPageStatus} loading={loader} />
            <Modal
                state={isModalOpen}
                setState={setIsModalOpen}
                maxWidth='lg'
                bgStatus='true'
                handleClose={() => {
                    setStep(1);
                    setChosenEditItemDetails();
                    setAllDetail();
                }}
            >
                {isModalOpen ? (
                    <ModalStyleBg>
                        <h2>اقدام اصلاحی</h2>
                        <ProgressBar step={step} />
                        {step === 1 ? (
                            <Problem
                                setStep={setStep}
                                setAllDetail={setAllDetail}
                                chosenEditItemDetails={chosenEditItemDetails}
                                setReload={setReload}
                            />
                        ) : step === 2 ? (
                            <Rootting
                                setStep={setStep}
                                setAllDetail={setAllDetail}
                                allDetail={allDetail}
                                chosenEditItemDetails={chosenEditItemDetails}
                                setReload={setReload}
                            />
                        ) : step === 3 ? (
                            <Action
                                setStep={setStep}
                                setAllDetail={setAllDetail}
                                allDetail={allDetail}
                                chosenEditItemDetails={chosenEditItemDetails}
                                setReload={setReload}
                            />
                        ) : step === 4 ? (
                            <ResponsibleForAction
                                setStep={setStep}
                                setAllDetail={setAllDetail}
                                allDetail={allDetail}
                                chosenEditItemDetails={chosenEditItemDetails}
                                setReload={setReload}
                            />
                        ) : step === 5 ? (
                            <ExecuteDate
                                setStep={setStep}
                                setAllDetail={setAllDetail}
                                allDetail={allDetail}
                                setIsModalOpen={setIsModalOpen}
                                setReload={setReload}
                                chosenEditItemDetails={chosenEditItemDetails}
                            />
                        ) : step === 6 ? (
                            <Result setStep={setStep} setAllDetail={setAllDetail} />
                        ) : (
                            step === 7 && <Effective setStep={setStep} setAllDetail={setAllDetail} />
                        )}
                    </ModalStyleBg>
                ) : null}
            </Modal>
            <ConfirmModal
                status={confirmModalStatus}
                setStatus={setConfirmModalStatus}
                title='آیا از حذف این ردیف مطمئن هستید ؟'
                deleteHandler={deleteHandler}
                loading={buttonLoader.delete}
            />
            <Modal
                state={DetailsIsModalOpen}
                setState={setDetailsIsModalOpen}
                maxWidth='lg'
                handleClose={() => {
                    setChosenEditItemDetails();
                }}
            >
                <ShowAll allDetail={allDetail} />
            </Modal>
        </>
    );
};

export default Corrective;
