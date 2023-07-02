import React from 'react';
import { NavLink } from 'react-router-dom';

//Assets
import { SidebarStyle } from './sidebar.style';
import Bill from './../../assets/images/sideBar/Bill.svg';
import Box from './../../assets/images/sideBar/Box.svg';
import Document from './../../assets/images/sideBar/Document Add.svg';
import Group from './../../assets/images/sideBar/Group 2.svg';
import Home from './../../assets/images/sideBar/Home Smile.svg';
import Notes from './../../assets/images/sideBar/Notes.svg';
import User from './../../assets/images/sideBar/User Check.svg';
import UserId from './../../assets/images/sideBar/User Id.svg';
import Widget from './../../assets/images/sideBar/Widget Add.svg';
import Exit from './../../assets/images/sideBar/Exit.svg';

const SideBar = () => {
    return (
        <SidebarStyle>
            <ul>
                <li>
                    <NavLink to='/'>
                        <div className='item'>
                            <img src={Home} alt='' />
                            <p>صفحه اصلی</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/some'>
                        <div className='item'>
                            <img src={User} alt='' />
                            <p>ظرفیت سنجی</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/some'>
                        <div className='item'>
                            <img src={Box} alt='' />
                            <p>کسری قطعات انبار</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/some'>
                        <div className='item'>
                            <img src={Widget} alt='' />
                            <p>برنامه ریزی تعمیرات</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/some'>
                        <div className='item'>
                            <img src={Bill} alt='' />
                            <p>علت انحرافات</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/some'>
                        <div className='item'>
                            <img src={Notes} alt='' />
                            <p>گزارش گیری</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/some'>
                        <div className='item'>
                            <img src={Document} alt='' />
                            <p>اقدام اصلاحی</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/some'>
                        <div className='item'>
                            <img src={UserId} alt='' />
                            <p>دسترسی پنل</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/some'>
                        <div className='item'>
                            <img src={Group} alt='' />
                            <p>تنظیمات سایت</p>
                        </div>
                    </NavLink>
                </li>
            </ul>

            <div className='logout'>
                <button className='item'>
                    <img src={Exit} alt='' />
                    <p>خروج</p>
                </button>
            </div>
        </SidebarStyle>
    );
};

export default SideBar;
