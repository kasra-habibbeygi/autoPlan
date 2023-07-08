import React, { useRef } from 'react';

//Assets
import { InputWrapper } from './input-component.style';

const InputComponent = ({ title, icon, type, detail, error, placeHolder }) => {
    const inputRef = useRef();

    return (
        <InputWrapper error={error}>
            {title && <p>{title}</p>}

            <div className='container'>
                <input type={type} ref={inputRef} {...detail} placeholder={placeHolder} />
                <img src={icon} onClick={() => inputRef?.current?.focus()} />
            </div>
            {error && <span className='error'>{error?.message}</span>}
        </InputWrapper>
    );
};

export default InputComponent;
