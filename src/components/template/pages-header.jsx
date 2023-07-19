import React from 'react';

//Assets
import plus from './../../assets/images/pagesHeader/plus.svg';
import filter from './../../assets/images/pagesHeader/Filter.svg';
import { PagesHeaderStyle } from './pages-header.style';

//components
import FormButton from '../form-groups/form-button';
import tools from '../../utils/tools';

const today = new Date();

const PagesHeader = ({
    buttonTitle,
    onButtonClick,
    adminName = 'نیاز شکوری',
    secondFiled = `تاریخ امروز : ${tools.changeDateToJalali(today, false)}`,
    representationCode = 123475,
    hasFilter,
    onFilterClick,
    disabled = false
}) => {
    return (
        <PagesHeaderStyle>
            <p>ادمین اصلی ، {adminName} ، خوش آمدید !</p>
            <p>{secondFiled}</p>
            <p>کد نمایندگی : {representationCode}</p>
            {hasFilter ? <FormButton onClick={onFilterClick} className='filterButton' icon={filter} /> : null}

            {onButtonClick ? (
                <FormButton
                    onClick={onButtonClick}
                    className='addButton'
                    text={buttonTitle}
                    icon={plus}
                    width={'fit-content'}
                    disabled={disabled}
                />
            ) : (
                <p>{buttonTitle}</p>
            )}
        </PagesHeaderStyle>
    );
};

export default PagesHeader;
