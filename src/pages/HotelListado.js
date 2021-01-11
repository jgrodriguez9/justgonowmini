import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
import useQuery from '../hook/useQuery';
import { HOTEL_LIST } from '../services/Routes';
import Post from '../services/Post';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import SectionTop from '../components/SectionTop';
import FormSidebar from '../components/FormSidebar';
import MapSidebar from '../components/MapSidebar';
import FilterSidebar from '../components/FilterSidebar';
import CardHorizontal from '../components/CardHorizontal';
import Pagination from 'rc-pagination';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import '../css/Pagination.css'
import { getCadena } from '../utils/getCadena';
import { getPrecio } from '../utils/getPrecio';

import dataTest from '../data/data.json'
import { getStars } from '../utils/getStars';
import EmptyItems from '../components/EmptyItems';
import ErrorServer from '../components/ErrorServer';
import SectionPromotionNY from '../components/SectionPromotionNY';
import PrecioBottom from '../components/PrecioBottom';
import { useHistory } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import CargandoOpciones from '../loader/CargandoOpciones';

function HotelListado({t, i18n}){
    const {auth} = useContext(authContext);
    const history = useHistory()
    const query = useQuery()
    const [data, setData] = useState(JSON.parse(query.get('search')))
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [itemsFilter, setItemsFilter] = useState([])
    const [minPrecio, setMinPrecio] = useState(0)
    const [maxPrecio, setMaxPrecio] = useState(100)
    const [valuePrecio, setValuePrecio] = useState({min: 1, max: 100})
    const [positions, setPositions] = useState([])
    const [errorServer, setErrorServer] = useState(false)
    const [errorData, setErrorData] = useState(null)
    const [errorStatus, setErrorStatus] = useState(null)
    const [total, setTotal] = useState(0)

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    useEffect(()=>{   
        setTotal(0)
        //console.log(i18n.language)
        data['language'] = `${i18n.language === 'es' ? 'CAS' : 'EN'}`
        //console.log(data)
        setData(data) 
        // console.log(dataTest.map(el=>({
        //     latitude: el.address.geolocation !==null ? el.address.geolocation.latitude : null,
        //     longitude: el.address.geolocation !==null ? el.address.geolocation.longitude : null
        // })))
        //console.log(dataTest)
        // let arr = dataTest.map(el=>{return el.totalByNight})
        // setMinPrecio(Math.min.apply(Math, arr))
        // setMaxPrecio(Math.max.apply(Math, arr))
        // setValuePrecio({min: Math.min.apply(Math, arr), max: Math.max.apply(Math, arr)})
        
        window.scrollTo(0, 0)
        //console.log(data)
        //setLoading(false)
        setErrorServer(false)
        setLoading(true)
        const urlHotelList = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${HOTEL_LIST}?sources=${process.env.REACT_APP_SUNAPI_APINAMEHOTEL}`
        Post({url: urlHotelList, data: data, access_token: auth.data.access_token, header: true})
        .then(response=>{
            //console.log(response)
            if(response.data.errors.length > 0 && response.data.hotels.length===0){
                setItems([])
                setItemsFilter([])
                setErrorData(response.data.errors)
                setErrorStatus(null)
                setErrorServer(true)
            }else{
                setItems(response.data.hotels.filter(elem=>elem.name!==null))
                setItemsFilter(response.data.hotels.filter(elem=>elem.name!==null))
                setTotal(response.data.hotels.filter(elem=>elem.name!==null).length)
                let arr = response.data.hotels.map(el=>{return el.totalByNight})
                if(response.data.hotels.filter(elem=>elem.name!==null).length > 0){
                    if(Math.min.apply(Math, arr) === Math.max.apply(Math, arr)){
                        setMinPrecio(Math.min.apply(Math, arr)-1)
                        setMaxPrecio(Math.max.apply(Math, arr))
                        setValuePrecio({min: Math.min.apply(Math, arr)-1, max: Math.max.apply(Math, arr)})
                    }else{
                        setMinPrecio(Math.min.apply(Math, arr))
                        setMaxPrecio(Math.max.apply(Math, arr))
                        setValuePrecio({min: Math.min.apply(Math, arr), max: Math.max.apply(Math, arr)})
                    }
                    
                }            
                //maps
                setPositions(response.data.hotels.filter(ele=>ele.name!==null && ele.address!==null && ele.address.geolocation!==null).map(el=>(
                    {
                        latitude: el.address.geolocation !==null ? el.address.geolocation.latitude : null,
                        longitude: el.address.geolocation !==null ? el.address.geolocation.longitude : null
                    }
                )))
            }  
            setLoading(false)
        })
        .catch(error=>{
            console.log(error)
            setErrorStatus(error.response)
            setErrorData(null)
            setErrorServer(true)
            setLoading(false)
        })
    },[i18n.language])

    const searchList = (valor, typeFilter, ) =>{
        //console.log(valor)
        //console.log(typeFilter)

        if(typeFilter==="nombre"){
            if(valor!==""){
                let arr = [...items]            
                setItemsFilter(arr.filter(elem=>getCadena(elem.name).includes(valor)))
            }else{
                setItemsFilter(items)
            }            
        }
        if(typeFilter==="precio"){
            let min = valor.min;
            let max = valor.max;
            let arr = [...items]
            setItemsFilter(arr.filter(elem=>getPrecio(elem.totalByNight) >= min && getPrecio(elem.totalByNight) <= max))          
        }else if(typeFilter==="stars"){
            console.log(valor)
            if(valor.includes("todas") || valor.length === 0){
                setItemsFilter(items)
            }else{
                let arr = [...items]
                setItemsFilter(arr.filter(el=>valor.includes(getStars(el.stars))))
            }
        }
    }

    const sendData = (data) =>{
        setTotal(0)
        window.scrollTo(0, 0)
        setLoading(true)
        //console.log(data)
        setData(data)
        const urlHotelList = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${HOTEL_LIST}?sources=${process.env.REACT_APP_SUNAPI_APINAMEHOTEL}`
        Post({url: urlHotelList, data: data, access_token: auth.data.access_token, header: true})
        .then(response=>{
            //console.log(response)
            if(response.data.errors.length > 0 && response.data.hotels.length===0){
                setItems([])
                setItemsFilter([])
                setErrorData(response.data.errors)
                setErrorStatus(null)
                setErrorServer(true)
            }else{
                setItems(response.data.hotels.filter(elem=>elem.name!==null))
                setItemsFilter(response.data.hotels.filter(elem=>elem.name!==null))
                setTotal(response.data.hotels.filter(elem=>elem.name!==null).length)
                let arr = response.data.hotels.filter(elem=>elem.name!==null).map(el=>{return el.totalByNight})
                if(response.data.hotels.filter(elem=>elem.name!==null).length > 0){
                    setMinPrecio(Math.min.apply(Math, arr))
                    setMaxPrecio(Math.max.apply(Math, arr))
                    setValuePrecio({min: Math.min.apply(Math, arr), max: Math.max.apply(Math, arr)})
                }            
                //maps
                setPositions(response.data.hotels.filter(ele=>ele.name!==null && ele.address!==null && ele.address.geolocation!==null).map(el=>(
                    {
                        latitude: el.address.geolocation !==null ? el.address.geolocation.latitude : null,
                        longitude: el.address.geolocation !==null ? el.address.geolocation.longitude : null
                    }
                )))
                setErrorServer(false)
            }
            setLoading(false)
        })
        .catch(error=>{
            console.log(error)
            setErrorStatus(error.response)
            setErrorServer(true)
            setLoading(false)
        })
    }

    
    const onHandleClickCard = (id, apiName, chain) =>{
        data['apiName'] = apiName;
        data['chain'] = chain;
        data['id'] = id;
        window.open(`/hotel/detail?search=${encodeURIComponent(JSON.stringify(data))}`, "_blank");
        //history.push(, )
    }

    const [amenities, setAmenities] = useState([])
    const [showAmenities, setShowAmenities] = useState(false)
    const handleClose = () => setShowAmenities(false);
    const onHandleClickAmenities = (amenities) =>{
        setAmenities(amenities)
        setShowAmenities(true)
    }


    return (
        <>
          <Modal size="lg" show={showAmenities} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t('Comodidades')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <span className="badge badge-pill badge-info">{t('NoCargoExtra')}</span>
                    <span className="badge badge-pill badge-danger">{t('TienenCargoExtra')}</span>
                </div>
                
                <ul className="list-inline">
                    {
                        amenities.length === 0 ?
                        <li className="list-inline-item">{t('NoDisponiblesComodidades')}</li> :
                        amenities.map((item,i)=>(
                            <li className="list-inline-item" key={i}><span className={`badge badge-pill ${item.extraCharge ? 'badge-danger' : 'badge-info'}`}>{item.name}</span></li>
                        ))
                    }
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    {t('Aceptar')}
                </Button>
            </Modal.Footer>
          </Modal>
          <SectionTop menu={t('Hoteles')} destino={data.destino_name} total={total} product={t('Hoteles')} />
          
          {
              loading ? <CargandoOpciones /> :
              <Container fluid className="mt-3">
                <Row>
                    <Col xs="12" lg="3">
                        <Row>
                            <Col xs="12" lg="12"><FormSidebar auth={auth} searching={data} sendData={sendData} showDestiny={true}/></Col>
                            <Col xs="12" lg="12">
                                <Row className="justify-content-center my-4">
                                    <Col xs="12" lg="10">
                                        {items.length > 0 && <MapSidebar positionsList={positions}/>}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="12" lg="12">
                                {items.length > 0 && <FilterSidebar 
                                    searchList={searchList} 
                                    mPrecio={minPrecio}
                                    mxPrecio={maxPrecio}
                                    valuePrecio={valuePrecio}
                                    showStars={true}
                                />}
                            </Col>
                        </Row>                      
                    </Col>
                    <Col xs="12" lg="9">
                            {(itemsFilter.length === 0 && !errorServer) && <EmptyItems /> }
                            {errorServer  && <ErrorServer errorData={errorData} errorStatus={errorStatus}/> }
                            { 
                                itemsFilter.slice(indexOfFirstPost, indexOfLastPost).map((item,i)=>(
                                    <CardHorizontal key={i} 
                                        item={item} 
                                        huespedesGet={data.rooms} 
                                        fechaStar={data.checkIn} 
                                        fechaEnd={data.checkOut}
                                        onHandleClickCard={onHandleClickCard}
                                        onHandleClickAmenities={onHandleClickAmenities}
                                    />
                                ))
                            }
                            <div>
                            {itemsFilter.length > 0 && <Pagination
                                onChange={page=>setCurrentPage(page)}
                                current={currentPage}
                                total={itemsFilter.length}
                                showLessItems
                                showTitle
                                pageSize={6}
                                className='pagination'
                                prevIcon={<BsChevronLeft />}
                                nextIcon={<BsChevronRight />}
                                jumpPrevIcon={<BiDotsHorizontalRounded />}
                                jumpNextIcon={<BiDotsHorizontalRounded />}
                            />}
                            </div>                      
                    </Col>
                </Row>
              </Container>
          }
          <SectionPromotionNY />
          <PrecioBottom />
        </>
    )
}

export default withTranslation()(HotelListado)