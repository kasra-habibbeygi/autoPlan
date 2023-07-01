import React from 'react';

//assets
import { HeaderStyle } from './Header.style';
import logo from '../../assets/images/header/logo.svg';
import loginIcon from '../../assets/images/header/loginIcon.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <HeaderStyle>
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
       
        </HeaderStyle>
    );
};

export default Header;