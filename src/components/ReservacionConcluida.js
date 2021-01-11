import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function ReservacionConcluida({t}){
    return  (
        <Container>
            <Row className="justify-content-center mt-load">
                <Col xs="12" lg="7" className="jumbotron px-1">
                    <Row className="align-items-center">
                        <Col xs="12" lg="12" className="text-center">                            
                            <h2 className="text-loader-1">{t('Felicidades')}</h2>
                            <p>{t('Felicidades1')}</p>
                        </Col>
                        <Col xs="12" lg="12" className="text-center">
                            <small><Link to="/">{t('Inicio')}</Link></small>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default withTranslation()(ReservacionConcluida)