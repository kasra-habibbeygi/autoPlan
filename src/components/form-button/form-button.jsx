import React from 'react';
import { FormButtonWrapper } from './form-button.style';

const FormButton = ({ text, icon, loading, onClick, type }) => {
    return (
        <FormButtonWrapper variant='contained' loading={loading} onClick={onClick} type={type}>
            <p>{text}</p>
            {!loading && <img src={icon} alt='submit' />}
        </FormButtonWrapper>
    );
};

export default FormButton;
