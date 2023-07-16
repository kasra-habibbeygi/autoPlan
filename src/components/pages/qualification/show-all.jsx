import React from 'react';

//Assets
import { ShowWrapper } from './show-all.style';

//Components
import FormButton from '../../form-groups/form-button';

const ShowAll = ({ details, date }) => {
    const realDate = new Date(date);

    const dateString = realDate.toLocaleDateString('fa-IR');

    return (
        <ShowWrapper>
            <div className='wrapper'>
                <p className='header'>تاریخ : </p>
                <div className='item'>
                    <p>{dateString}</p>
                </div>
            </div>
            <div className='wrapper'>
                <p className='header'>جلوبندی : </p>
                <div className='item'>
                    {details.blockingList.map(item => (
                        <p key={item.id}>{item.fullText}</p>
                    ))}
                </div>
            </div>
            <div className='wrapper'>
                <p className='header'>مکانیک : </p>
                <div className='item'>
                    {details.mechanicList.map(item => (
                        <p key={item.id}>{item.fullText}</p>
                    ))}
                </div>
            </div>
            <div className='wrapper'>
                <p className='header'>برق کار : </p>
                <div className='item'>
                    {details.electricList.map(item => (
                        <p key={item.id}>{item.fullText}</p>
                    ))}
                </div>
            </div>
            <div className='wrapper'>
                <p className='header'>گاز کار : </p>
                <div className='item'>
                    {details.gasList.map(item => (
                        <p key={item.id}>{item.fullText}</p>
                    ))}
                </div>
            </div>

            <FormButton text='ثبت' type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
        </ShowWrapper>
    );
};

export default ShowAll;
