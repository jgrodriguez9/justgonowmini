import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { BsHouseFill } from 'react-icons/bs';

function PromoCondos({t}){
    return(
        <Row className="justify-content-center">
            <Col xs="12" lg="10">
                <h2 className="display-4 ft-2-5rem line-before">{t('ViveMejorExperiencia')} <strong>{t('RentaCondominios')}</strong></h2>
                <Button variant="primary" className="text-uppercase font-weight-bold mt-4" block>
                    <BsHouseFill className="mb-1" /> {t('VerSemanasDisponibles')}
                </Button>
            </Col>
        </Row> 
    );
}

export default withTranslation()(PromoCondos)