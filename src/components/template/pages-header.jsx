import React from 'react';
import { useSelector } from 'react-redux';

//Assets
import plus from './../../assets/images/pagesHeader/plus.svg';
import filter from './../../assets/images/pagesHeader/Filter.svg';
import { PagesHeaderStyle } from './pages-header.style';

//Components
import FormButton from '../form-groups/form-button';

const PagesHeader = ({ buttonTitle, onButtonClick, hasFilter, onFilterClick, disabled = false }) => {
    const userInfo = useSelector(state => state.User.info);

    return (
        <PagesHeaderStyle>
            <p>
                {userInfo.role === 'SuperAdmin' ? 'سوپر ادمین' : 'ادمین'} ، {userInfo.fullname} ، خوش آمدید !
            </p>
            {userInfo.role !== 'SuperAdmin' && (
                <p>
                    ساعت کاری نمایندگی : {userInfo?.calculate_hours?.hours} ساعت {userInfo?.calculate_hours?.minutes} دقیقه
                </p>
            )}
            {userInfo.role !== 'SuperAdmin' && <p>کد نمایندگی : {userInfo?.company_code}</p>}
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
                <p>{userInfo.company_name}</p>
            )}
        </PagesHeaderStyle>
    );
};

export default PagesHeader;
