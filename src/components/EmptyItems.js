import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { EmptyData } from './EmptyData';

const EmptyItems = ({t}) => {
    return  (
        <Row>
            <Col>
                <div className="jumbotron">
                    <h1 className="display-4">{t('LoSentimos')}!!!</h1>
                    <p className="lead">{t('NoValoresBusqueda')} <br/>
                    {t('PorFavorIntente')}</p>
                </div>                
            </Col>
        </Row>
    )
}
export default withTranslation()(EmptyItems)