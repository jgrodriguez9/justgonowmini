import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import getErrorServidorMessage from '../utils/getErrorServidorMessage';
import ErrorSunApi from './ErrorSunApi';

const ErrorServer = ({t, errorData, errorStatus}) => {
    return  (
        <Row>
            <Col>
                <div className="jumbotron">
                    <h1 className="display-4">Uups!!!</h1>
                    <p className="lead">{t('OcurrioErrorPeticion')}</p>
                    {
                        errorStatus && 
                        <Alert variant="info">
                            {getErrorServidorMessage(errorStatus.status)}
                        </Alert>
                    }
                    <ul className="list-unstyled">                        
                        {
                            (errorData && errorData.length > 0) &&
                            errorData.map((item,i)=>(
                                <li key={i}><ErrorSunApi error={item}/></li>
                            ))
                        }
                    </ul>
                </div>                
            </Col>
        </Row>
    )
}
export default withTranslation()(ErrorServer)