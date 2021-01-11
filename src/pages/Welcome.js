import React, { useEffect } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import HomeMap from '../components/HomeMap';
import PrecioBottom from '../components/PrecioBottom';
import GoWelcome from '../components/welcome/GoWelcome';
import OfertasUMinuto from '../components/welcome/OfertasUMinuto';
import WelcomeCondominiosInfo from '../components/welcome/WelcomeCondominiosInfo';
import WelcomeExperienciasInfo from '../components/welcome/WelcomeExperienciasInfo';
import WelcomeFooter from '../components/welcome/WelcomeFooter';
import WelcomeHotelesInfo from '../components/welcome/WelcomeHotelesInfo';
import WelcomeIniciarPrueba from '../components/welcome/WelcomeIniciarPrueba';
import WelcomePreguntasFrecuentes from '../components/welcome/WelcomePreguntasFrecuentes';
import WelcomeSectionTop from '../components/welcome/WelcomeSectionTop';

import '../css/Welcome.css'

function Welcome({t}){

    useEffect(()=>{
        window.scrollTo(0,0)
        console.log(t)
    },[])

    return (
        <>
            <WelcomeSectionTop />
            <GoWelcome />
            <WelcomeHotelesInfo />
            <WelcomeCondominiosInfo />
            <WelcomeExperienciasInfo />
            <OfertasUMinuto />
            <HomeMap />
            <WelcomeIniciarPrueba />
            <WelcomePreguntasFrecuentes />
            <hr />  
            <PrecioBottom /> 
            <WelcomeFooter />
        </>
        
    );

}

export default withTranslation()(Welcome)