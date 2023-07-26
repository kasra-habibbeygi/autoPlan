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
    const [chosenPeriod, setChosenPeriod] = useState(3);
    const [reportingChartData, setReportingChartData] = useState();
    const [deviationInOneMonth, setDeviationInOneMonth] = useState();
    const [deviationInMultiMonths, setDeviationInMultiMonths] = useState();
    const [deviationInSixMonths, setDeviationInSixMonths] = useState();

    useEffect(() => {
        Axios.get('https://api.autoplaning.ir/api/acceptance-report-in-one-month/')
            .then(res => {
                console.log('first', res);
                setReportingChartData(res.data);
            })
            .catch(err => console.log(err))
            .finally(() => {});

        Axios.get('https://api.autoplaning.ir/api/percentage-deviation-in-one-month/')
            .then(res => {
                console.log('second', res);
                setDeviationInOneMonth(res.data);
            })
            .catch(err => console.log(err))
            .finally(() => {});
        Axios.get('https://api.autoplaning.ir/api/deviation-in-six-months/')
            .then(res => {
                console.log('fourth', res);
                setDeviationInSixMonths(res.data);
            })
            .catch(err => console.log(err))
            .finally(() => {});
    }, []);

    useEffect(() => {
        Axios.get(`https://api.autoplaning.ir/api/amount-of-deviation/${chosenPeriod}/`)
            .then(res => {
                console.log('third', res);
                setDeviationInMultiMonths(res.data);
            })
            .catch(err => console.log(err))
            .finally(() => {});
    }, [chosenPeriod]);

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
                                <ReportingChart detail={reportingChartData} />
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
                                <DeficiencyChart detail={deviationInOneMonth} />
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='item'>
                        <DetailBoxHeader title='گزارش میزان انحراف در هر بخش' buttonText='دریافت گزارش کامل دوره' />
                        <div className='barchart_header'>
                            <select value={chosenPeriod} onChange={e => setChosenPeriod(e.target.value)}>
                                <option value={3}>سه ماه</option>
                                <option value={6}>شش ماهه</option>
                                <option value={9}>نه ماه</option>
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
                            <ReportingBarChart detail={deviationInMultiMonths} />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='item'>
                        <DetailBoxHeader title='میزان بروز انحراف در شش ماه گذشته' buttonText='دریافت گزارش کامل دوره' />
                        <div className='mainChart'>
                            <ReportingLineChart detail={deviationInSixMonths} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </ReportingWrapper>
    );
};

export default Reporting;
