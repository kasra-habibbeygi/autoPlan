import React from 'react';
import { useForm } from 'react-hook-form';

//assets
import { TableWrapper } from './qualification-table.style';

//components
import FormButton from '../../form-groups/form-button';

const QualificationTable = () => {
    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched'
    });
    const { errors } = formState;

    const formSubmit = data => {
        console.log(data);
    };

    // console.log(errors);

    return (
        <TableWrapper>
            <form onSubmit={handleSubmit(formSubmit)}>
                <table>
                    <thead>
                        <tr>
                            <th>وضعیت | جایگاه</th>
                            <th>مکانیکی</th>
                            <th>جلوبندی</th>
                            <th>برق</th>
                            <th>گاز</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>تجهیزات</th>
                            <td>
                                <div className={errors?.equipment_mechanic?.type ? 'radios error' : 'radios'}>
                                    <input
                                        value='full'
                                        type='radio'
                                        {...register('equipment_mechanic', {
                                            required: true
                                        })}
                                    />
                                    <label>کامل</label>
                                    <input
                                        value='notFull'
                                        type='radio'
                                        {...register('equipment_mechanic', {
                                            required: true
                                        })}
                                    />
                                    <label>ناقص</label>
                                </div>
                            </td>
                            <td>
                                <div className={errors?.equipment_blocking?.type ? 'radios error' : 'radios'}>
                                    <input
                                        value='full'
                                        type='radio'
                                        {...register('equipment_blocking', {
                                            required: true
                                        })}
                                    />
                                    <label>کامل</label>
                                    <input
                                        value='notFull'
                                        type='radio'
                                        {...register('equipment_blocking', {
                                            required: true
                                        })}
                                    />
                                    <label>ناقص</label>
                                </div>
                            </td>
                            <td>
                                <div className={errors?.equipment_eclectic?.type ? 'radios error' : 'radios'}>
                                    <input
                                        value='full'
                                        type='radio'
                                        {...register('equipment_eclectic', {
                                            required: true
                                        })}
                                    />
                                    <label>کامل</label>
                                    <input
                                        value='notFull'
                                        type='radio'
                                        {...register('equipment_eclectic', {
                                            required: true
                                        })}
                                    />
                                    <label>ناقص</label>
                                </div>
                            </td>
                            <td>
                                <div className={errors?.equipment_gap?.type ? 'radios error' : 'radios'}>
                                    <input
                                        value='full'
                                        type='radio'
                                        {...register('equipment_gap', {
                                            required: true
                                        })}
                                    />
                                    <label>کامل</label>
                                    <input
                                        value='notFull'
                                        type='radio'
                                        {...register('equipment_gap', {
                                            required: true
                                        })}
                                    />
                                    <label>ناقص</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>ابزار آلات</th>
                            <td>
                                <div className={errors?.tools_mechanic?.type ? 'radios error' : 'radios'}>
                                    <input
                                        value='full'
                                        type='radio'
                                        {...register('tools_mechanic', {
                                            required: true
                                        })}
                                    />
                                    <label>کامل</label>
                                    <input
                                        value='notFull'
                                        type='radio'
                                        {...register('tools_mechanic', {
                                            required: true
                                        })}
                                    />
                                    <label>ناقص</label>
                                </div>
                            </td>
                            <td>
                                <div className={errors?.tools_blocking?.type ? 'radios error' : 'radios'}>
                                    <input
                                        value='full'
                                        type='radio'
                                        {...register('tools_blocking', {
                                            required: true
                                        })}
                                    />
                                    <label>کامل</label>
                                    <input
                                        value='notFull'
                                        type='radio'
                                        {...register('tools_blocking', {
                                            required: true
                                        })}
                                    />
                                    <label>ناقص</label>
                                </div>
                            </td>
                            <td>
                                <div className={errors?.tools_eclectic?.type ? 'radios error' : 'radios'}>
                                    <input
                                        value='full'
                                        type='radio'
                                        {...register('tools_eclectic', {
                                            required: true
                                        })}
                                    />
                                    <label>کامل</label>
                                    <input
                                        value='notFull'
                                        type='radio'
                                        {...register('tools_eclectic', {
                                            required: true
                                        })}
                                    />
                                    <label>ناقص</label>
                                </div>
                            </td>
                            <td>
                                <div className={errors?.tools_gap?.type ? 'radios error' : 'radios'}>
                                    <input
                                        value='full'
                                        type='radio'
                                        {...register('tools_gap', {
                                            required: true
                                        })}
                                    />
                                    <label>کامل</label>
                                    <input
                                        value='notFull'
                                        type='radio'
                                        {...register('tools_gap', {
                                            required: true
                                        })}
                                    />
                                    <label>ناقص</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                زمان کار تعمیر گاه
                                <br />
                                (ساعت)
                            </th>
                            <td className={errors?.workTime_mechanic?.type ? 'input_error' : ''}>
                                <input
                                    type='number'
                                    placeholder='-'
                                    {...register('workTime_mechanic', {
                                        required: true
                                    })}
                                />
                                ساعت
                            </td>
                            <td className={errors?.workTime_blocking?.type ? 'input_error' : ''}>
                                <input
                                    type='number'
                                    placeholder='-'
                                    {...register('workTime_blocking', {
                                        required: true
                                    })}
                                />
                                ساعت
                            </td>
                            <td className={errors?.workTime_electric?.type ? 'input_error' : ''}>
                                <input
                                    type='number'
                                    placeholder='-'
                                    {...register('workTime_electric', {
                                        required: true
                                    })}
                                />
                                ساعت
                            </td>
                            <td className={errors?.workTime_gas?.type ? 'input_error' : ''}>
                                <input
                                    type='number'
                                    placeholder='-'
                                    {...register('workTime_gas', {
                                        required: true
                                    })}
                                />
                                ساعت
                            </td>
                        </tr>
                    </tbody>
                </table>
                {Object.keys(errors).length !== 0 ? <p className='footer'>تمام مقادیر را پر کنید</p> : null}
                <FormButton text='ثبت' loading={false} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
            </form>
        </TableWrapper>
    );
};

export default QualificationTable;
