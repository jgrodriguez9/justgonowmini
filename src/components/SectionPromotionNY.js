import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import ny from '../img/newYork.png';
import letterNY from '../img/letterNY.svg';
import { BiChevronRight } from "react-icons/bi";
import { withTranslation } from 'react-i18next';

function SectionPromotionNY({t}){
    return(
        <Container fluid>
            <Row>
                <Col xs="12" lg="4" className="px-0">
                    <div>
                        <Image src={ny} fluid/>
                    </div>
                </Col>
                <Col xs="12" lg="4" className="px-0">
                    <div>
                        <Image src={letterNY} fluid/>
                    </div>
                </Col>
                <Col xs="12" lg="4">
                    <div className="px-5 pt-4">
                        <h2 className="mb-0">{t('NuevaYork')}</h2>
                        <label className="mb-2">{t('EstadosUnidos')}</label>

                        <small className="text-danger d-block">{t('CondosExperienciasDisponibles')}</small>

                        <p>{t('NuevaYorkParrafo')}</p>

                        <a href="#">{t('VerMas')}<BiChevronRight /></a>
                    </div>
                </Col>
            </Row>
        </Container>        
    )
}

export default withTranslation()(SectionPromotionNY)