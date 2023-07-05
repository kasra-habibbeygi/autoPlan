import React from 'react';
import { Grid } from '@mui/material';

//Assets

//Components
import { ReportingWrapper } from './reporting.style';
import DetailBoxHeader from '../../components/template/detail-box-header';
import ChartItem from '../../components/pages/reporting/chart-item';
import DeficiencyChart from '../../components/pages/reporting/deficiency-chart';
import ReportingChart from '../../components/template/reporting-chart';
import ReportingLineChart from '../../components/pages/reporting/line-chart';

const Reporting = () => {
    return (
        <ReportingWrapper>
            <Grid container spacing={1.5}>
                <Grid item xs={12} md={5}>
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
                </Grid>
                <Grid item xs={12} md={7}>
                    <div className='item'>
                        <DetailBoxHeader title='میزان انحراف در هر بخشی نمایندگی' onClick={() => {}} buttonText='دریافت گزارش کامل دوره' />
                        <div className='chartWrapper'>
                            <div className='chartItems'>
                                <ChartItem title='انحراف در بخش مکانیکی' percent='۳۸' color='#ad9bfd' />
                                <ChartItem title='انحراف در بخش جلو بندی' percent='۲۲' color='#f8c75b' />
                                <ChartItem title='انحراف در بخش برق کاری' percent='۴۵' color='#8bf795' />
                                <ChartItem title='انحراف در بخش گاز کاری' percent='۵۶' color='#e8f6fd' />
                            </div>
                            <div className='mainChart'>
                                <DeficiencyChart />
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='item'>
                        <DetailBoxHeader title='گزارش میزان انحراف در هر بخش' onClick={() => {}} buttonText='دریافت گزارش کامل دوره' />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='item'>
                        <DetailBoxHeader title='میزان بروز انحراف در شش ماه گذشته' onClick={() => {}} buttonText='دریافت گزارش کامل دوره' />
                        <div className='mainChart'>
                            <ReportingLineChart />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </ReportingWrapper>
    );
};

export default Reporting;
