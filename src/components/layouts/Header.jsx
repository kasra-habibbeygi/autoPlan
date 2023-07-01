import React from 'react';

//assets
import { HeaderStyle } from './Header.style';
import logo from '../../assets/images/logo.png';

const Header = () => {
    return (
        <HeaderStyle>
            <div className='logoHeader'>
                <img src={logo} alt='logo' className='logoStyle'/>
                <h2>اوتوپلن</h2>
            </div>
        </HeaderStyle>
    );
};

export default Header;