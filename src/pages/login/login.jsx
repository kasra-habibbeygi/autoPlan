import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import VerificationInput from 'react-verification-input';
import Axios from '../../configs/axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStatusHandler } from '../../store/reducers/user';

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginStatus, setLoginStatus] = useState('addPhoneNumber');
    const [codeValue, setCodeValue] = useState();
    const [loader, setLoader] = useState({
        login: false,
        otp: false
    });

    const [inputValues, setInputValues] = useState({
        mobile_number: '',
        code: ''
    });

    const form = useForm({
        defaultValues: {
            mobile_number: ''
        },
        mode: 'onTouched'
    });

    const { register, formState, handleSubmit, reset } = form;
    const { errors } = formState;

    const sendCodeHandler = data => {
        setInputValues({
            ...inputValues,
            mobile_number: data.mobile_number
        });

        setLoader({
            ...loader,
            otp: true
        });

        Axios.post('user/send-otp/', data)
            .then(() => {
                setLoginStatus('sendConfirmCode');
            })
            .catch(() => {})
            .finally(() => {
                setLoader({
                    ...loader,
                    otp: false
                });
            });
    };

    const closeModalHandler = () => {
        reset();
        setLoginStatus('addPhoneNumber');
        setCodeValue();
    };

    const loginHandler = data => {
        setLoader({
            ...loader,
            login: true
        });
        Axios.post('user/login/', {
            mobile_number: inputValues.mobile_number,
            code: data
        })
            .then(res => {
                localStorage.setItem(
                    'AutoPlaningToken',
                    JSON.stringify({
                        token: res.data.token
                    })
                );
                dispatch(loginStatusHandler(true));
                toast.success('ورود شما با موفقیت انجام شد');
                navigate('/dashboard');
            })
            .catch(() => {})
            .finally(() => {
                setLoader({
                    ...loader,
                    login: false
                });
            });
    };

    console.log();

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
                                type='tel'
                                icon={addPhone}
                                detail={{
                                    ...register('mobile_number', {
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
                                error={errors?.mobile_number}
                                placeHolder='---------۰۹'
                            />
                            <FormButton
                                text='ادامه'
                                loading={loader.otp}
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
                                کد یکبار مصرف به شماره {inputValues.mobile_number} پیامک شد؛ لطفا کد ارسال شده را در کادر زیر وارد نمایید.
                            </p>
                            <p className='verificationText'>کد یکبار مصرف</p>
                            <div className='codeInput'>
                                <VerificationInput
                                    value={codeValue}
                                    length={4}
                                    validChars='0-9'
                                    placeholder='-'
                                    onComplete={e => loginHandler(e)}
                                    classNames={{
                                        container: 'container',
                                        character: 'character'
                                    }}
                                />
                            </div>
                            <FormButton
                                text='ثبت'
                                loading={loader.login}
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
