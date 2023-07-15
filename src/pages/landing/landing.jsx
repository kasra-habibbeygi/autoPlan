import React, { useEffect } from 'react';
import { Grid } from '@mui/material';

//assets
import { LandingWrapper } from './landing.style';
import phoneCalling from './../../assets/images/landing/phoneCalling.svg';
import email from './../../assets/images/landing/email.svg';
import plumber from './../../assets/images/landing/plumber1.png';
import plumberThumbUP from './../../assets/images/landing/plumber-with-thumb-up.png';
import plumberPhone from './../../assets/images/landing/plumber-making-phone-gesture.png';

//components
import Navbar from '../../components/layouts/navbar';
import { useLocation } from 'react-router-dom';

const Landing = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const target = document.querySelector(location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.hash]);

    return (
        <LandingWrapper>
            <Navbar />
            <div className='container'>
                <div className='introduce' id='introduce'>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <div className='introduce_text'>
                                <p>اتو پـــــلنـــــــــــــــ</p>
                                <p>متن ساختگی</p>
                                <p>لورم ایپسوم</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className='img_wrapper'>
                                <img src={plumber} alt='' />
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className='services' id='services'>
                    <Grid container>
                        <Grid item xs={12} md={7} xl={6}>
                            <div className='container'>
                                <p className='title'>خدمات اتو پلن</p>
                                <p className='services_text'>
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
                                    متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
                                </p>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className='about' id='about'>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <div className='container'>
                                <p className='title'>خدمات اتو پلن</p>
                                <p className='about_text'>
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
                                    متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src={plumberThumbUP} alt='' />
                        </Grid>
                    </Grid>
                </div>

                <div className='contact' id='contact'>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <div className='img_wrapper'>
                                <img src={plumberPhone} alt='' />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className='container'>
                                <p className='title'>تماس با ما</p>
                                <div className='contact_text'>
                                    <div className='contact_item_wrapper'>
                                        <div className='contact_item'>
                                            <img src={phoneCalling} alt='' />
                                            <p>0935898419816</p>
                                        </div>
                                        <div className='contact_item'>
                                            <img src={phoneCalling} alt='' />
                                            <p>0935898419816</p>
                                        </div>
                                    </div>
                                    <div className='contact_item_wrapper'>
                                        <div className='contact_item'>
                                            <img src={phoneCalling} alt='' />
                                            <p>0935898419816</p>
                                        </div>
                                        <div className='contact_item'>
                                            <img src={phoneCalling} alt='' />
                                            <p>0935898419816</p>
                                        </div>
                                    </div>
                                    <div className='contact_item_wrapper'>
                                        <div className='contact_item'>
                                            <img src={email} alt='' />
                                            <p>someemail@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </LandingWrapper>
    );
};

export default Landing;
