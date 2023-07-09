import React from 'react';

//assets
import { SelectWrapper } from './select-input.style';
import plus from './../../assets/images/icons/plus.svg';

//components
import FormButton from '../../components/form-groups/form-button';

const SelectInput = ({ title, icon, onClick, items = [], submitCount }) => {
    return (
        <SelectWrapper error={submitCount > 0 && items.length === 0 ? true : false}>
            {title && <p>{title}</p>}

            <div className='container'>
                <div className='wrapper'>
                    <div className='items'>
                        {items.map(item => (
                            <p key={item.id}>{item.fullText}</p>
                        ))}
                    </div>
                    <img src={icon} />
                </div>
                <div className='plus'>
                    <FormButton icon={plus} type='button' onClick={onClick} variant={'contained'} />
                </div>
            </div>
            {submitCount && items.length <= 0 ? <span className='error'>این فیلد اجباری است</span> : null}
        </SelectWrapper>
    );
};

export default SelectInput;
