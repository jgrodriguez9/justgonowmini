import { Markup } from 'interweave';
import React, { useState } from 'react';
import { Button, Col, Jumbotron, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

function ExtraInformation({t, extraInformation}){
    const [count, setCount] = useState(300)
    const [texto, setTexto] = useState(t('VerMas'))

    const onHandleClickMore = e =>{
        if(count === 20000){
            setTexto(t('VerMas'))
            setCount(300)
        }else{
            setTexto(t('VerMenos'))
            setCount(20000)
        }
    }

    return(
        <Row className="mt-4">
            <Col>
                <h2>{t('InfoAdicional')}</h2>
                {
                    extraInformation === null ? 
                    <div><Jumbotron><p>{t('NoInformacionMostrar')}</p></Jumbotron></div> : 
                    <div>                    
                    {
                        
                        extraInformation.length === 0 ?
                        <Jumbotron><p>{t('NoInformacionMostrar')}</p></Jumbotron>:
                        extraInformation.length > count ? 
                        <Markup content={`${extraInformation.substr(0,200)}...`} /> :
                        <Markup content={extraInformation} />
                    }                                                        
                    {extraInformation.length > 300 && <Button variant="link" className="text-success px-0 shadow-none" onClick={onHandleClickMore}>{texto}</Button>}
                </div>
                }
            </Col>
        </Row>
    )
}

export default withTranslation()(ExtraInformation)