import React from 'react';
import { ShowAllStyle } from './show-all.style';
import { Grid } from '@mui/material';

const ShowAll = ({ setStep, setAllDetail, allDetail }) => {
    return (
        <ShowAllStyle>
            <h2>اقدام اصلاحی</h2>

            <Grid container sx={{ marginTop: '50px' }} spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className='container'>
                        <div className='item'>
                            <p className='title'>1. تاریخ صدور اقدام اصلاحی</p>
                            <p className='text'>
                                <span>{allDetail?.execute_date?.started_time}</span>
                                <span>{allDetail?.execute_date?.finished_time}</span>
                            </p>
                        </div>
                        <div className='item'>
                            <p className='title'>2. عدم انطباق</p>
                            <p className='text'>{allDetail?.problem}</p>
                        </div>
                        <div className='item'>
                            <p className='title'>3. ریشه یابی</p>
                            <p className='questions'>
                                <span className='quest'>چرا 1 :</span>
                                <span className='answer'>چرا فلان اتفاق رخ داده است ؟</span>
                            </p>
                            <p className='questions'>
                                <span className='quest'>چرا 2 :</span>
                                <span className='answer'>چرا فلان اتفاق رخ داده است ؟</span>
                            </p>
                            <p className='questions'>
                                <span className='quest'>چرا 3 :</span>
                                <span className='answer'>چرا فلان اتفاق رخ داده است ؟</span>
                            </p>
                            <p className='questions'>
                                <span className='quest'>چرا 4 :</span>
                                <span className='answer'>چرا فلان اتفاق رخ داده است ؟</span>
                            </p>
                            <p className='questions'>
                                <span className='quest'>چرا 5 :</span>
                                <span className='answer'>چرا فلان اتفاق رخ داده است ؟</span>
                            </p>
                        </div>
                        <div className='item'>
                            <p className='title'>4. اقدام یا اقدامات اصلاحی</p>
                            {allDetail?.actions?.map((item, index) => (
                                <p className='questions' key={item.action}>
                                    <span className='quest'>اقدام اصلاحی {index + 1} :</span>
                                    <span className='answer'>{item.action}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='container'>
                        <div className='item'>
                            <p className='title'>5. مسئول اقدامات اصلاحی</p>
                            {allDetail?.actionPerson?.map((person, index) => {
                                const foundedKey = `correction_${index + 1}`;
                                return (
                                    <p className='questions' key={`${person[foundedKey]}${index}`}>
                                        <span className='quest'>مسئول اقدام اصلاحی {index + 1} :</span>
                                        <span className='answer'>{person[foundedKey]}</span>
                                    </p>
                                );
                            })}
                        </div>

                        <div className='item'>
                            <p className='title'>6. تاریخ اجرا</p>
                            <p className='text'>
                                <span>{allDetail?.execute_date?.started_time}</span>
                                <span>{allDetail?.execute_date?.finished_time}</span>
                            </p>
                        </div>

                        <div className='item'>
                            <p className='title'>7. نتیجه</p>
                            <p className='text'>{allDetail?.action_result}</p>
                        </div>
                        <div className='item'>
                            <p className='title'>8. تاریخ کنترل اثر بخشی </p>
                            <p className='text'>{allDetail?.effective_detail?.effective_date}</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </ShowAllStyle>
    );
};

export default ShowAll;
