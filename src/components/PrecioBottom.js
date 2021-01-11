import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import infoBottom from '../img/info-bottom.jpg'
import infoBottomEng from '../img/infoBottomEn.png'
import { withTranslation } from 'react-i18next'

function PrecioBottom({i18n}){
    return(
        <section className="py-5">
            <Container>
                <Row>
                    <Col>
                        <div className='text-center'>
                            {
                                i18n.language === 'es' ?
                                <Image src={infoBottom} fluid className="mx-height-120"/> :
                                <Image src={infoBottomEng} fluid className="mx-height-120"/>
                            }
                            
                        </div>                    
                    </Col>
                </Row>
            </Container>            
        </section>
    )
}

export default withTranslation()(PrecioBottom)