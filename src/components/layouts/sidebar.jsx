/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { closeSideBar } from '../../store/reducers/sideBar';
import { useDispatch, useSelector } from 'react-redux';

//Assets
import Bill from './../../assets/images/sideBar/Bill.svg';
import Box from './../../assets/images/sideBar/Box.svg';
import Document from './../../assets/images/sideBar/DocumentAdd.svg';
import arrow from './../../assets/images/sideBar/expand-arrow.png';
import Group from './../../assets/images/sideBar/Group2.svg';
import Home from './../../assets/images/sideBar/HomeSmile.svg';
import Notes from './../../assets/images/sideBar/Notes.svg';
import User from './../../assets/images/sideBar/UserCheck.svg';
import UserId from './../../assets/images/sideBar/UserId.svg';
import Widget from './../../assets/images/sideBar/WidgetAdd.svg';
import Exit from './../../assets/images/sideBar/Exit.svg';
import blocking from './../../assets/images/icons/blocking.svg';
import user from './../../assets/images/icons/User.svg';
import { SidebarStyle } from './sidebar.style';
import Accumulator from './../../assets/images/icons/Accumulator.svg';


//Components
import FormButton from '../form-groups/form-button';
import ConfirmModal from '../template/confirm-modal';

// Tools
import PERMISSION from '../../utils/permission.ts';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

