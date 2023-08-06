import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';

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
import BarChartCustom from '../../components/pages/reporting/bar-chart-custom';

const Reporting = () => {
    const [chosenPeriod, setChosenPeriod] = useState(3);
    const [reportingChartData, setReportingChartData] = useState();
    const [deviationInOneMonth, setDeviationInOneMonth] = useState();
    const [deviationInMultiMonths, setDeviationInMultiMonths] = useState();
    const [deviationInSixMonths, setDeviationInSixMonths] = useState();
    const [loading, setLoading] = useState({
        reportingChartDataLoading: true,
        deviationInOneMonthLoading: true,
        deviationInMultiMonthsLoading: true,
        deviationInSixMonthsLoading: true
    });

    const colorsReporting = ['#1c1c1c', '#baedbd', '#c6c7f8', '#95a4fc'];
    const colorsDeficiency = ['#ad9bfd', '#f8c75b', '#8bf795', '#e8f6fd'];

    useEffect(() => {
        Axios.get('https://api.autoplaning.ir/api/acceptance-report-in-one-month/')
            .then(res => {
                setReportingChartData(res.data);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(prev => ({
                    ...prev,
                    reportingChartDataLoading: false
                }));
            });

        Axios.get('https://api.autoplaning.ir/api/percentage-deviation-in-one-month/')
            .then(res => {
                setDeviationInOneMonth(res.data);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(prev => ({
                    ...prev,
                    deviationInOneMonthLoading: false
                }));
            });
        Axios.get('https://api.autoplaning.ir/api/deviation-in-six-months/')
            .then(res => {
                setDeviationInSixMonths(res.data);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(prev => ({
                    ...prev,
                    deviationInSixMonthsLoading: false
                }));
            });
    }, []);

    useEffect(() => {
        setLoading(prev => ({
            ...prev,
            deviationInMultiMonthsLoading: true
        }));

        Axios.get(`https://api.autoplaning.ir/api/amount-of-deviation/${chosenPeriod}/`)
            .then(res => {
                setDeviationInMultiMonths(res.data);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(prev => ({
                    ...prev,
                    deviationInMultiMonthsLoading: false
                }));
            });
    }, [chosenPeriod]);

    const downloadHandler = link => {
        Axios.get(link, {
            baseURL: 'https://api.autoplaning.ir'
        })
            .then(res => {
                if (res?.data?.link) {
                    location.href = `https://api.autoplaning.ir/${res.data?.link}`;
                }
            })
            .catch(err => console.log(err))
            .finally(() => {});
    };

    return (
        <ReportingWrapper>
            <Grid container spacing={1.5}>
                <Grid item xs={12} md={5}>
                    <div className='item'>
                        <DetailBoxHeader
                            title='گزارش پذیرش در ماه اخیر'
                            buttonText='دریافت گزارش کامل دوره'
                            onClick={() => downloadHandler(reportingChartData?.link)}
                        />
                        {loading.reportingChartDataLoading ? (
                            <div className='loading'>
                                <CircularProgress />
                            </div>
                        ) : (
                            <div className='chartWrapper'>
                                <div className='chartItems'>
                                    {reportingChartData &&
                                        Object.entries(reportingChartData)?.map(
                                            ([title, percent], index) =>
                                                title !== 'link' && (
                                                    <ChartItem
                                                        key={title}
                                                        title={title}
                                                        percent={percent.toFixed(2)}
                                                        color={colorsReporting[index]}
                                                    />
                                                )
                                        )}
                                </div>
                                <div className='mainChart'>
                                    <ReportingChart detail={reportingChartData} />
                                </div>
                            </div>
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} md={7}>
                    <div className='item'>
                        <DetailBoxHeader
                            title='میزان انحراف در هر بخشی نمایندگی'
                            buttonText='دریافت گزارش کامل دوره'
                            onClick={() => downloadHandler(deviationInOneMonth?.link)}
                        />
                        {loading.deviationInOneMonthLoading ? (
                            <div className='loading'>
                                <CircularProgress />
                            </div>
                        ) : (
                            <div className='chartWrapper'>
                                <div className='chartItems'>
                                    {deviationInOneMonth &&
                                        Object.entries(deviationInOneMonth)?.map(
                                            ([title, percent], index) =>
                                                title !== 'link' && (
                                                    <ChartItem
                                                        key={title}
                                                        title={`انحراف در ${title}`}
                                                        percent={percent.toFixed(2)}
                                                        color={colorsDeficiency[index]}
                                                    />
                                                )
                                        )}
                                </div>
                                <div className='mainChart'>
                                    <DeficiencyChart detail={deviationInOneMonth} />
                                </div>
                            </div>
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='item'>
                        <DetailBoxHeader
                            title='گزارش میزان انحراف در هر بخش'
                            buttonText='دریافت گزارش کامل دوره'
                            onClick={() => downloadHandler(deviationInMultiMonths?.link)}
                        />
                        {loading.deviationInMultiMonthsLoading ? (
                            <div className='loading'>
                                <CircularProgress />
                            </div>
                        ) : (
                            <>
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
                                <BarChartCustom detail={deviationInMultiMonths} />
                            </>
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='item'>
                        <DetailBoxHeader
                            title='میزان بروز انحراف در شش ماه گذشته'
                            buttonText='دریافت گزارش کامل دوره'
                            onClick={() => downloadHandler(deviationInSixMonths?.link)}
                        />
                        <div className='mainChart'>
                            {loading.deviationInSixMonthsLoading ? (
                                <div className='loading'>
                                    <CircularProgress />
                                </div>
                            ) : (
                                <ReportingLineChart detail={deviationInSixMonths} />
                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </ReportingWrapper>
    );
};

export default Reporting;
