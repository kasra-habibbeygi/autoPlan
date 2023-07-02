/* eslint-disable react/prop-types */
import React from 'react';
import { PulseLoader } from 'react-spinners';

// Assets
import { ButtonField } from './button.style';

const Button = ({
    children,
    loaderStatus = false,
    borderType = 'noraml_border',
    type = 'normal',
    onClick,
    className = '',
    disabled = false
}) => {
    return (
        <ButtonField className={`${borderType} ${type} ${className}`} onClick={() => onClick && onClick()} disabled={disabled}>
            <PulseLoader loading={loaderStatus} color='#ffffff' size={10} />
            {!loaderStatus && children}
        </ButtonField>
    );
};

export default Button;
