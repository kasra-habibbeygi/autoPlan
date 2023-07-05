import React from 'react';
import { Grid } from '@mui/material';

//Assets
import pen from './../../assets/images/global/pen.svg';

//Components
import { SettingWrapper } from './setting.style';
import PagesHeader from '../../components/template/pages-header';
import DetailBoxHeader from '../../components/template/detail-box-header';
import ReceptionForm from '../../components/pages/setting/reception-form';
import WorkTimeForm from '../../components/pages/setting/work-time-form';

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
                                onClick={() => { }}
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
