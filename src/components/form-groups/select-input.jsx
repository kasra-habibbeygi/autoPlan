import React from 'react';
import { SelectWrapper } from './select-input.style';
import plus from './../../assets/images/icons/plus.svg';
import FormButton from '../form-button/form-button';

const SelectInput = ({ title, icon, onClick, items = [] }) => {
    return (
        <SelectWrapper>
            {title && <p>{title}</p>}

            <div className='container'>
                <div className='wrapper'>
                    <div className='items'>
                        {items.map(item => (
                            <p key={item.id}>{item.title}</p>
                        ))}
                    </div>
                    <img src={icon} />
                </div>
                <div className='plus'>
                    <FormButton icon={plus} type='button' onClick={onClick} variant={'contained'} />
                </div>
            </div>
            {/* {error && <span className='error'>{error?.message}</span>} */}
        </SelectWrapper>
    );
};

export default SelectInput;
