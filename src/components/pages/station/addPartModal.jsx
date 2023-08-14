import React from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

//Assets
import Bus from './../../../assets/images/icons/Bus.svg';
import ShockAbsorber from './../../../assets/images/icons/ShockAbsorber.svg';
import Accumulator from './../../../assets/images/icons/Accumulator.svg';
import tools from '../../../utils/tools';

//Components
import InputComponent from '../../form-groups/input-component';
import Modal from '../../template/modal';
import FormButton from '../../form-groups/form-button';

const AddPartModal = ({ showPartsModal, setShowPartsModal, setPartsArray }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            title: '',
            code: '',
            car_type: ''
        },
        mode: 'onTouched'
    });

    const formSubmit = data => {
        const newData = {
            ...data,
            date: tools.changeTimeStampToDate(data.date),
            id: uuidv4(),
            fullText: `${data?.title} - ${data?.code} - ${data?.car_type}`
        };

        setPartsArray(prev => [...prev, newData]);
        closeModalHandler();
    };

    const closeModalHandler = () => {
        setShowPartsModal(false);
        reset();
    };

    return (
        <Modal state={showPartsModal} setState={setShowPartsModal} maxWidth='sm' handleClose={closeModalHandler}>
            <div className='inner_modal'>
                <h2> کسری قطعات </h2>

                <form onSubmit={handleSubmit(formSubmit)}>
                    <InputComponent
                        title='نام قطعه'
                        placeHolder='نام قطعه'
                        type='text'
                        icon={ShockAbsorber}
                        detail={{
                            ...register('title', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.title}
                    />
                    <InputComponent
                        title='کد قطعه'
                        placeHolder='کد قطعه'
                        type='text'
                        icon={Accumulator}
                        detail={{
                            ...register('code', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.code}
                    />
                    <InputComponent
                        title='نوع خودرو'
                        placeHolder='نوع خودرو'
                        type='text'
                        icon={Bus}
                        detail={{
                            ...register('car_type', {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.car_type}
                    />

                    <FormButton text={'ثبت'} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
                </form>
            </div>
        </Modal>
    );
};

export default AddPartModal;
