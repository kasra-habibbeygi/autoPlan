import React from 'react';

//Assets
import plus from './../../assets/images/pagesHeader/plus.svg';

//Components
import { PagesHeaderStyle } from './pages-header.style';
import Button from '../form-groups/button';

const PagesHeader = () => {
    return (
        <PagesHeaderStyle>
            <p>ادمین اصلی ، نیاز شکوری ، خوش آمدید !</p>
            <p>ساعت کاری مجموعه : ۸ ساعت</p>
            <p>کد نمایندگی : ۱۸۴۷۴۶</p>
            <Button className='addButton'>
                <p>ثبت ظرفیت سنجی جدید</p>
                <img src={plus} alt='' />
            </Button>
        </PagesHeaderStyle>
    );
};

export default PagesHeader;
