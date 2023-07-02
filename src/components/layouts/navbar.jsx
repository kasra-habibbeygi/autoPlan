import React from 'react';
import { Link } from 'react-router-dom';

//Assets
import { NavbarStyle } from './navbar.style';
import logo from '../../assets/images/header/logo.svg';
import loginIcon from '../../assets/images/header/loginIcon.svg';

const Navbar = () => {
    return (
        <NavbarStyle>
            <Link to='/' className='logoHeader'>
                <img src={logo} alt='logo' className='logoStyle'/>
                <h2>اوتوپلن</h2>
            </Link>
            <ul className='menuList'>
                <li>
                    <Link>صفحه اصلی</Link>
                </li>
                <li>
                    <Link>خدمات</Link>
                </li>
                <li>
                    <Link>درباره ما</Link>
                </li>
                <li>
                    <Link>تماس با ما</Link>
                </li>              
            </ul>
            <Link to='/'>
                <div className='login'>
                    <img src={loginIcon} alt='loginIcon'/>
                    <p>ورود به سیستم</p>
                </div>
            </Link>       
        </NavbarStyle>
    );
};

export default Navbar;