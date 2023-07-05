import React from 'react';
import { Link, NavLink } from 'react-router-dom';

//Assets
import logo from '../../assets/images/header/logo.svg';
import loginIcon from '../../assets/images/header/loginIcon.svg';

//Components
import { NavbarStyle } from './navbar.style';
import Button from './../form-groups/button';

const Navbar = () => {
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
            <Button className='login'>
                <img src={loginIcon} alt='loginIcon' />
                <p>ورود به سیستم</p>
            </Button>
        </NavbarStyle>
    );
};

export default Navbar;
