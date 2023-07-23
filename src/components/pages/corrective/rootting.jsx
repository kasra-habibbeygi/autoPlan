/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Axios from './../../../configs/axios';

//Assets
import Question from '../../../assets/images/corrective/Question.svg';
import add from '../../../assets/images/corrective/Add.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import Minusicon from './../../../assets/images/icons/Minus.svg';
import { RootingStyle } from './rootting.style';

//Components
import FormButton from '../../form-groups/form-button';

const Rootting = ({ setStep, setAllDetail, allDetail, chosenEditItemDetails, setReload }) => {
    const [inputValues, setInputValues] = useState([[''], [''], [''], [''], ['']]);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        if (chosenEditItemDetails?.troubleshooting) {
            const arr = eval(chosenEditItemDetails?.troubleshooting.replace(/'/g, '"'));
            setInputValues(arr);
        }
    }, [chosenEditItemDetails]);

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

    const sendDataHandler = () => {
        const str = '[' + inputValues.map(subArr => '[' + subArr.map(str => `'${str}'`).join(', ') + ']').join(', ') + ']';

        const allTruthy = inputValues.every(innerArr => innerArr.every(item => Boolean(item.trim())));

        if (allTruthy) {
            setButtonLoading(true);
            Axios.put(`reform_action/troubleshooting/?id=${allDetail?.mainId}`, {
                troubleshooting: str
            })
                .then(res => {
                    setStep(3);
                    setAllDetail(prev => ({
                        ...prev,
                        troubleshooting: str
                    }));
                    setReload(prev => !prev);
                })
                .catch(() => {})
                .finally(() => setButtonLoading(false));
        } else {
            toast.error('لطفا تمام مقادیر را پر کنید', {
                position: 'top-left'
            });
        }
    };

    return (
        <RootingStyle>
            <h3>ریشه یابی</h3>
            {inputValues.map((item, index) => (
                <div className='input_group' key={`rooting_add_item_${index}`}>
                    {item.map((val, valueIndex) => (
                        <div className='inputField' key={`rooting_inputs_add_item_${valueIndex}`}>
                            <input
                                type='text'
                                placeholder={`چرا-${index + 1}`}
                                onChange={e => inputValuehandler(e, index, valueIndex)}
                                defaultValue={val}
                            />
                            <img src={Question} alt='' />
                        </div>
                    ))}
                    <div className='action_button'>
                        <img src={add} alt='add' onClick={() => addInputhandler(index)} />
                        <img src={Minusicon} alt='remove' onClick={() => removeInputhandler(index)} />
                    </div>
                </div>
            ))}
            <FormButton
                text='بعدی'
                loading={buttonLoading}
                backgroundColor='#174787'
                color='white'
                height={48}
                icon={arrow}
                onClick={sendDataHandler}
            />
        </RootingStyle>
    );
};

export default Rootting;

// ("[['سلام'], ['خوبی', 'چطوری'], ['چه خبر', 'چه میکنی'], ['حالت', 'سنت', 'قدت'], ['شغلت', 'اسمت', 'رنگت']]");
