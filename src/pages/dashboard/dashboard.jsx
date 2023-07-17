import React from 'react';
import { Grid } from '@mui/material';

//Assets
import { HomeWrapper } from './dashboard.style';

//Components
import DetailBoxHeader from '../../components/template/detail-box-header';
import ChartItem from '../../components/pages/reporting/chart-item';
import ReportingChart from '../../components/template/reporting-chart';
import HomeTable from '../../components/pages/home/home-table';
import PagesHeader from '../../components/template/pages-header';

const Home = () => {
    const tableData = [
        {
            id: 1,
            car: 'پراید',
            license: '66 985 ص 42',
            mechanicCode: 659875,
            position: 36,
            pyramid: 5
        },
        {
            id: 2,
            car: 'پراید',
            license: '66 985 ص 42',
            mechanicCode: 659875,
            position: 36,
            pyramid: 5
        },
        {
            id: 3,
            car: 'پراید',
            license: '66 985 ص 42',
            mechanicCode: 659875,
            position: 36,
            pyramid: 5
        },
        {
            id: 4,
            car: 'پراید',
            license: '66 985 ص 42',
            mechanicCode: 659875,
            position: 36,
            pyramid: 5
        },
        {
            id: 5,
            car: 'پراید',
            license: '66 985 ص 42',
            mechanicCode: 659875,
            position: 36,
            pyramid: 5
        }
    ];

    return (
        <>
            <PagesHeader buttonTitle='نام نمایندگی : فلان' />
            <HomeWrapper>
                <Grid container columnSpacing={1.5} rowSpacing={1.5}>
                    <Grid item xs={12} xl={5}>
                        <div className='item'>
                            <DetailBoxHeader title='گزارش پذیرش در ماه اخیر' onClick={() => {}} buttonText='دریافت گزارش کامل دوره' />
                            <div className='chartWrapper'>
                                <div className='chartItems'>
                                    <ChartItem title='تعمیرات مکانیکی' percent='۳۸' color='#ad9bfd' />
                                    <ChartItem title='تعمیرات جلوبندی' percent='۲۲' color='#f8c75b' />
                                    <ChartItem title='تعمیرات برقی' percent='۴۵' color='#8bf795' />
                                    <ChartItem title='تعمیرات گازی' percent='۵۶' color='#e8f6fd' />
                                </div>
                                <div className='mainChart'>
                                    <ReportingChart />
                                </div>
                            </div>
                        </div>
                        <div className='itemMore'>
                            <DetailBoxHeader title='برنامه ریزی تعمیرات' buttonText='مشاهده' link='/planning' />
                        </div>
                        <div className='itemMore'>
                            <DetailBoxHeader title='کسری قطعات انبار' buttonText='مشاهده' link='/deficiency' />
                        </div>
                        <div className='itemMore'>
                            <DetailBoxHeader title='ظرفیت سنجی' buttonText='مشاهده' link='/qualification' />
                        </div>
                    </Grid>
                    <Grid item xs={12} xl={7} top={1.5}>
                        <div className='item'>
                            <DetailBoxHeader title='مدیریت برنامه ریزی تعمیرات' onClick={() => {}} buttonText='مدیریت تعمیرات' />
                            <HomeTable data={tableData} />
                        </div>
                        <div className='itemMore'>
                            <DetailBoxHeader title='تنظیمات سایت' buttonText='مشاهده' link='/setting' />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='itemMore'>
                            <DetailBoxHeader title='اقدام اصلاحی' buttonText='مشاهده' link='/corrective' />
                        </div>
                    </Grid>
                </Grid>
            </HomeWrapper>
        </>
    );
};

export default Home;
