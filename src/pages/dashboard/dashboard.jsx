import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import Axios from '../../configs/axios';

//Assets
import { HomeWrapper } from './dashboard.style';

//Components
import DetailBoxHeader from '../../components/template/detail-box-header';
import ChartItem from '../../components/pages/reporting/chart-item';
import ReportingChart from '../../components/template/reporting-chart';
import HomeTable from '../../components/pages/home/home-table';
import PagesHeader from '../../components/template/pages-header';

const Home = () => {
    const [managementList, setManagementList] = useState([]);
    const [reportingChartData, setReportingChartData] = useState();
    const [loading, setLoading] = useState({
        reportingChartDataLoading: true,
        tableLoading: true
    });

    const colorsReporting = ['#1c1c1c', '#baedbd', '#c6c7f8', '#95a4fc'];

    useEffect(() => {
        Axios.get('/worker/admin/vehicle-specifications/list_create/?page_size=5')
            .then(res => {
                console.log(res.data);
                setManagementList(() =>
                    res.data.results.map(item => ({
                        id: item?.id,
                        car: item?.car_brand,
                        license: `${item?.plaque_4} ${item?.plaque_3} ${item?.plaque_2} ${item?.plaque_1}`,
                        mechanicCode: item?.diagnosis_info?.repairman || '---',
                        position: '---',
                        pyramid: item?.diagnosis_info?.pyramid_number || '---'
                    }))
                );
            })
            .catch(() => {})
            .finally(() => {
                setLoading(prev => ({
                    ...prev,
                    tableLoading: false
                }));
            });

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
    }, []);

    return (
        <>
            <PagesHeader buttonTitle='نام نمایندگی : فلان' />
            <HomeWrapper>
                <Grid container columnSpacing={1.5} rowSpacing={1.5}>
                    <Grid item xs={12} xl={5}>
                        <div className='item'>
                            <DetailBoxHeader
                                title='گزارش پذیرش در ماه اخیر'
                                buttonText='دریافت گزارش کامل دوره'
                                link={`https://api.autoplaning.ir${reportingChartData?.link}`}
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
                                                            percent={percent}
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
                            <DetailBoxHeader title='مدیریت برنامه ریزی تعمیرات' buttonText='مدیریت تعمیرات' />
                            {loading.tableLoading ? (
                                <div className='loading'>
                                    <CircularProgress />
                                </div>
                            ) : (
                                <HomeTable data={managementList} />
                            )}
                        </div>
                        <div className='itemMore'>
                            <DetailBoxHeader title='تنظیمات سایت' buttonText='مشاهده' link='/setting' />
                        </div>
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
