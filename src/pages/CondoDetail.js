import React,{useState, useContext, useEffect} from 'react';

import Post from '../services/Post';
import { Col, Container, Row, Tabs, Tab, Image, Table} from 'react-bootstrap';
import useQuery from '../hook/useQuery';
import SectionTopDetail from '../components/SectionTopDetail';
import CargandoOpciones from '../loader/CargandoOpciones';
import SectionPromotionNY from '../components/SectionPromotionNY';
import PrecioBottom from '../components/PrecioBottom';
import { authContext } from '../context/AuthContext';
import CondosFormTopBar from '../components/condos/CondosFormTopBar';
import {CONDOS_DETAIL} from '../services/Routes';
import ErrorServer from '../components/ErrorServer';

import response from '../data/condos/detalleCondominios.json'
import CondosFormSideBar from '../components/condos/CondosFormSideBar';
import MapSidebar from '../components/MapSidebar';

import '../css/condos/CondosDetail.css'

function CondoDetail(){
    const query = useQuery();
    const {auth} = useContext(authContext);
    const data = JSON.parse(query.get('search'));
    const [loading, setLoading] = useState(true)
    const [serverError, setServerError] = useState(false)
    const [positions, setPositions] = useState([])
    const [photos, setPhotos] = useState([])
    const [amenities, setAmenities] = useState([])
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const appiVersion = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}`;
        const urlService = `${appiVersion}${CONDOS_DETAIL}`;
        const accesToken = `${auth.data.access_token}`;

        /*let arrP = [
            {
                latitude: response.address.geolocation.latitude,
                longitude: response.address.geolocation.longitude
            }
        ]
        setPositions(arrP)  
        setPhotos(response.photos)
        setAmenities(response.amenities)
        setRooms(response.rooms)*/

        Post({url:urlService, data:data, access_token:accesToken, header:true})
        .then( (resp) => {
            console.log("---------------");
            console.log(resp.data)
            console.log("---------------");
            let arrP = [
                {
                    latitude: resp.data.address.geolocation.latitude,
                    longitude: resp.data.address.geolocation.longitude
                }
            ]
            setPositions(arrP)  
            setPhotos(resp.data.photos)
            setAmenities(resp.data.amenities)
            setRooms(resp.data.rates)
        } ).catch( (error) => {
            setServerError(true)
            console.log("Error en la Peticion",error);
        });

        setLoading(false);

    }, []);


    const changeItem = (e) => {
        document.querySelectorAll('.internalItem').forEach( (item) => item.classList.remove('itemActive') );
        e.target.className = 'internalItem itemActive';
    }



    return (
        <>
            <SectionTopDetail menu='Hotel' destino={response.name} nombre={response.name} direccion={response.address ? response.address.addressName : ''}/>
            
            {
                (loading == true)
                ? <CargandoOpciones />
                : (serverError == true)
                    ? <Container fluid>
                        <Row>
                            <Col xs="12" lg="3">
                                <CondosFormSideBar auth={auth} searching={data}/>
                            </Col>
                            <Col xs="12" lg="9">
                                <ErrorServer errorData={null} />
                            </Col>
                        </Row>
                    </Container>
                    :<Container fluid className="content">
                        <CondosFormTopBar auth={auth} searching={data}/>

                        <Tabs defaultActiveKey="detalle" id="uncontrolled-tab-example">
                            <Tab eventKey="tarifas" title="Tarifas">
                                {
                                    rooms.map( (room) => (
                                        <Table bordered >
                                            <thead>
                                                <tr>
                                                    <th colSpan="3">Semana: {room.effectiveDate} al {room.expireDate}</th>
                                                </tr>
                                                <tr>
                                                    <th width="40%">Habitación</th>
                                                    <th width="40%" class="text-center">Total</th>
                                                    <th width="20%" class="text-center"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {room.type}
                                                        <br/>
                                                        Capacidad máxima: {room.roomDescription[0].maxCapacity} personas
                                                    </td>
                                                    <td>
                                                        <div>${room.amountDetail.total} USD</div>
                                                    </td>
                                                    <td>
                                                        <button>RESERVAR</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    ))
                                }
                            </Tab>
                            <Tab eventKey="detalle" title="Detalle">
                                <Row>
                                    <Col xs="12" lg="6">
                                        <Row>
                                            <Col xs="12" lg="12">
                                               <h2>COMODIDADES</h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <br/>
                                            {amenities.map( (am) =>( 
                                                <Col xs="6" lg="6">
                                                    {am.name}
                                                </Col>
                                            ) )}
                                        </Row>
                                    </Col>
                                    <Col xs="12" lg="6">
                                        <MapSidebar positionsList={positions}/>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="galeria" title="Galeria">
                               <Row>
                                {photos.map( (photo) =>( 
                                        <Col xs="6" lg="6">
                                            <Image src={photo.url != null ? photo.url.replace(' ','') : ''} fluid className="h-100p object-cover"/>
                                        </Col>
                                    ))}
                               </Row>
                            </Tab>
                        </Tabs>

                    </Container>
            }
            
            <SectionPromotionNY />
            <PrecioBottom />
        </>
    );

}

export default CondoDetail