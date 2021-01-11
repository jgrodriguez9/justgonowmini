import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import logoWhite from '../img/logo-white.png';
import socialFacebook from '../img/social/fb.svg';
import socialTwitter from '../img/social/twitter.svg';
import socialGPlus from '../img/social/gplus.svg';
import moment from 'moment'

import '../css/Footer.css'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { withTranslation } from 'react-i18next';

function Footer({t}){

    return(
        <>
            <section className="footer-1">
                <Container>
                    <Row>
                        <Col xs="12" lg="3">
                            <Image src={logoWhite} fluid className="hp-70" />
                            <p className="text-white my-3">
                                {t('FooterParrafo')}
                            </p>
                            <ul className="list-inline ft-0-9rem">
                                <li className="list-inline-item"><Image src={socialFacebook} fluid className="icon-20" /></li>
                                <li className="list-inline-item"><Image src={socialTwitter} fluid className="icon-20" /></li>
                                <li className="list-inline-item"><Image src={socialGPlus} fluid className="icon-20" /></li>
                            </ul>

                        </Col>
                        <Col xs="12" lg="3">
                            <h5 className="text-light">{t('NuestrosServicios')}</h5>
                            <ul className="list-unstyled footer-link ul-ft-14">
                                <li><a href="#">{t('Blog')}</a></li>
                                <li><a href="#">{t('Condominios')}</a></li>
                                <li><a href="#">{t('Hoteles')}</a></li>
                                <li><a href="#">{t('Experiencias')}</a></li>
                                <li><a href="#">{t('Vuelos')}</a></li>
                                <li><a href="#">{t('Autos')}</a></li>
                            </ul>
                        </Col>
                        <Col xs="12" lg="3">
                            <h5 className="text-light">{t('Privacidad')}</h5>
                            <ul className="list-unstyled footer-link ul-ft-14">
                                <li><a href="#">{t('AvisoPrivacidad')}</a></li>
                                <li><a href="#">{t('AcercaNosotros')}</a></li>
                                <li><a href="#">{t('TérminosCondiciones')}</a></li>
                                <li><a href="#">{t('PreguntasFrecuentes')}</a></li>
                            </ul>
                        </Col>
                        <Col xs="12" lg="3">
                            <h5 className="text-light">{t('InformaciónContacto')}</h5>
                            <ul className="list-unstyled">
                                <li><a href="#"><FaEnvelope className="color-blue" /> <span className="text-light ft-0-9rem">reservacion@justgonow.com</span></a></li>
                                <li><a href="#"><FaPhoneAlt className="color-blue"/><span className="text-light ft-0-9rem">1 (800) 490-0287</span></a></li>
                                <li><a href="#"><FaMapMarkerAlt className="color-blue"/><span className="text-light ft-0-9rem">Cancún, México</span></a></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="footer-2">
                <Container>
                    <Row>
                        <Col xs="12" lg="9">
                            <small className="copyright">Copyright © {moment().format('YYYY')} {t('FooterParrafoCopyright')} 
                            <a href="http://www.spheres.com.mx/" className="link-spheres"> Sphere</a></small>
                        </Col>
                        <Col xs="12" lg="3">
                            <small><a href="http://www.spheres.com.mx/" className="link-spheres">http://www.spheres.com.mx/</a></small>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default withTranslation()(Footer)