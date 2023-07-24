import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Autocomplete, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

//assets
import circle from './../../../assets/images/icons/circle.svg';
import { FormWrapper } from './add-detail-modal.style';
import decreesArrow from './../../../assets/images/icons/decreesArrow.svg';
import increaseArrow from './../../../assets/images/icons/increaseArrow.svg';
import blocking from './../../../assets/images/icons/blocking.svg';

//components
import FormButton from '../../form-groups/form-button';

const AddDetailModal = ({ subModalStatus, setDetails, closeSubModalHandler }) => {
    const { register, handleSubmit, control, formState, getValues, setValue, reset } = useForm({
        defaultValues: {
            name: '',
            station: '',
            workTime: 1
        },
        mode: 'onTouched'
    });
    const { errors } = formState;

    const sendForm = data => {
        let modalRelated = null;

        if (subModalStatus === 'جلوبندی') {
            modalRelated = 'blockingList';
        } else if (subModalStatus === 'مکانیک') {
            modalRelated = 'mechanicList';
        } else if (subModalStatus === 'برق') {
            modalRelated = 'electricList';
        } else if (subModalStatus === 'گاز') {
            modalRelated = 'gasList';
        } else if (subModalStatus === 'هیبرید') {
            modalRelated = 'hybridList';
        }

        setDetails(prev => ({
            ...prev,
            [modalRelated]: [
                ...prev[modalRelated],
                {
                    id: uuidv4(),
                    name: data.name,
                    workTime: data.workTime,
                    station: data.station,
                    fullText: `${data.name} : ${data.workTime} ساعت کاری-در جایگاه ${data.station}`
                }
            ]
        }));

        closeSubModalHandler();
        reset();
    };

    return (
        <FormWrapper onSubmit={handleSubmit(sendForm)}>
            <p>{`نام نیروی ${subModalStatus}`}</p>
            <div className={errors?.name?.message ? 'auto_complete auto_complete_error' : 'auto_complete'}>
                <Controller
                    control={control}
                    name='name'
                    rules={{ required: 'این فیلد اجباری است' }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <Autocomplete
                                options={top100Films}
                                value={value?.label}
                                onChange={(event, newValue) => {
                                    onChange(newValue?.label);
                                }}
                                sx={{ width: '100%' }}
                                renderInput={params => <TextField {...params} />}
                            />
                        );
                    }}
                />

                <img src={circle} />
            </div>
            <p className='auto_error'>{errors?.name?.message}</p>

            <p>جایگاه نیرو</p>
            <div className={errors?.station?.message ? 'auto_complete auto_complete_error' : 'auto_complete'}>
                <Controller
                    control={control}
                    name='station'
                    rules={{ required: 'این فیلد اجباری است' }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <Autocomplete
                                options={top100Films}
                                value={value?.label}
                                onChange={(event, newValue) => {
                                    onChange(newValue?.label);
                                }}
                                sx={{ width: '100%' }}
                                renderInput={params => <TextField {...params} />}
                            />
                        );
                    }}
                />

                <img src={blocking} />
            </div>
            <p className='auto_error'>{errors?.station?.message}</p>

            <p style={{ marginBottom: '10px' }}>ساعت کاری نیرو</p>
            <div className='work_hour'>
                <div>
                    <p>تعداد ساعت کار {subModalStatus} : </p>
                    <p> {getValues().workTime} ساعت کاری</p>
                </div>
                <div className='input_wrapper'>
                    <FormButton
                        icon={increaseArrow}
                        onClick={() => getValues().workTime < 24 && setValue('workTime', getValues().workTime + 1)}
                    />
                    <input {...register('workTime')} readOnly />
                    <FormButton
                        icon={decreesArrow}
                        onClick={() => getValues().workTime > 1 && setValue('workTime', getValues().workTime - 1)}
                    />
                </div>
            </div>

            <FormButton text='ثبت' loading={false} type='submit' backgroundColor={'#174787'} color={'white'} height={48} />
        </FormWrapper>
    );
};

export default AddDetailModal;
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'علی ازقندی', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'نادیه نجم', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: 'Schindlers List', year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002
    },
    { label: 'One Flew Over the Cuckoos Nest', year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
        label: 'Star Wars: Episode IV - A New Hope',
        year: 1977
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: 'Its a Wonderful Life', year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
        label: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
        label: 'Eternal Sunshine of the Spotless Mind',
        year: 2004
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: 'Singin in the Rain', year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 }
];
