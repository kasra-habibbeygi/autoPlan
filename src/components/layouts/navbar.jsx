import React from 'react';
import { Link, NavLink } from 'react-router-dom';

//Assets
import { NavbarStyle } from './navbar.style';
import logo from '../../assets/images/header/logo.svg';
import loginIcon from '../../assets/images/header/loginIcon.svg';
import Button from './../form-groups/button';

const Navbar = () => {
    return (
        <NavbarStyle>
            <Link to='/' className='logoHeader'>
                <img src={logo} alt='logo' className='logoStyle' />
                <h2>اوتوپلن</h2>
            </Link>
            <ul className='menuList'>
                <li>
                    <NavLink to='/'>صفحه اصلی</NavLink>
                </li>

                <li>
                    <NavLink to='/some'>خدمات</NavLink>
                </li>
                <li>
                    <NavLink to='/some'>درباره ما</NavLink>
                </li>
                <li>
                    <NavLink to='/some'>تماس با ما</NavLink>
                </li>
            </ul>
            <Link to='/'>
                <Button className='login'>
                    <img src={loginIcon} alt='loginIcon' />
                    <p>ورود به سیستم</p>
                </Button>
            </Link>
        </NavbarStyle>
    );
};

export default Navbar;
