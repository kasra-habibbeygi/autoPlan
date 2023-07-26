import React from 'react';
import { Grid } from '@mui/material';

//Assets
import { ShowAllStyle } from './show-all.style';
import tools from '../../../utils/tools';

const ShowAll = ({ chosenEditItemDetails, today }) => {
    const finishedDate = chosenEditItemDetails?.end_time.replaceAll('-', '/');
    const isTime = finishedDate === today;

    console.log(chosenEditItemDetails);

    return (
        <ShowAllStyle>
            <h2>اقدام اصلاحی</h2>

            <Grid container sx={{ marginTop: '50px' }} spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className='container'>
                        <div className='item'>
                            <p className='title'>1. تاریخ صدور اقدام اصلاحی</p>
                            <p className='text'>
                                <span>{chosenEditItemDetails?.create_at}</span>
                            </p>
                        </div>
                        <div className='item'>
                            <p className='title'>2. عدم انطباق</p>
                            <p className='text'>{chosenEditItemDetails?.problem}</p>
                        </div>
                        <div className='item'>
                            <p className='title'>3. ریشه یابی</p>
                            <div className='questions'>
                                <span className='quest'>چرا 1 :</span>
                                <div className='answers_wrapper'>
                                    {chosenEditItemDetails?.whys.map(
                                        item =>
                                            item.type === 'why1' && (
                                                <span className='answer' key={item.id}>
                                                    {item.title}
                                                </span>
                                            )
                                    )}
                                </div>
                            </div>
                            <div className='questions'>
                                <span className='quest'>چرا 2 :</span>
                                <div className='answers_wrapper'>
                                    {chosenEditItemDetails?.whys.map(
                                        item =>
                                            item.type === 'why2' && (
                                                <span className='answer' key={item.id}>
                                                    {item.title}
                                                </span>
                                            )
                                    )}
                                </div>
                            </div>
                            <div className='questions'>
                                <span className='quest'>چرا 3 :</span>
                                <div className='answers_wrapper'>
                                    {chosenEditItemDetails?.whys.map(
                                        item =>
                                            item.type === 'why3' && (
                                                <span className='answer' key={item.id}>
                                                    {item.title}
                                                </span>
                                            )
                                    )}
                                </div>
                            </div>
                            <div className='questions'>
                                <span className='quest'>چرا 4 :</span>
                                <div className='answers_wrapper'>
                                    {chosenEditItemDetails?.whys.map(
                                        item =>
                                            item.type === 'why4' && (
                                                <span className='answer' key={item.id}>
                                                    {item.title}
                                                </span>
                                            )
                                    )}
                                </div>
                            </div>
                            <div className='questions'>
                                <span className='quest'>چرا 5 :</span>
                                <div className='answers_wrapper'>
                                    {chosenEditItemDetails?.whys.map(
                                        item =>
                                            item.type === 'why5' && (
                                                <span className='answer' key={item.id}>
                                                    {item.title}
                                                </span>
                                            )
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='item'>
                            <p className='title'>4. اقدام یا اقدامات اصلاحی</p>
                            {chosenEditItemDetails?.action?.map((item, index) => (
                                <p className='questions' key={item.id}>
                                    <span className='quest'>اقدام اصلاحی {index + 1} :</span>
                                    <span className='answer'>{item.title}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='container'>
                        <div className='item'>
                            <p className='title'>5. مسئول اقدامات اصلاحی</p>
                            {chosenEditItemDetails?.action_officials_info?.map((person, index) => (
                                <p className='questions' key={person.id}>
                                    <span className='quest'>مسئول اقدام اصلاحی {index + 1} :</span>
                                    <span className='answer'>{person.fullname}</span>
                                </p>
                            ))}
                        </div>

                        <div className='item'>
                            <p className='title'>6. تاریخ اجرا</p>
                            <p className='text'>
                                <span>{chosenEditItemDetails?.start_time}</span>
                                <span>الی</span>
                                <span>{chosenEditItemDetails?.end_time}</span>
                            </p>
                        </div>
                        {isTime && (
                            <>
                                <div className='item'>
                                    <p className='title'>7. نتیجه</p>
                                    <p className='text'>{chosenEditItemDetails?.result}</p>
                                </div>
                                <div className='item'>
                                    <p className='title'>8. تاریخ کنترل اثر بخشی </p>
                                    <p className='text'>
                                        {chosenEditItemDetails?.control_completion_date &&
                                            tools.changeDateToJalali(chosenEditItemDetails?.control_completion_date, false)}
                                    </p>
                                </div>
                                <div className='item'>
                                    <p className='title'>9. مسئول کنترل اثر بخشی </p>
                                    <p className='text'>{chosenEditItemDetails?.controller?.fullname}</p>
                                </div>
                                <div className='item'>
                                    <p className='title'>10. نتیجه کنترل اثر بخشی </p>
                                    <p className='text'>{chosenEditItemDetails?.control_result}</p>
                                </div>
                            </>
                        )}
                    </div>
                </Grid>
            </Grid>
        </ShowAllStyle>
    );
};

export default ShowAll;
