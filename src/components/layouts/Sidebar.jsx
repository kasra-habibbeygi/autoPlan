import React from 'react';
import { NavLink } from 'react-router-dom';

//Assets
import Bill from './../../assets/images/sideBar/Bill.svg';
import Box from './../../assets/images/sideBar/Box.svg';
import Document from './../../assets/images/sideBar/DocumentAdd.svg';
import Group from './../../assets/images/sideBar/Group2.svg';
import Home from './../../assets/images/sideBar/HomeSmile.svg';
import Notes from './../../assets/images/sideBar/Notes.svg';
import User from './../../assets/images/sideBar/UserCheck.svg';
import UserId from './../../assets/images/sideBar/UserId.svg';
import Widget from './../../assets/images/sideBar/WidgetAdd.svg';
import Exit from './../../assets/images/sideBar/Exit.svg';

//Components
import { SidebarStyle } from './sidebar.style';
import Button from './../form-groups/button';

const SideBar = () => {
    return (
        <SidebarStyle>
            <ul>
                <li>
                    <NavLink to='/home'>
                        <div className='item'>
                            <img src={Home} alt='' />
                            <p>صفحه اصلی</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/qualification'>
                        <div className='item'>
                            <img src={User} alt='' />
                            <p>ظرفیت سنجی</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/deficiency'>
                        <div className='item'>
                            <img src={Box} alt='' />
                            <p>کسری قطعات انبار</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/planning'>
                        <div className='item'>
                            <img src={Widget} alt='' />
                            <p>برنامه ریزی تعمیرات</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/deviation'>
                        <div className='item'>
                            <img src={Bill} alt='' />
                            <p>علت انحرافات</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/reporting'>
                        <div className='item'>
                            <img src={Notes} alt='' />
                            <p>گزارش گیری</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/corrective'>
                        <div className='item'>
                            <img src={Document} alt='' />
                            <p>اقدام اصلاحی</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/accessibility'>
                        <div className='item'>
                            <img src={UserId} alt='' />
                            <p>دسترسی پنل</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/setting'>
                        <div className='item'>
                            <img src={Group} alt='' />
                            <p>تنظیمات سایت</p>
                        </div>
                    </NavLink>
                </li>
            </ul>

            <div className='logout'>
                <Button className='item'>
                    <img src={Exit} alt='' />
                    <p>خروج</p>
                </Button>
            </div>
        </SidebarStyle>
    );
};

export default SideBar;
