import React, { useContext, useEffect, useState } from 'react';
import { Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaUser } from "react-icons/fa";
import logoBlue from '../img/logo-blue.png';
import { authContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { useTranslation, withTranslation } from 'react-i18next';

import '../css/HeaderNav.css'

function HeaderNav({t, i18n}){
    const { setAuthData } = useContext(authContext);
    const [stickyClass, setStickyClass] = useState("");
    const [currentLang, setCurrentLangClass] = useState(i18n.language)

    const logout = e =>{
        setAuthData(null);
        window.localStorage.clear();
    }

    useEffect(()=>{
        const onScroll = () => {
            const scrollPosition = window.scrollY;
              if(scrollPosition > 150 ) { 
                setStickyClass('sticky')
              }else{
                setStickyClass("")
              }
          };

          window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    },[])

    useEffect(()=>{
        setCurrentLangClass(i18n.language)
    },[i18n.language])

    function handleClick(lang){
        i18n.changeLanguage(lang);
        setCurrentLangClass(lang)
      }

    return(
        <Navbar collapseOnSelect expand="lg" variant="light" fixed="top" className={`navbar-home ${stickyClass} bg-white-light`}>
            <NavLink to="/" className="navbar-brand" exact>
                <Image src={logoBlue} fluid className="hp-70"/>
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto nav-header">
                    <NavLink to="/" activeClassName="active" className="nav-link" exact>{t('Inicio')}</NavLink>
                    <NavLink to="/flight" activeClassName="active" className="nav-link" exact>{t('Vuelos')}</NavLink>
                    <NavLink to="/condos" activeClassName="active" className="nav-link" exact>{t('Condominios')}</NavLink>
                    <NavLink to="/hotel" activeClassName="active" className="nav-link" exact>{t('Hoteles')}</NavLink>
                    <NavLink to="/experience" activeClassName="active" className="nav-link" exact>{t('Experiencias')}</NavLink>
                    <NavLink to="/car" activeClassName="active" className="nav-link" exact>{t('Autos')}</NavLink>
                <NavDropdown title={<FaUser />}>
                    <NavDropdown.Item eventKey="1" onClick={logout} className="p-regular-a">{t('CerrarSesion')}</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title={currentLang} className="language-item">
                    <NavDropdown.Item as="button" onClick={() => handleClick('es')} className="p-regular-a">ES</NavDropdown.Item>
                    <NavDropdown.Item as="button" onClick={() => handleClick('en')} className="p-regular-a">EN</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )


}

export default withTranslation()(HeaderNav)