import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

const EmptyData = ({t}) => {
    return  (
        <Container>
            <Row className="justify-content-center my-5">
                <Col xs="12" lg="7" className="jumbotron py-4 px-2">
                    <Row className="align-items-center">
                        <Col className="text-center">
                            <h2>{t('NoMostrarHotel')}</h2>
                            <h4 className="mb-2">{t('Contactanos')}</h4>

                            <h2 className="telef-1 mb-0 lh-0-7 text-primary">800 000 0000</h2>
                            <small>{t('LunDom')} (7am - 1am) {t('HoraCiudadMexico')}</small>

                            <small className="d-block mt-2">{t('EstadosUnidosCanada')}</small>
                            <h5 className="telef-1 text-primary">1 (800) 490-0287</h5>
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default withTranslation()(EmptyData)