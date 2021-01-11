import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import exp1 from '../../img/experiencias/exp1.png';
import exp2 from '../../img/experiencias/exp2.png';
import exp3 from '../../img/experiencias/exp3.png';
import exp4 from '../../img/experiencias/exp4.png';
import exp5 from '../../img/experiencias/exp5.png';
import exp6 from '../../img/experiencias/exp6.png';

function WelcomeExperienciasInfo(){
    return(
        <section className="py-5">
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-uppercase">EXPERIENCIAS</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" lg="4" className="mb-3">
                        <div className="hovereffect">
                            <Image src={exp1} fluid/>
                            <div className="overlay">
                                <h2 className="text-white text-uppercase">Cozumel</h2>
                            </div>
                        </div>
                    </Col>
                    <Col xs="6" lg="4" className="mb-3">
                        <div className="hovereffect">
                            <Image src={exp2} fluid/>
                            <div className="overlay">
                                <h2 className="text-white text-uppercase">nueva york</h2>
                            </div>
                        </div>
                    </Col>
                    <Col xs="6" lg="4" className="mb-3">
                        <div className="hovereffect">
                            <Image src={exp3} fluid/>
                            <div className="overlay">
                                <h2 className="text-white text-uppercase">paris</h2>
                            </div>
                        </div>
                    </Col>
                    <Col xs="6" lg="4" className="mb-3">
                        <div className="hovereffect">
                            <Image src={exp4} fluid/>
                            <div className="overlay">
                                <h2 className="text-white text-uppercase">ANDALUCIA Y COSTA DEL SOL</h2>
                            </div>
                        </div>
                    </Col>
                    <Col xs="6" lg="4" className="mb-3">
                        <div className="hovereffect">
                            <Image src={exp5} fluid/>
                            <div className="overlay">
                                <h2 className="text-white text-uppercase">Roma</h2>
                            </div>
                        </div>
                    </Col>
                    <Col xs="6" lg="4" className="mb-3">
                        <div className="hovereffect">
                            <Image src={exp6} fluid/>
                            <div className="overlay">
                                <h2 className="text-white text-uppercase">Las vegas</h2>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default WelcomeExperienciasInfo