import React from 'react';

//Assets
import plus from './../../assets/images/pagesHeader/plus.svg';
import { PagesHeaderStyle } from './pages-header.style';

//components
import FormButton from '../form-groups/form-button';

const today = new Date();
const date = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();

const PagesHeader = ({
    buttonTitle,
    onButtonClick,
    adminName = 'نیاز شکوری',
    secondFiled = `تاریخ امروز : ${date}/${month}/${year}`,
    representationCode = 123475
}) => {
    return (
        <PagesHeaderStyle>
            <p>ادمین اصلی ، {adminName} ، خوش آمدید !</p>
            <p>{secondFiled}</p>
            <p>کد نمایندگی : {representationCode}</p>

            {onButtonClick ? (
                <FormButton onClick={onButtonClick} className='addButton' text={buttonTitle} icon={plus} />
            ) : (
                <p>{buttonTitle}</p>
            )}
        </PagesHeaderStyle>
    );
};

export default PagesHeader;
