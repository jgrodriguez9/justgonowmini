import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function Go(){
    return(
        <section>
            <Container>
                <Row>
                    <Col xs="12" lg="10">
                        <h1 className="text-go text-right">GO!</h1>
                    </Col>
                </Row>
            </Container>            
        </section>
    )
}

export default Go