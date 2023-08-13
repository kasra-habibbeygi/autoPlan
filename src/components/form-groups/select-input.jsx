import React from 'react';

//assets
import { SelectWrapper } from './select-input.style';
import plus from './../../assets/images/icons/plus.svg';
import closeIcon from './../../assets/images/global/closeIcon.svg';

//components
import FormButton from '../../components/form-groups/form-button';

const SelectInput = ({ title, icon, onClick, items = [], submitCount, setDetails, placeHolder, shouldValidate = true, deleteHandler }) => {
    const deleteItemHandler = data => {
        setDetails(prevDetails => {
            const updatedDetails = { ...prevDetails };

            Object.keys(updatedDetails).forEach(key => {
                updatedDetails[key] = updatedDetails[key].filter(item => item !== data);
            });

            return updatedDetails;
        });
    };

    return (
        <SelectWrapper error={shouldValidate && submitCount > 0 && items.length === 0 ? true : false}>
            {title && <p>{title}</p>}

            <div className='container'>
                <div className='wrapper'>
                    <div className='items'>
                        {items.length ? (
                            items.map(item => (
                                <p key={item.id}>
                                    {item.fullText}
                                    <img
                                        src={closeIcon}
                                        className='close_icon'
                                        onClick={() => (deleteHandler ? deleteHandler(item) : deleteItemHandler(item))}
                                    />
                                </p>
                            ))
                        ) : (
                            <span>{placeHolder}</span>
                        )}
                    </div>
                    <img src={icon} />
                </div>
                <div className='plus'>
                    <FormButton icon={plus} type='button' onClick={onClick} variant={'contained'} />
                </div>
            </div>
            {shouldValidate && submitCount && items.length <= 0 ? <span className='error'>این فیلد اجباری است</span> : null}
        </SelectWrapper>
    );
};

export default SelectInput;
