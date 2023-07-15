import React from 'react';
import { NavLink } from 'react-router-dom';

//Assets
import { MobileWrapper } from './mobile-navbar.style';
import closeIcon from './../../assets/images/icons/iconClose.svg';
import loginIcon from '../../assets/images/header/loginIcon.svg';

//Components
import FormButton from '../form-groups/form-button';

const MobileNavbar = ({ setShowNavbarMenuModal, setShowLoginModal }) => {
    return (
        <MobileWrapper>
            <div className='header'>
                <FormButton icon={closeIcon} onClick={() => setShowNavbarMenuModal(false)} width={'fit-content'} />
            </div>

            <ul className='menuList'>
                <li>
                    <NavLink to='/dashboard' onClick={() => setShowNavbarMenuModal(false)}>
                        صفحه اصلی
                    </NavLink>
                </li>
                <li>
                    <a href='/#services' onClick={() => setShowNavbarMenuModal(false)}>
                        خدمات
                    </a>
                </li>
                <li>
                    <a href='/#about' onClick={() => setShowNavbarMenuModal(false)}>
                        درباره ما
                    </a>
                </li>
                <li>
                    <a href='/#contact' onClick={() => setShowNavbarMenuModal(false)}>
                        تماس با ما
                    </a>
                </li>
                <li>
                    <FormButton
                        text='ورود به سیستم'
                        icon={loginIcon}
                        loading={false}
                        width={'fit-content'}
                        className='login'
                        onClick={() => setShowLoginModal(true)}
                    />
                </li>
            </ul>
        </MobileWrapper>
    );
};

export default MobileNavbar;
