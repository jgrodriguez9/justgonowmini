import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Footer from '../components/Footer';
import Go from '../components/Go';
import HeaderNav from '../components/HeaderNav';
import HomeDescuentos from '../components/HomeDescuentos';
import HomeDestino from '../components/HomeDestino';
import HomeMap from '../components/HomeMap';
import MasonryImage from '../components/Masonry';
import PrecioBottom from '../components/PrecioBottom';
import SliderHome from '../components/SliderHome';
import CondosListado from './CondosListado';
import ExperienciasListado from './ExperienciasListado';
import HotelDetalle from './HotelDetalle';
import HotelListado from './HotelListado';
import HotelReserva from './HotelReserva';
import HotelVoucher from './HotelVoucher';
import ExperienceDetalle from './ExperienceDetalle'
import CondoDetail from './CondoDetail';

function Home(){
    const { t, i18n } = useTranslation();

    return (
        <>
            <HeaderNav />
            
            <Switch>
                <Route exact path="/">
                    <SliderHome />
                    <Go />     
                    <MasonryImage />  
                    <HomeDestino />   
                    <HomeDescuentos /> 
                    <HomeMap />  
                    <hr />  
                    <PrecioBottom />     
                </Route>
                <Route exact path="/hotel"><HotelListado /></Route>
                <Route exact path="/hotel/detail"><HotelDetalle /></Route>
                <Route path="/hotel/reservation"><HotelReserva/></Route>
                <Route exact path="/experience"><ExperienciasListado /></Route>
                <Route exact path="/experience/detail"><ExperienceDetalle /></Route>
                <Route exact path="/condos"><CondosListado /></Route>
                <Route exact path="/condo/detail"><CondoDetail /></Route>
            </Switch>

            <Footer />
            
        </>
    );
}

export default Home