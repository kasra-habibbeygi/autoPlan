/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import add from '../../../assets/images/corrective/Add.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import Minusicon from './../../../assets/images/icons/Minus.svg';

//Components
import FormButton from '../../form-groups/form-button';
import { RootingStyle } from './rootting.style';

const Rootting = ({ setStep, setAllDetail }) => {
    const [inputValues, setInputValues] = useState([[''], [''], [''], [''], ['']]);

    const inputValuehandler = (e, index, valueIndex) => {
        const updatedValues = [...inputValues];
        updatedValues[index][valueIndex] = e.target.value;
        setInputValues(updatedValues);
    };

    const addInputhandler = index => {
        const updatedValues = [...inputValues];
        inputValues.forEach((_, count) => {
            if (count >= index) {
                updatedValues[count].push('');
            }
        });
        setInputValues(updatedValues);
    };

    const removeInputhandler = index => {
        const updatedValues = [...inputValues];
        const indexTemp = updatedValues[index].length;

        inputValues.forEach((_, count) => {
            if (count >= index) {
                if (updatedValues[count].length > 1 && count !== 0 && updatedValues[count].length > updatedValues[count - 1].length) {
                    if (indexTemp !== 1) {
                        updatedValues[count].pop();
                    }
                } else if (updatedValues[count].length > 1 && count === 0) {
                    updatedValues[count].pop();
                }
            }
        });
        setInputValues(updatedValues);
    };

    return (
        <RootingStyle>
            <h3>ریشه یابی</h3>
            {inputValues.map((item, index) => (
                <div className='input_group' key={`rooting_add_item_${index}`}>
                    {item.map((_, valueIndex) => (
                        <div className='inputField' key={`rooting_inputs_add_item_${valueIndex}`}>
                            <input type='text' placeholder={`چرا-${index + 1}`} onChange={e => inputValuehandler(e, index, valueIndex)} />
                            <img src={Question} alt='' />
                        </div>
                    ))}
                    <div className='action_button'>
                        <img src={add} alt='add' onClick={() => addInputhandler(index)} />
                        <img src={Minusicon} alt='remove' onClick={() => removeInputhandler(index)} />
                    </div>
                </div>
            ))}
            <FormButton text='بعدی' loading={false} type='submit' backgroundColor='#174787' color='white' height={48} icon={arrow} />
        </RootingStyle>
    );
};

export default Rootting;
