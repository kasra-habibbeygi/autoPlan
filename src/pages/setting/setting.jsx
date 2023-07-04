import React from 'react';
import PagesHeader from '../../components/pages-header/pages-header';
import { SettingWrapper } from './setting.style';
import { Grid } from '@mui/material';
import ReceptionForm from '../../components/pages/setting/reception-form/reception-form';
import WorkTimeForm from '../../components/pages/setting/work-time-form/work-time-form';
import DetailBoxHeader from '../../components/detail-box-header/detail-box-header';
import pen from './../../assets/images/global/pen.svg';

const Setting = () => {
    const openModal = () => {
        //codes
    };

    return (
        <>
            <PagesHeader buttonTitle='نام نمایندگی' onButtonClick={openModal} />
            <SettingWrapper>
                <Grid container columnSpacing={1.5}>
                    <Grid item xs={12} md={6}>
                        <div className='item'>
                            <ReceptionForm />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className='item'>
                            <WorkTimeForm />
                        </div>
                        <br />
                        <div className='item'>
                            <DetailBoxHeader
                                title='نام نمایندگی : فلان'
                                onClick={() => console.log('object')}
                                buttonText={<img src={pen} />}
                            />
                        </div>
                    </Grid>
                </Grid>
            </SettingWrapper>
        </>
    );
};

export default Setting;
