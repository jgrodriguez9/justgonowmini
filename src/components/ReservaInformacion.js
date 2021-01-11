import React, { useEffect, useState } from 'react';
import { Accordion, Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { calcNumberPax } from '../utils/calcNumberPax';

function ReservaInformacion({t,onHandleClickReservacion,roomsHuespedes,setRoomsHuespedes,client,setClient,payment,setPayment,textoError,checkReserva,
    setCheckReserva,checkRJustG,setCheckRJustG}){
    const [cont, setCont] = useState(0)
   // console.log("roomInformation")
   // console.log(roomsHuespedes)

   useEffect(()=>{
    if(textoError.length > 0){
        window.scrollTo(0,150)
    }
   }, [textoError])

    const typeClient = (value, key) =>{
        //console.log(value)
        if(key==='name'){
            setClient(prevState=>({
                ...prevState,
                name: value
            }))
        }else if(key==='sname'){
            setClient(prevState=>({
                ...prevState,
                sName: value
            }))
        }else if(key==='lname'){
            setClient(prevState=>({
                ...prevState,
                lName: value
            }))
        }else if(key==='telClient'){
            setClient(prevState=>({
                ...prevState,
                telClient: value
            }))
        }else if(key==='eClient'){
            setClient(prevState=>({
                ...prevState,
                eClient: value
            }))
        }        
    }

    const typeHuespedes = (indexRoom, indexPax, paxes,value, key) =>{
        let arr  = [...roomsHuespedes]
        if(key==='name'){
            paxes.name = value
        }else if(key==='lname'){
            paxes.lastName = value
        }
        arr[indexRoom].paxesInformation[indexPax] = paxes
        setRoomsHuespedes(arr)
    }

    const typeCard = (value, key) =>{
        if(key==='titular'){
            //para donde va el titular
        }else if(key==='type_card'){
            setPayment(previous=>({
                ...previous,
                paymentType: value
            }))
        }else if(key==='no_card'){
            let objCreditCard = payment.creditCard
            objCreditCard.number = value
            setPayment(previous=>({
                ...previous,
                creditCard: objCreditCard
            }))
        }else if(key==='expireMonth'){
            let objCreditCard = payment.creditCard
            objCreditCard.expireMonth = value
            setPayment(previous=>({
                ...previous,
                creditCard: objCreditCard
            }))
        }else if(key==='expireMonth'){
            let objCreditCard = payment.creditCard
            objCreditCard.expireYear = value
            setPayment(previous=>({
                ...previous,
                creditCard: objCreditCard
            }))
        }
    }

    const yoSoyHuesped = (checked, isHuesped) =>{
        if(isHuesped){
            let obj = {name: `${client.name}${client.sName.length > 0 ? ` ${client.sName}` : ''}`, lastName: client.lName, type: "ADULT"}
            let arr = [...roomsHuespedes]
            arr[0].paxesInformation[0] = obj;
            setRoomsHuespedes(arr)
        }else{
            let obj = {name: ``, lastName: '', type: "ADULT"}
            let arr = [...roomsHuespedes]
            arr[0].paxesInformation[0] = obj;
            setRoomsHuespedes(arr)
        }        
    }
    



    return(
        <Card className="shadow-sm">
            <Card.Body>
                <Row className="mb-3">
                    <Col xs="12" lg="12">
                        <h1>{t('IntroduceDatos')}</h1>
                        <small className="d-block text-secondary">{t('IntroduceDatosParrafo')}</small>
                    </Col>
                </Row>
                {
                    textoError.length > 0 &&
                    <Alert variant="danger" className="py-2">
                        <ul className="mb-0">
                           {
                               textoError.map((item,i)=>(
                                   <li key={i}>{item}</li>
                               ))
                           } 
                        </ul>
                    </Alert>
                }
                <Row>
                    <Col xs="12" lg="12">
                        <Accordion defaultActiveKey="0">
                            <Card className="shadow-none border-0 bg-light card-reserva">
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    <h6>{t('InformacionHuespedPrincipal')}</h6>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Row>
                                            <Col xs="12" lg="4">
                                                <Form.Group>
                                                    <Form.Label>{t('Nombre')}*</Form.Label>
                                                    <Form.Control type="text" placeholder={t('NombrePlaceholder')} onChange={e=>typeClient(e.target.value, 'name')} />
                                                </Form.Group>
                                            </Col>
                                            <Col xs="12" lg="4">
                                                <Form.Group>
                                                    <Form.Label>{t('SegundoNombre')}</Form.Label>
                                                    <Form.Control type="text" placeholder={t('SegundoNombrePlaceholder')} onChange={e=>typeClient(e.target.value, 'sname')}/>
                                                </Form.Group>
                                            </Col>
                                            <Col xs="12" lg="4">
                                                <Form.Group>
                                                    <Form.Label>{t('Apellidos')}*</Form.Label>
                                                    <Form.Control type="text" placeholder={t('ApellidosPlaceholder')} onChange={e=>typeClient(e.target.value, 'lname')}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" lg="4">
                                                <Form.Group>
                                                    <Form.Label>{t('CorreoElectronico')}*</Form.Label>
                                                    <Form.Control type="email" placeholder={t('CorreoElectronicoPlaceholder')} onChange={e=>typeClient(e.target.value, 'eClient')}/>
                                                    <Form.Text className="text-muted">
                                                        {t('CorreoElectronicoParrafo')}
                                                    </Form.Text>
                                                </Form.Group>
                                            </Col>
                                            <Col xs="12" lg="4">
                                                <Form.Group>
                                                    <Form.Label>{t('Telefono')}*</Form.Label>
                                                    <Form.Control type="text" placeholder={t('TelefonoPlaceholder')} onChange={e=>typeClient(e.target.value, 'telClient')}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" lg="12">
                                                <label className="d-block">{t('ParaQuienReserva')}</label>
                                                <Form.Check 
                                                    type='radio'
                                                    id='radio-1'
                                                    label={t('HuespedPrincipal')}
                                                    name="radio"
                                                    className="text-secondary"
                                                    onChange={e=>yoSoyHuesped(e.target.checked, true)}
                                                />
                                                <Form.Check 
                                                    type='radio'
                                                    id='radio-2'
                                                    label={t('OtraPersona')}
                                                    name="radio"
                                                    className="text-secondary"
                                                    onChange={e=>yoSoyHuesped(e.target.checked, false)}
                                                />
                                            </Col>
                                        </Row>

                                        <Row className="mt-4">
                                            <Col xs="12" lg="12">
                                                <Accordion defaultActiveKey="1">
                                                    {
                                                        roomsHuespedes.map((item,i)=>(
                                                            <Card className="shadow-none" key={i}>
                                                                <Accordion.Toggle as={Card.Header} eventKey={i+1}>
                                                                    <h6>{`${t('Habitacion')} ${i+1}`}</h6>
                                                                </Accordion.Toggle>
                                                                <Accordion.Collapse eventKey={i+1}>
                                                                    <Card.Body>
                                                                        {
                                                                            item.paxesInformation.map((paxes, pI)=>(
                                                                            <Row key={pI}>
                                                                                <Col xs="12" lg="12">
                                                                                    <label className="font-weight-bold">{`${paxes.type==='ADULT' ? t('Adulto') : t('Nino')} ${calcNumberPax(paxes, pI,item.paxesInformation)}`}</label>
                                                                                </Col>
                                                                                <Col xs="12" lg="6">
                                                                                    <Form.Group>
                                                                                        <Form.Label>{t('Nombre')}*</Form.Label>
                                                                                        <Form.Control 
                                                                                            type="text" 
                                                                                            placeholder={t('NombrePlaceholder')}
                                                                                            value={paxes.name}
                                                                                            onChange={e=>typeHuespedes(i, pI, paxes,e.target.value, 'name')} 
                                                                                        />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                                <Col xs="12" lg="6">
                                                                                    <Form.Group>
                                                                                        <Form.Label>{t('Apellidos')}*</Form.Label>
                                                                                        <Form.Control 
                                                                                            type="text" 
                                                                                            placeholder={t('ApellidosPlaceholder')} 
                                                                                            value={paxes.lastName}
                                                                                            onChange={e=>typeHuespedes(i, pI, paxes, e.target.value, 'lname')}
                                                                                        />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            </Row>
                                                                            ))
                                                                        }
                                                                    </Card.Body>
                                                                </Accordion.Collapse>
                                                            </Card>
                                                        ))
                                                    }
                                                </Accordion>                                                
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>                            
                        </Accordion>
                    </Col>
                    <Col xs="12" lg="12">
                    <Accordion>
                        <Card className="shadow-none border-0 bg-light card-reserva">
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <h6>{t('InformacionPago')}</h6>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {/* <Row className="mb-3">
                                        <Col xs="12" lg="4">
                                            <Form.Group>
                                                <Form.Label>País/Región*</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs="12" lg="4">
                                            <Form.Group>
                                                <Form.Label>Teléfono(móvil de preferencia)</Form.Label>
                                                <Form.Control type="text" placeholder="1 800 42-6587" onChange={e=>typeCard(e.target.value, 'telef')}/>
                                            </Form.Group>
                                        </Col>
                                    </Row> */}
                                    <Row>
                                        <Col xs="12" lg="12">
                                            <Alert variant="info">
                                            {t('InformacionPagoParrafo')}
                                            </Alert>
                                        </Col>
                                        <Col xs="12" lg="6">
                                            <Form.Group>
                                                <Form.Label>{t('TitularTarjeta')}*</Form.Label>
                                                <Form.Control type="text" onChange={e=>typeCard(e.target.value, 'titular')}/>
                                            </Form.Group>
                                        </Col>
                                        <Col xs="12" lg="4">
                                            <Form.Group>
                                                <Form.Label>{t('TipoTarjeta')}*</Form.Label>
                                                <Form.Control as="select" onChange={e=>typeCard(e.target.value, 'type_card')}>
                                                    <option value="CREDIT_CARD">Crédito</option>
                                                    <option value="DEBIT_CARD">Débito</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" lg="6">
                                            <Form.Group>
                                                <Form.Label>{t('NumeroTarjeta')}*</Form.Label>
                                                <Form.Control type="text" onChange={e=>typeCard(e.target.value, 'no_card')}/>
                                            </Form.Group>                                            
                                        </Col>
                                        <Col xs="12" lg="2">
                                            <Form.Group>
                                                <Form.Label>{t('Mes')}*</Form.Label>
                                                <Form.Control as="select" onChange={e=>typeCard(e.target.value, 'expireMonth')}>
                                                    <option value="01">{t('Enero')}</option>
                                                    <option value="02">{t('Febrero')}</option>
                                                    <option value="03">{t('Marzo')}</option>
                                                    <option value="04">{t('Abril')}</option>
                                                    <option value="05">{t('Mayo')}</option>
                                                    <option value="06">{t('Junio')}</option>
                                                    <option value="07">{t('Julio')}</option>
                                                    <option value="08">{t('Agosto')}</option>
                                                    <option value="09">{t('Septiembre')}</option>
                                                    <option value="10">{t('Octubre')}</option>
                                                    <option value="11">{t('Noviembre')}</option>
                                                    <option value="12">{t('Diciembre')}</option>
                                                </Form.Control>
                                            </Form.Group>                                            
                                        </Col>
                                        <Col xs="12" lg="2">
                                            <Form.Group>
                                                <Form.Label>{t('Ano')}*</Form.Label>
                                                <Form.Control as="select" onChange={e=>typeCard(e.target.value, 'expireYear')}>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                </Form.Control>
                                            </Form.Group>                                            
                                        </Col>
                                        <Col xs="12" lg="2">
                                            <Form.Group>
                                                <Form.Label>{t('Codigo')} CVV*</Form.Label>
                                                <Form.Control type="number" />
                                            </Form.Group>                                            
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" lg="12">
                                            <Form.Check 
                                                type='checkbox'
                                                id='check-1'
                                                label={t('Politica1')}
                                                className="text-secondary"
                                                checked={checkReserva}
                                                onChange={e=>setCheckReserva(e.target.checked)}
                                            />
                                            <Form.Check 
                                                type='checkbox'
                                                id='check-2'
                                                label={t('Politica2')}
                                                className="text-secondary"
                                                checked={checkRJustG}
                                                onChange={e=>setCheckRJustG(e.target.checked)}
                                            />
                                        </Col>
                                        <Col xs="12" lg="3">
                                            <Button variant="primary" className="font-weight-bold mt-4" onClick={onHandleClickReservacion}>{t('CompletarReservacion')}</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>                            
                    </Accordion>
                    </Col>
                </Row>
            </Card.Body>
        </Card>        
    );
}

export default withTranslation()(ReservaInformacion)