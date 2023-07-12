import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Drawer, useMediaQuery, useTheme } from '@mui/material';

//Assets
import logo from '../../assets/images/header/logo.svg';
import loginIcon from '../../assets/images/header/loginIcon.svg';
import hamburgerMenu from './../../assets/images/header/hamburgerMenu.svg';
import { NavbarStyle } from './navbar.style';

//Components
import Login from '../../pages/login/login';
import FormButton from '../../components/form-groups/form-button';
import MobileNavbar from './mobile-navbar';

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showNavbarMenuModal, setShowNavbarMenuModal] = useState(false);
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <NavbarStyle>
                {isTablet ? (
                    <>
                        <Link to='/dashboard' className='logoHeader'>
                            <img src={logo} alt='logo' className='logoStyle' />
                            <h2>اوتوپلن</h2>
                        </Link>
                        <FormButton icon={hamburgerMenu} width={'fit-content'} onClick={() => setShowNavbarMenuModal(true)} />
                    </>
                ) : (
                    <>
                        <Link to='/dashboard' className='logoHeader'>
                            <img src={logo} alt='logo' className='logoStyle' />
                            <h2>اوتوپلن</h2>
                        </Link>
                        <ul className='menuList'>
                            <li>
                                <NavLink to='/dashboard'>صفحه اصلی</NavLink>
                            </li>
                            <li>
                                <a href='/#services'>خدمات</a>
                            </li>
                            <li>
                                <a href='/#about'>درباره ما</a>
                            </li>
                            <li>
                                <a href='/#contact'>تماس با ما</a>
                            </li>
                        </ul>
                        <FormButton
                            text='ورود به سیستم'
                            icon={loginIcon}
                            loading={false}
                            width={'fit-content'}
                            className='login'
                            onClick={() => setShowLoginModal(true)}
                        />
                    </>
                )}
            </NavbarStyle>
            <Login showModal={showLoginModal} setShowModal={setShowLoginModal} />
            <Drawer anchor='left' open={showNavbarMenuModal} onClose={() => setShowNavbarMenuModal(false)}>
                <MobileNavbar setShowNavbarMenuModal={setShowNavbarMenuModal} setShowLoginModal={setShowLoginModal} />
            </Drawer>
        </>
    );
};

export default Navbar;