const SideBar = () => {
    const dispatch = useDispatch();
    const userRole = useSelector(state => state.User.info);
    const [confirmModalStatus, setConfirmModalStatus] = useState(false);

    const logoutHandler = () => {
        localStorage.removeItem('AutoPlaningToken');
        localStorage.removeItem('AutoPlanUserInfo');
        window.location.href = '/';
    };

    const permissionHandler = permissionArray => {
        let flag = false;

        permissionArray.forEach(item => {
            if(item.split('.').length > 1){
                if(userRole.permission.includes(PERMISSION[item.split('.')[0]][item.split('.')[1]])){
                    flag = true;
                } 
            }
        });

        return flag;
    };

    return (
        <SidebarStyle>
            <ul>
                {userRole.role !== 'SuperAdmin' && (
                    <>
                        {permissionHandler(['DASHBOARD.LIST']) && (
                            <li>
                                <NavLink to='/dashboard' onClick={() => dispatch(closeSideBar())}>
                                    <div className='item'>
                                        <img src={Home} />
                                        <p>داشبورد</p>
                                    </div>
                                </NavLink>
                            </li>
                        )}
             
                
                        {permissionHandler(['CAPACITY_MEASUREMENT.ADD', 'CAPACITY_MEASUREMENT.EDIT', 'CAPACITY_MEASUREMENT.DELETE']) && (
                            <li>
                                <NavLink to='/qualification' onClick={() => dispatch(closeSideBar())}>
                                    <div className='item'>
                                        <img src={User} />
                                        <p>ظرفیت سنجی</p>
                                    </div>
                                </NavLink>
                            </li>
                        )}


                        {permissionHandler(['VEHICLE_SPECIFICATIONS.ADD_EDIT_VEHICLE_DETAIILS', 'VEHICLE_SPECIFICATIONS.ADD_EDIT_DIAGNOSIS', 'VEHICLE_SPECIFICATIONS.ADD_EDIT_TIME', 'VEHICLE_SPECIFICATIONS.LIST']) && (
                            <li>
                                <NavLink to='/planning' onClick={() => dispatch(closeSideBar())}>
                                    <div className='item'>
                                        <img src={Widget} />
                                        <p>برنامه ریزی تعمیرات</p>
                                    </div>
                                </NavLink>
                            </li>
                        )}              
                 
                        {permissionHandler(['LACK_PARTS.ADD', 'LACK_PARTS.EDIT', 'LACK_PARTS.DELETE']) && (
                            <li>
                                <NavLink to='/deficiency' onClick={() => dispatch(closeSideBar())}>
                                    <div className='item'>
                                        <img src={Box} />
                                        <p>کسری قطعات </p>
                                    </div>
                                </NavLink>
                            </li>
                        )}

                        {permissionHandler(['EQUIPMENT_SHORTAGE.ADD', 'EQUIPMENT_SHORTAGE.EDIT', 'EQUIPMENT_SHORTAGE.DELETE', 'EQUIPMENT_SHORTAGE.LIST']) && (
                            <li>
                                <NavLink to='/equipment' onClick={() => dispatch(closeSideBar())}>
                                    <div className='item'>
                                        <img src={Accumulator} />
                                        <p>کسری تجهیزات</p>
                                    </div>
                                </NavLink>
                            </li>
                        )}
        
                        {permissionHandler(['EXCEL.LIST']) && (
                            <li>
                                <NavLink to='/reporting' onClick={() => dispatch(closeSideBar())}>
                                    <div className='item'>
                                        <img src={Notes} />
                                        <p>گزارش گیری</p>
                                    </div>
                                </NavLink>
                            </li> 
                        )}   

                        {permissionHandler(['CORRECTIVE_ACTION.ADD , CORRECTIVE_ACTION.DELETE', 'CORRECTIVE_ACTION.EDIT']) && (
                            <li>
                                <NavLink to='/corrective' onClick={() => dispatch(closeSideBar())}>
                                    <div className='item'>
                                        <img src={Document} />
                                        <p>اقدام اصلاحی</p>
                                    </div>
                                </NavLink>
                            </li>
                        )}

                        {permissionHandler(['SEAT_CAPACITY.ADD', 'SEAT_CAPACITY.EDIT', 'SEAT_CAPACITY.DELETE', 'SETTING_RECEPTION.ADD', 'SETTING_RECEPTION.EDIT', 'REPRESENTATION_WORKING_TIME.ADD', 'REPRESENTATION_WORKING_TIME.EDIT', 'DEVIATION_REASON.ADD', 'DEVIATION_REASON.EDIT', 'DEVIATION_REASON.DELETE', 'ACCESS_PERSONNEL.ADD , ACCESS_PERSONNEL.DELETE', 'ACCESS_PERSONNEL.EDIT', 'ACCESS_POST.ADD', 'ACCESS_POST.EDIT', 'ACCESS_POST.DELETE']) && (
                            <div className='accordion_wrapper'>
                                <Accordion>
                                    <AccordionSummary expandIcon={ <img className='arrow_icon' src={arrow} />}>
                                        <Typography sx={{marginRight : '10px'}}>تعاریف پایه</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {permissionHandler(['SEAT_CAPACITY.ADD', 'SEAT_CAPACITY.EDIT', 'SEAT_CAPACITY.DELETE']) && (
                                            <li>
                                                <NavLink to='/station' onClick={() => dispatch(closeSideBar())}>
                                                    <div className='item'>
                                                        <img src={blocking} />
                                                        <p>جایگاه</p>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        )}
                                        {permissionHandler(['SETTING_RECEPTION.ADD', 'SETTING_RECEPTION.EDIT', 'REPRESENTATION_WORKING_TIME.ADD', 'REPRESENTATION_WORKING_TIME.EDIT']) && (
                                            <li>
                                                <NavLink to='/setting' onClick={() => dispatch(closeSideBar())}>
                                                    <div className='item'>
                                                        <img src={Group} />
                                                        <p>تنظیمات پذیرش</p>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        )}
                    
                                        {permissionHandler(['DEVIATION_REASON.ADD', 'DEVIATION_REASON.EDIT', 'DEVIATION_REASON.DELETE']) && (
                                            <li>
                                                <NavLink to='/deviation' onClick={() => dispatch(closeSideBar())}>
                                                    <div className='item'>
                                                        <img src={Bill} />
                                                        <p>علت انحرافات</p>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        )}   
                                
                                        {permissionHandler(['ACCESS_PERSONNEL.ADD , ACCESS_PERSONNEL.DELETE', 'ACCESS_PERSONNEL.EDIT', 'ACCESS_POST.ADD', 'ACCESS_POST.EDIT', 'ACCESS_POST.DELETE']) && (
                                            <li>
                                                <NavLink to='/accessibility' onClick={() => dispatch(closeSideBar())}>
                                                    <div className='item'>
                                                        <img src={UserId} />
                                                        <p>اضافه کردن دسترسی</p>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )}
                    </>
                )}
                {userRole.role === 'SuperAdmin' && (
                    <li>
                        <NavLink to='/addAdmin' onClick={() => dispatch(closeSideBar())}>
                            <div className='item'>
                                <img src={user} />
                                <p>افزودن نمایندگی</p>
                            </div>
                        </NavLink>
                    </li>
                )}
            </ul>

            <div className='logout'>
                <FormButton text='خروج' icon={Exit} className='item' justify_content='start' padding='10px 0' onClick={() => setConfirmModalStatus(true)} />
            </div>

            <ConfirmModal
                status={confirmModalStatus}
                setStatus={setConfirmModalStatus}
                title='آیا مطمعن هستید میخواهید از حساب خود خارج شوید ؟ '
                deleteHandler={logoutHandler}
                loading={false}
            />
        </SidebarStyle>
    );
};

export default SideBar;
