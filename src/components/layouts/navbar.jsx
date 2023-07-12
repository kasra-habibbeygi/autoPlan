import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openSideBar } from '../../store/reducers/sideBar';

//Assets
import logo from '../../assets/images/header/logo.svg';
import loginIcon from '../../assets/images/header/loginIcon.svg';
import hamburgerMenu from './../../assets/images/header/hamburgerMenu.svg';
import menuIcon from './../../assets/images/sideBar/menuIcon.svg';
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
    const showSideBarIcon = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const dispatch = useDispatch();

    return (
        <>
            <NavbarStyle>
                {isTablet ? (
                    <>
                        <div className='rightItems'>
                            <FormButton icon={menuIcon} onClick={() => dispatch(openSideBar())} />

                            <Link to='/dashboard' className='logoHeader'>
                                <img src={logo} alt='logo' className='logoStyle' />
                                <h2>اوتوپلن</h2>
                            </Link>
                        </div>
                        <FormButton icon={hamburgerMenu} width={'fit-content'} onClick={() => setShowNavbarMenuModal(true)} />
                    </>
                ) : (
                    <>
                        <div className='rightItems'>
                            {showSideBarIcon && <FormButton icon={menuIcon} onClick={() => dispatch(openSideBar())} />}

                            <Link to='/dashboard' className='logoHeader'>
                                <img src={logo} alt='logo' className='logoStyle' />
                                <h2>اوتوپلن</h2>
                            </Link>
                        </div>

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
