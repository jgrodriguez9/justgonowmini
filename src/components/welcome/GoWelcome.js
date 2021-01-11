import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function GoWelcome(){
    return(
        <section>
            <Container>
                <Row>
                    <Col xs="12" lg="10">
                        <h1 className="text-go-welcome text-right">GO!</h1>
                    </Col>
                </Row>
            </Container>            
        </section>
    )
}