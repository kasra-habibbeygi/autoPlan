import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

//Assets
import { ReportingWrapper } from './reporting.style';
import Axios from './../../configs/axios';

//Components
import DetailBoxHeader from '../../components/template/detail-box-header';
import ChartItem from '../../components/pages/reporting/chart-item';
import DeficiencyChart from '../../components/pages/reporting/deficiency-chart';
import ReportingChart from '../../components/template/reporting-chart';
import ReportingLineChart from '../../components/pages/reporting/line-chart';
import ReportingBarChart from '../../components/pages/reporting/bar-chart';

const Reporting = () => {
    const [reportingChartData, setReportingChartData] = useState();

    useEffect(() => {
        Axios.get('/api/acceptance-report-in-one-month/')
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
            .finally(() => {});
    }, []);

    return (
        <ReportingWrapper>
            <Grid container spacing={1.5}>
                <Grid item xs={12} md={5}>
                    <div className='item'>
                        <DetailBoxHeader title='گزارش پذیرش در ماه اخیر' buttonText='دریافت گزارش کامل دوره' />
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
                        <DetailBoxHeader title='میزان انحراف در هر بخشی نمایندگی' buttonText='دریافت گزارش کامل دوره' />
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
                        <DetailBoxHeader title='گزارش میزان انحراف در هر بخش' buttonText='دریافت گزارش کامل دوره' />
                        <div className='barchart_header'>
                            <select>
                                <option value='three'>سه ماه</option>
                                <option value='six'>شش ماهه</option>
                                <option value='nine'>نه ماه</option>
                            </select>
                            <div className='barchart_items'>
                                <div>
                                    <span className='first'></span>
                                    <p>تعجیل در پایان</p>
                                </div>
                                <div>
                                    <span className='second'></span>
                                    <p>تعجیل در شروع</p>
                                </div>
                                <div>
                                    <span className='third'></span>
                                    <p>تاخیر در شروع</p>
                                </div>
                                <div>
                                    <span className='foutrh'></span>
                                    <p>تاخیر در پایان</p>
                                </div>
                            </div>
                        </div>
                        <div className='mainChart'>
                            <ReportingBarChart />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='item'>
                        <DetailBoxHeader title='میزان بروز انحراف در شش ماه گذشته' buttonText='دریافت گزارش کامل دوره' />
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
