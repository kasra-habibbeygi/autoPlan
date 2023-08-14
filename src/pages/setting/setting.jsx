import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import Axios from '../../configs/axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { infoHandler } from '../../store/reducers/user';

//Assets
import pen from './../../assets/images/global/pen.svg';
import { SettingWrapper } from './setting.style';
import document from './../../assets/images/sideBar/DocumentAdd.svg';
import notes from './../../assets/images/sideBar/Notes.svg';
import bill from './../../assets/images/sideBar/Bill.svg';
import homeSmile from './../../assets/images/sideBar/HomeSmile.svg';
import addPhone from './../../assets/images/login/addPhone.svg';

//Components
import PagesHeader from '../../components/template/pages-header';
import DetailBoxHeader from '../../components/template/detail-box-header';
import ReceptionForm from '../../components/pages/setting/reception-form';
import WorkTimeForm from '../../components/pages/setting/work-time-form';
import Modal from '../../components/template/modal';
import FormButton from '../../components/form-groups/form-button';
import InputComponent from '../../components/form-groups/input-component';
import { AddAdminWrapper } from '../add-admin/add-admin.style';

const Setting = () => {
    const userInfo = useSelector(state => state.User.info);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const { register, handleSubmit, formState, reset, setValue } = useForm({
        defaultValues: {
            company_address: '',
            company_code: '',
            company_name: '',
            company_owner: '',
            mobile: '',
            username: ''
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const editModalHandler = () => {
        setModalOpen(true);
        setValue('fullname', userInfo.fullname);
        setValue('code', userInfo.company_code);
        setValue('title', userInfo.company_name);
        setValue('phone', userInfo.mobile_number);
        setValue('address', userInfo.company_address);
    };
    const formSubmit = data => {
        setButtonLoader(true);
        Axios.put(`user/super-admin/representation/retrieve_update_destroy/?pk=${userInfo.company_id}`, data)
            .then(() => {
                toast.success('اطلاعات نمایندگی با موفقیت ویرایش شد');
                setModalOpen(false);
                reset();
                Axios.get('user/profile/').then(res => {
                    dispatch(infoHandler(res.data));
                });
            })
            .catch(() => {})
            .finally(() => {
                setButtonLoader(false);
            });
    };

    return (
        <>
            <PagesHeader buttonTitle='نام نمایندگی : فلان' />
            <SettingWrapper>
                <Grid container spacing={1.5}>
                    <Grid item xs={12} md={6}>
                        <div className='item'>
                            <ReceptionForm />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className='item'>
                            <WorkTimeForm />
                        </div>
                        <br />
                        <div className='item'>
                            <DetailBoxHeader
                                title={`نام نمایندگی: ${userInfo.company_name}`}
                                onClick={editModalHandler}
                                buttonText={<img src={pen} />}
                            />
                        </div>
                    </Grid>
                </Grid>
                <Modal state={modalOpen} setState={setModalOpen} handleClose={reset} bgStatus={true}>
                    <AddAdminWrapper>
                        <div className='formControl'>
                            <h2>ویرایش نمایندگی</h2>
                            <form onSubmit={handleSubmit(formSubmit)}>
                                <InputComponent
                                    title='نام کامل'
                                    icon={document}
                                    detail={{
                                        ...register('fullname', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.fullname}
                                    placeHolder='نام کامل'
                                />

                                <InputComponent
                                    title='کد نمایندگی'
                                    icon={notes}
                                    detail={{
                                        ...register('code', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.code}
                                    placeHolder='کد نمایندگی'
                                />

                                <InputComponent
                                    title='نام نمایندگی'
                                    icon={bill}
                                    detail={{
                                        ...register('title', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            }
                                        })
                                    }}
                                    error={errors?.title}
                                    placeHolder='نام نمایندگی'
                                />

                                <InputComponent
                                    title='شماره موبایل'
                                    type='tel'
                                    icon={addPhone}
                                    detail={{
                                        ...register('phone', {
                                            required: {
                                                value: true,
                                                message: 'این فیلد اجباری است'
                                            },
                                            maxLength: {
                                                value: 11,
                                                message: 'شماره باید ۱۱ عدد باشد'
                                            },
                                            minLength: {
                                                value: 11,
                                                message: 'شماره باید ۱۱ عدد باشد'
                                            }
                                        })
                                    }}
                                    maxLength={11}
                                    error={errors?.phone}
                                    placeHolder='---------۰۹'
                                />

                                <div className={errors?.address ? 'text_area text_area_error' : 'text_area'}>
                                    <p className='title'>آدرس نمایندگی</p>
                                    <div>
                                        <textarea
                                            rows='5'
                                            placeholder='آدرس نمایندگی'
                                            {...register('address', {
                                                required: {
                                                    value: true,
                                                    message: 'این فیلد اجباری است'
                                                }
                                            })}
                                        ></textarea>
                                        <img src={homeSmile} />
                                    </div>
                                    <p className='error'>{errors?.address?.message}</p>
                                </div>

                                <FormButton
                                    text='ویرایش'
                                    type='submit'
                                    backgroundColor='#174787'
                                    color={'white'}
                                    height={48}
                                    loading={buttonLoader}
                                    disabled={userInfo?.role !== 'Admin'}
                                />
                            </form>
                            {console.log(userInfo?.role !== 'Admin')}
                        </div>
                    </AddAdminWrapper>
                </Modal>
            </SettingWrapper>
        </>
    );
};

export default Setting;
