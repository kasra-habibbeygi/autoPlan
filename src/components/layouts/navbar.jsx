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
            <Link to='/' className='logoHeader'>
                <img src={logo} alt='logo' className='logoStyle' />
                <h2>اوتوپلن</h2>
            </Link>
            <ul className='menuList'>
                <li>
                    <NavLink to='/home'>صفحه اصلی</NavLink>
                </li>

                <li>
                    <NavLink to='/'>خدمات</NavLink>
                </li>
                <li>
                    <NavLink to='/'>درباره ما</NavLink>
                </li>
                <li>
                    <NavLink to='/'>تماس با ما</NavLink>
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
