import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import bgMap from '../img/bg-map.png'

function HomeMap(){
    return(
        <section className="py-2">
            <Container>
                <Row>
                    <Col>
                        <Image src={bgMap} fluid/>
                    </Col>
                </Row>
            </Container>
        </section>
    )

}

export default HomeMap