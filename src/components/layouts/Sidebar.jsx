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
import { SidebarStyle } from './sidebar.style';

//Components
import FormButton from '../form-groups/form-button';
import { useDispatch } from 'react-redux';
import { closeSideBar } from '../../store/reducers/sideBar';

const SideBar = () => {
    const dispatch = useDispatch();
    return (
        <SidebarStyle>
            <ul>
                <li>
                    <NavLink to='/dashboard' onClick={() => dispatch(closeSideBar())}>
                        <div className='item'>
                            <img src={Home} alt='' />
                            <p>صفحه اصلی</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/qualification' onClick={() => dispatch(closeSideBar())}>
                        <div className='item'>
                            <img src={User} alt='' />
                            <p>ظرفیت سنجی</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/deficiency' onClick={() => dispatch(closeSideBar())}>
                        <div className='item'>
                            <img src={Box} alt='' />
                            <p>کسری قطعات انبار</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/planning' onClick={() => dispatch(closeSideBar())}>
                        <div className='item'>
                            <img src={Widget} alt='' />
                            <p>برنامه ریزی تعمیرات</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/deviation' onClick={() => dispatch(closeSideBar())}>
                        <div className='item'>
                            <img src={Bill} alt='' />
                            <p>علت انحرافات</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/reporting' onClick={() => dispatch(closeSideBar())}>
                        <div className='item'>
                            <img src={Notes} alt='' />
                            <p>گزارش گیری</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/corrective' onClick={() => dispatch(closeSideBar())}>
                        <div className='item'>
                            <img src={Document} alt='' />
                            <p>اقدام اصلاحی</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/accessibility' onClick={() => dispatch(closeSideBar())}>
                        <div className='item'>
                            <img src={UserId} alt='' />
                            <p>دسترسی پنل</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/setting' onClick={() => dispatch(closeSideBar())}>
                        <div className='item'>
                            <img src={Group} alt='' />
                            <p>تنظیمات سایت</p>
                        </div>
                    </NavLink>
                </li>
            </ul>

            <div className='logout'>
                <FormButton text='خروج' icon={Exit} width='fit-content' className='item' />
            </div>
        </SidebarStyle>
    );
};

export default SideBar;
