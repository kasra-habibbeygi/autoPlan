import React, { useRef } from 'react';

//Assets

//Components
import { InputWrapper } from './input-component.style';

const InputComponent = ({ title, icon, type, detail, error }) => {
    const inputRef = useRef();
    console.log(error);

    return (
        <InputWrapper>
            {title && <p>{title}</p>}

            <div className='container'>
                <input type={type} ref={inputRef} {...detail} />
                <img src={icon} onClick={() => inputRef?.current?.focus()} />
            </div>
            {error && <span className='error'>{error?.message}</span>}
        </InputWrapper>
    );
};

export default InputComponent;
