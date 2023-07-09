import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

//Assets
import logo from '../../assets/images/header/logo.svg';
import loginIcon from '../../assets/images/header/loginIcon.svg';
import { NavbarStyle } from './navbar.style';

//Components
import Login from '../../pages/login/login';
import FormButton from '../form-button/form-button';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <NavbarStyle>
                <Link to='/home' className='logoHeader'>
                    <img src={logo} alt='logo' className='logoStyle' />
                    <h2>اوتوپلن</h2>
                </Link>
                <ul className='menuList'>
                    <li>
                        <NavLink to='/home'>صفحه اصلی</NavLink>
                    </li>

                    <li>
                        <a href='#services'>خدمات</a>
                    </li>
                    <li>
                        <a href='#about'>درباره ما</a>
                    </li>
                    <li>
                        <a href='#contact'>تماس با ما</a>
                    </li>
                </ul>

                <FormButton
                    text='ورود به سیستم'
                    icon={loginIcon}
                    loading={false}
                    width={'fit-content'}
                    className='login'
                    onClick={() => setShowModal(true)}
                />
            </NavbarStyle>
            <Login showModal={showModal} setShowModal={setShowModal} />
        </>
    );
};

export default Navbar;
