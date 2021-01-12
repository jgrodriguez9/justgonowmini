import React from 'react';
import s1 from '../img/slides/s1.jpg';
import s2 from '../img/slides/s2.jpg';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/SliderHome.css'
import { Col, Container, Image, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import SearchVuelos from './SearchVuelos';
import SearchCondominios from './SearchCondominios';
import SearchHoteles from './SearchHoteles';
import SearchExperiencias from './SearchExperiencias';
import SearchAutos from './SearchAutos';
import { withTranslation } from 'react-i18next';


function SliderHome({t}){
    const settings = {
        dots: false,
        infinite: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
                fade:false
              }
            }
          ]
    };


    return(
      <>
      <div className={`slider_area`}>
        <div className="slider-wrapper">
          <Slider {...settings} className='owl-carousel'>
                  <div className="item">
                      <Image src={s1} fluid />
                      {/* <div className={`home-slide`} style={{backgroundImage: `url(${s1})`}}>
                          
                      </div> */}
                  </div>
                  <div className="item">
                    <Image src={s2} fluid />
                      {/* <div className={`home-slide`} style={{backgroundImage: `url(${s2})`}}></div> */}
                  </div>
              </Slider>
        </div>            
          <div className="box-search">
            <Tabs defaultActiveKey="hoteles" className="justify-content-center" transition={false}>
                {/* <Tab eventKey="vuelos" title={t('Vuelos')}>
                    <SearchVuelos />
                </Tab> */}
                <Tab eventKey="condominios" title={t('Condominios')}>
                    <SearchCondominios/>
                </Tab>
                <Tab eventKey="hoteles" title={t('Hoteles')}>
                    <SearchHoteles />
                </Tab>
                <Tab eventKey="experiencias" title={t('Experiencias')}>
                    <SearchExperiencias />
                </Tab>
                {/* <Tab eventKey="autos" title={t('Autos')}>
                    <SearchAutos />
                </Tab> */}
            </Tabs>
          </div>     
        </div> 
      </>
         
    );


}

export default withTranslation()(SliderHome)