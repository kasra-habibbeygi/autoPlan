import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import VerificationInput from 'react-verification-input';
import Axios from '../../configs/axios';

//assets
import { LoginStyle } from './login.style';
import shape1 from './../../assets/images/login/shape1.png';
import shape2 from './../../assets/images/login/shape2.png';
import addPhone from './../../assets/images/login/addPhone.svg';

//components
import Modal from '../../components/template/modal';
import InputComponent from '../../components/form-groups/input-component';
import FormButton from '../../components/form-groups/form-button';

const Login = ({ showModal, setShowModal }) => {
    const [loginStatus, setLoginStatus] = useState('addPhoneNumber');
    const [codeValue, setCodeValue] = useState();

    const form = useForm({
        defaultValues: {
            phoneNumber: ''
        },
        mode: 'onTouched'
    });
    const { register, formState, handleSubmit, reset } = form;
    const { errors } = formState;

    const sendCodeHandler = data => {
        setLoginStatus('sendConfirmCode');
    };

    const closeModalHandler = () => {
        reset();
        setLoginStatus('addPhoneNumber');
        setCodeValue();
    };

    useEffect(() => {
        Axios.get('validate_login_otp/?mobile=09338779212');
    }, []);

    return (
        <Modal state={showModal} setState={setShowModal} handleClose={closeModalHandler}>
            <LoginStyle>
                <img src={shape1} alt='' className='shapeTop' />
                <img src={shape2} alt='' className='shapeTop' />
                <img src={shape1} alt='' className='shapeBottom' />
                <img src={shape2} alt='' className='shapeBottom' />
                <form onSubmit={handleSubmit(sendCodeHandler)}>
                    <h2 className='title'>ورود به سیستم</h2>
                    {loginStatus === 'addPhoneNumber' ? (
                        <div className='firstStep'>
                            <p className='text'>
                                کاربر گرامی، خواهشمندیم جهت ورود به حساب کاربری و استفاده از خدمات اتو پلنینگ ، شماره تلفن همراه خود را در
                                کادر زیر وارد نمایید.
                            </p>
                            <InputComponent
                                title='شماره موبایل'
                                type='number'
                                icon={addPhone}
                                detail={{
                                    ...register('phoneNumber', {
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
                                error={errors?.phoneNumber}
                                placeHolder='---------۰۹'
                            />
                            <FormButton
                                text='ادامه'
                                loading={false}
                                type='submit'
                                backgroundColor='#174787'
                                color='white'
                                height={48}
                                margin='30px 0 0 0'
                            />
                        </div>
                    ) : loginStatus === 'sendConfirmCode' ? (
                        <div className='secondStep'>
                            <p className='text'>
                                کد یکبار مصرف به شماره ۰۹۳۶۸۳۲۰۲۱۶ پیامک شد؛ لطفا کد ارسال شده را در کادر زیر وارد نمایید.
                            </p>
                            <p className='verificationText'>کد یکبار مصرف</p>
                            <div className='codeInput'>
                                <VerificationInput
                                    value={codeValue}
                                    onChange={value => setCodeValue(value)}
                                    validChars='0-9'
                                    placeholder='-'
                                    onComplete={() => {}}
                                    classNames={{
                                        container: 'container',
                                        character: 'character'
                                    }}
                                />
                            </div>
                            <FormButton
                                text='ثبت'
                                loading={false}
                                type='button'
                                backgroundColor={'#174787'}
                                color={'white'}
                                height={48}
                                margin='30px 0 0 0'
                            />
                        </div>
                    ) : null}
                </form>
            </LoginStyle>
        </Modal>
    );
};

export default Login;
