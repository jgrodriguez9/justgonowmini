import React, { useState } from 'react';
import { Button, Col, Jumbotron, Row } from 'react-bootstrap';
import { Markup } from 'interweave';
import { withTranslation } from 'react-i18next';

function DescripcionDetail({t, description}){
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
                <h2>{t('Descripcion')}</h2>
                <div>
                    {
                        description.length === 0 ?
                        <Jumbotron><p>{t('NoInformacionMostrar')}</p></Jumbotron>:
                        description.length > count ? 
                        <Markup content={`${description.substr(0,200)}...`} /> :
                        <Markup content={description} />
                    }                                                        
                    {description.length > 300 && <Button variant="link" className="text-success px-0 shadow-none" onClick={onHandleClickMore}>{texto}</Button>}
                </div>
            </Col>
        </Row>
    )

}

export default withTranslation()(DescripcionDetail)