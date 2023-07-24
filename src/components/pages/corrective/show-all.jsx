import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

//Assets
import { ShowAllStyle } from './show-all.style';
import tools from '../../../utils/tools';

const ShowAll = ({ chosenEditItemDetails, today }) => {
    const [actions, setActions] = useState();
    const [agents, setAgents] = useState();
    const [questions, setQuestions] = useState();

    const finishedDate = tools.changeDateToJalali(chosenEditItemDetails?.end_action_date, false);
    const isTime = finishedDate === today;

    useEffect(() => {
        if (chosenEditItemDetails) {
            if (chosenEditItemDetails?.action) {
                const actionsArray = JSON.parse(chosenEditItemDetails?.action)?.map(obj => {
                    const newObj = {};
                    Object.entries(obj).forEach(([k, v]) => {
                        newObj[k] = JSON.parse(`"${v}"`);
                    });
                    return newObj;
                });
                setActions(actionsArray);
            }

            if (chosenEditItemDetails?.action_agent) {
                const obj = JSON.parse(chosenEditItemDetails?.action_agent);
                const agentValues = Object.entries(obj)?.map(([key, value]) => ({ [key]: value }));

                setAgents(agentValues);
            }

            if (chosenEditItemDetails?.troubleshooting) {
                const questionsArray = eval(chosenEditItemDetails?.troubleshooting.replace(/'/g, '"'));
                setQuestions(questionsArray);
            }
        }
    }, [chosenEditItemDetails]);

    return (
        <ShowAllStyle>
            <h2>اقدام اصلاحی</h2>

            <Grid container sx={{ marginTop: '50px' }} spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className='container'>
                        <div className='item'>
                            <p className='title'>1. تاریخ صدور اقدام اصلاحی</p>
                            <p className='text'>
                                <span>{tools.changeDateToJalali(chosenEditItemDetails?.date_created, false)}</span>
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
                                    {questions?.[0].map((item, index) => (
                                        <span className='answer' key={`0${item}_${index}`}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='questions'>
                                <span className='quest'>چرا 2 :</span>
                                <div className='answers_wrapper'>
                                    {questions?.[1].map((item, index) => (
                                        <span className='answer' key={`${item}_${index}`}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='questions'>
                                <span className='quest'>چرا 3 :</span>
                                <div className='answers_wrapper'>
                                    {questions?.[2].map((item, index) => (
                                        <span className='answer' key={`${item}_${index}`}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='questions'>
                                <span className='quest'>چرا 4 :</span>
                                <div className='answers_wrapper'>
                                    {questions?.[3].map((item, index) => (
                                        <span className='answer' key={`${item}_${index}`}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='questions'>
                                <span className='quest'>چرا 5 :</span>
                                <div className='answers_wrapper'>
                                    {questions?.[4].map((item, index) => (
                                        <span className='answer' key={`${item}_${index}`}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='item'>
                            <p className='title'>4. اقدام یا اقدامات اصلاحی</p>
                            {actions?.map((item, index) => (
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
                            {agents?.map((person, index) => {
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
                                <span>{tools.changeDateToJalali(chosenEditItemDetails?.start_action_date, false)}</span>
                                <span>{tools.changeDateToJalali(chosenEditItemDetails?.end_action_date, false)}</span>
                            </p>
                        </div>
                        {isTime && (
                            <>
                                <div className='item'>
                                    <p className='title'>7. نتیجه</p>
                                    <p className='text'>{chosenEditItemDetails?.action_result}</p>
                                </div>
                                <div className='item'>
                                    <p className='title'>8. تاریخ کنترل اثر بخشی </p>
                                    <p className='text'>
                                        {chosenEditItemDetails?.effective_control_date &&
                                            tools.changeDateToJalali(chosenEditItemDetails?.effective_control_date, false)}
                                    </p>
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
