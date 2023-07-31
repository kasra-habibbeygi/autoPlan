/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

//Assets
import check from '../../../assets/images/icons/check.svg';
import arrow from './../../../assets/images/global/arrow.svg';
import { Style } from './style';

//Components
import FormButton from '../../form-groups/form-button';
import InputComponent from '../../form-groups/input-component';

const ResponsibleForAction = ({ setStep, setAllDetail, allDetail, chosenEditItemDetails }) => {
    const { register, handleSubmit, formState, setValue } = useForm({
        mode: 'onTouched'
    });

    const { errors } = formState;

    useEffect(() => {
        // if (chosenEditItemDetails?.action_officials_info) {
        //     const newArray = chosenEditItemDetails?.action_officials_info?.map((item, index) => {
        //         const foundedItem = personnelArray.find(itemArray => itemArray.value === item.id);
        //         return {
        //             [`correction_${index + 1}`]: { label: foundedItem.label, value: item.id }
        //         };
        //     });
        //     newArray.forEach((item, index) => setValue(`correction_${index + 1}`, item[`correction_${index + 1}`]));
        // }
    }, [chosenEditItemDetails]);

    const formSubmit = data => {
        console.log(data);
        setAllDetail(prev => ({
            ...prev,
            actionPerson: data
        }));
        setStep(5);
    };
    console.log(errors);

    return (
        <Style>
            <form onSubmit={handleSubmit(formSubmit)}>
                {allDetail?.actions.map((item, index) => (
                    <InputComponent
                        key={item.action}
                        title={`مسئول اقدام ${item.action}`}
                        icon={check}
                        type='text'
                        detail={{
                            ...register(`correction_${index + 1}`, {
                                required: {
                                    value: true,
                                    message: 'این فیلد اجباری است'
                                }
                            })
                        }}
                        error={errors?.[`correction_${index + 1}`]}
                    />
                ))}

                <FormButton text='بعدی' type='submit' backgroundColor={'#174787'} color={'white'} height={48} icon={arrow} />
                <FormButton text='قبلی' backgroundColor='#174787' color='white' height={48} onClick={() => setStep(3)} margin={'20px 0'} />
            </form>
        </Style>
    );
};

export default ResponsibleForAction;
