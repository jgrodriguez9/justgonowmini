import React, { useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { withTranslation } from 'react-i18next';
import ItemsCarousel from 'react-items-carousel';
import promo1 from '../img/promos/promo1.png'
import promo2 from '../img/promos/promo2.png'
import promo3 from '../img/promos/promo3.png'
import promo4 from '../img/promos/promo4.png'
import promo5 from '../img/promos/promo5.png'

function HomeDescuentos({t}){
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    return(
        <section className="py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col xs="12" lg="5">
                        <h1 className="fw-300">
                            {t('Descuentos')} <strong>{t('EspecialesUltimo')}</strong> {t('Minuto')}
                        </h1>
                    </Col>
                </Row>
            </Container>

            <Container fluid>
                <Row>
                    <Col>
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex}
                        activeItemIndex={activeItemIndex}
                        numberOfCards={5}
                        gutter={10}
                        leftChevron={<button>{'<'}</button>}
                        rightChevron={<button>{'>'}</button>}
                        outsideChevron={false}
                        chevronWidth={chevronWidth}
                        infiniteLoop
                    >
                <div style={{ height: 260, background: '#EEE', overflow: 'hidden' }}>
                    <Image src={promo1} fluid />
                </div>
                <div style={{ height: 260, background: '#EEE', overflow: 'hidden' }}>
                    <Image src={promo2} fluid />
                </div>
                <div style={{ height: 260, background: '#EEE', overflow: 'hidden' }}>
                    <Image src={promo3} fluid />
                </div>
                <div style={{ height: 260, background: '#EEE', overflow: 'hidden' }}>
                    <Image src={promo4} fluid />
                </div>
                <div style={{ height: 260, background: '#EEE', overflow: 'hidden' }}>
                    <Image src={promo5} fluid />
                </div>
                <div style={{ height: 260, background: '#EEE', overflow: 'hidden' }}>
                    <Image src={promo1} fluid />
                </div>
                <div style={{ height: 260, background: '#EEE', overflow: 'hidden' }}>
                    <Image src={promo2} fluid />
                </div>
            </ItemsCarousel>
                    </Col>
                </Row>
            
            </Container>
        </section>
    )
}

export default withTranslation()(HomeDescuentos)