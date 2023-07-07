import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

//Assets
import logo from '../../assets/images/header/logo.svg';
import loginIcon from '../../assets/images/header/loginIcon.svg';
import { NavbarStyle } from './navbar.style';

//Components
import Button from './../form-groups/button';
import Login from '../../pages/login/login';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    return (
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
            <Button className='login' onClick={() => setShowModal(true)}>
                <img src={loginIcon} alt='loginIcon' />
                <p>ورود به سیستم</p>
            </Button>
            <Login showModal={showModal} setShowModal={setShowModal} />
        </NavbarStyle>
    );
};

export default Navbar;
