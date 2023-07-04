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
            <Button className='login'>
                <img src={loginIcon} alt='loginIcon' />
                <p>ورود به سیستم</p>
            </Button>
        </NavbarStyle>
    );
};

export default Navbar;
