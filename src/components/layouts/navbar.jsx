import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

//Assets
import logo from '../../assets/images/header/logo.svg';
import loginIcon from '../../assets/images/header/loginIcon.svg';
import { NavbarStyle } from './navbar.style';

//Components
import Login from '../../pages/login/login';
import FormButton from '../../components/form-groups/form-button';

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
                        <Link href='/#services'>خدمات</Link>
                    </li>
                    <li>
                        <Link href='/#about'>درباره ما</Link>
                    </li>
                    <li>
                        <Link href='/#contact'>تماس با ما</Link>
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
