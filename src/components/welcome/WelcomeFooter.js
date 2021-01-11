import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import moment from 'moment'

function WelcomeFooter(){
    return(
        <section className="footer-welcome pb-5">
            <Container>
                <Row>
                    <Col xs="12" lg="5">
                        <p className="text-white">
                            ¿Sabe lo que desea en sus próximas vacaciones? JustgoNow.com permite organizar 
                            fácilmente las vacaciones a su medida, brindamos ideas y sugerencias para acortar su búsqueda.
                        </p>
                        <p className="text-white">
                        Desde noviembre de 2016, JustgoNow.com es experto en viajes online, adquiriendo experiencia necesaria para 
                        satisfacer sus necesidades vacacionales. ¡Tecnología, para facilitar la organización de sus vacaciones soñadas!
                        </p>
                        <p className="text-white">
                        Agradecemos la confianza que deposita en Just go Now, al hacer sus compras en línea. Al reservar sus vacaciones con nosotros, JustGoNow.com, 
                        también nos ocupamos en la seguridad, y confidencialidad en el 
                        cuidado y manejo de sus datos personales. Encontrará más información, en nuestra política de privacidad.
                        </p>
                    </Col>
                    <Col xs="12" lg="4">
                        <h4>Necesita ayuda? Llámenos, estamos a sus ordenes!</h4>
                        <ul className="list-unstyled">
                            <li><a href="!#" className="text-light">00 000 000 0000</a></li>
                            <li><a href="!#" className="text-light">(+52) 000-000-0000</a></li>
                        </ul>
                        <h4>Contáctenos, nos interesa conocer su opinión!</h4>
                        <ul className="list-unstyled">
                            <li><a href="!#" className="text-light">info@JustgoNow.com</a></li>
                        </ul>
                    </Col>
                    <Col xs="12" lg="3">
                        <h4>Sea de los primeros, en conocer nuestras ofertas!</h4>
                        <Button variant="dark" block className="text-left text-light" size="sm"><FaInstagram className="mb-1"/> Just Go Now</Button>
                        <Button variant="dark" block className="text-left text-light" size="sm"><FaFacebookF className="mb-1"/> Just Go Now</Button>
                        <Button variant="dark" block className="text-left text-light" size="sm"><FaTwitter className="mb-1"/> Just Go Now</Button>
                    </Col>
                </Row>
                <hr className="border-light"/>
                <Row>
                    <Col className="text-md-right">
                        <small>Just Go Now © {moment().format('YYYY')}</small>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default WelcomeFooter