import React, { useState } from 'react'
import { Button, Col, Jumbotron, Row } from 'react-bootstrap'
import { withTranslation } from 'react-i18next'

function AmenitiesDetail({t,amenities}){
    const [count, setCount] = useState(16)
    const [texto, setTexto] = useState(t('VerMas'))

    const onHandleClickMore = e =>{
        if(count === 1000){
            setTexto(t('VerMas'))
            setCount(16)
        }else{
            setTexto(t('VerMenos'))
            setCount(1000)
        }
    }

    return(
        <>
            <Row className="mt-4">
                <Col xs="12" lg="12">
                    <h2>{t('ServiciosHotel')}</h2>
                </Col>
                {
                    amenities.length === 0 ? 
                    <Col xs="12" lg="12">
                        <Jumbotron>
                            <p>
                                {t('NoInformacionMostrar')}
                            </p>
                        </Jumbotron> 
                    </Col>:
                    
                    amenities.map((item,i)=>(
                        i < count &&
                        <Col xs="6" md="3" key={i} className="text-secondary">
                            {item.name}
                        </Col>
                    ))
                }   
            </Row>
            {amenities.length > 16 &&
                <Row>
                    <Col>
                        <Button variant="link" className="text-success px-0 shadow-none" onClick={onHandleClickMore}>{texto}</Button>
                    </Col>
                </Row>
            }
        </>
        
    )
}

export default withTranslation()(AmenitiesDetail)