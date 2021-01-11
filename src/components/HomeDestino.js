import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import losCabos from '../img/destinos/loscabos.jpg'
import losCabosSVG from '../img/destinos/los-cabos-02.svg'
import lasVegas from '../img/destinos/las-vegas.jpg'
import lasVegasSVG from '../img/destinos/las-vegas-02.svg'
import orlando from '../img/destinos/orlando.jpg'
import orlandoSVG from '../img/destinos/orlando-02.svg'
import { BiChevronRight } from 'react-icons/bi';
import { withTranslation } from 'react-i18next';

function HomeDestino({t}){
    return(
        <section className="py-5">
            <Container>
                <Row>
                    <Col xs="12" lg="5">
                        <h1 className="fw-300">
                            {t('EscogeEl')} <strong>{t('DestinoPerfecto')}</strong> {t('ParaTusVacaciones')}
                        </h1>
                    </Col>
                </Row>
                
                <Row>
                    <Col xs="12" lg="4" className="p-0">
                        <div className="bg-div" style={{backgroundImage: `url(${losCabos})`}}>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="p-0">
                    <div>
                            <Image src={losCabosSVG} fluid/>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="p-0">
                        <div className="px-3 pt-3">
                            <h2 className="mb-0">Los Cabos, <small>San Lucas</small></h2>

                            <small className="text-danger d-block">{t('CondosExperienciasDisponibles')}</small>

                            <p>{t('CondosExperienciasDisponiblesParrafo')}
                            </p>

                            <a href="#">{t('VerMas')} <BiChevronRight /></a>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="p-0">
                        <div className="px-3 pt-3">
                            <h2 className="mb-0">Los Vegas, <small>Nevada</small></h2>

                            <small className="text-danger d-block">{t('CondosDisponibles')}</small>

                            <p>{t('CondosDisponiblesParrafo')}
                            </p>

                            <a href="#">{t('VerMas')} <BiChevronRight /></a>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="p-0">
                        <div className="bg-div" style={{backgroundImage: `url(${lasVegas})`}}>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="p-0">
                    <div>
                            <Image src={lasVegasSVG} fluid/>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="p-0">
                        <div className="bg-div" style={{backgroundImage: `url(${orlando})`}}>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="p-0">
                        <div className="px-3 pt-3">
                            <h2 className="mb-0">Orlando, <small>Florida</small></h2>

                            <small className="text-danger d-block">{t('CondosDisponibles')}</small>

                            <p>{t('CondosDisponiblesParrafo2')}
                            </p>

                            <a href="#">{t('VerMas')} <BiChevronRight /></a>
                        </div>
                    </Col>
                    <Col xs="12" lg="4" className="p-0">
                    <div>
                            <Image src={orlandoSVG} fluid/>
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </section>
    )
}

export default withTranslation()(HomeDestino)