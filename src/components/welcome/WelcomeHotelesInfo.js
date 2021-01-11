import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BsStarFill } from "react-icons/bs";

function WelcomeHotelesInfo(){
    return(
        <section className="pb-5">
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-uppercase">Hoteles</h1>
                    </Col>
                </Row>
            </Container>
            <div className="bg-welcome-hoteles text-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs="12" lg="3">
                            <h1 className="text-white">219k</h1>
                            <label className="text-uppercase text-white d-block label-welcome-hoteles">hoteles</label>
                        </Col>
                        <Col xs="12" lg="3">
                            <h1 className="text-white">+80</h1>    
                            <label className="text-uppercase text-white d-block label-welcome-hoteles">países</label>
                        </Col>
                        <Col xs="12" lg="3">
                            <h1 className="text-white">4 <BsStarFill className="mb-1"/></h1>    
                            <label className="text-uppercase text-white d-block label-welcome-hoteles">estrellas promedio</label>
                        </Col>
                        <Col xs="12" lg="3">
                            <h1 className="text-white">5%</h1>    
                            <label className="text-uppercase text-white d-block label-welcome-hoteles">por debajo de los precios públicos</label>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    )
}

export default WelcomeHotelesInfo