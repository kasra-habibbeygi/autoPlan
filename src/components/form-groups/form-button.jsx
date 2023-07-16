import React from 'react';

//Assets
import { FormButtonWrapper } from './form-button.style';

const FormButton = ({
    text,
    icon,
    loading = false,
    onClick,
    type,
    gap,
    borderRadius,
    fontSize,
    margin,
    padding,
    width,
    height,
    color,
    backgroundColor,
    className,
    reverse,
    justify_content,
    disabled = false
}) => {
    return (
        <FormButtonWrapper
            loading={loading}
            onClick={onClick}
            type={type}
            gap={gap}
            border_radius={borderRadius}
            fontSize={fontSize}
            margin={margin}
            padding={padding}
            width={width}
            height={height}
            text_color={color}
            background_color={backgroundColor}
            variant={backgroundColor && 'contained'}
            className={className}
            reverse={reverse}
            justify_content={justify_content}
            disabled={disabled}
        >
            {text && <p>{text}</p>}
            {!loading && icon && <img src={icon} alt='submit' />}
        </FormButtonWrapper>
    );
};

export default FormButton;
