import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
import useQuery from '../hook/useQuery';
import { TOUR_LIST } from '../services/Routes';
import Post from '../services/Post';
import { Col, Container, Row } from 'react-bootstrap';
import SectionTop from '../components/SectionTop';

import MapSidebar from '../components/MapSidebar';
import FilterSidebar from '../components/FilterSidebar';
import CardExperienciasHorizontal from '../components/CardExperienciasHorizontal';
import Pagination from 'rc-pagination';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import '../css/Pagination.css'
import CargandoOpciones from '../loader/CargandoOpciones';
import EmptyItems from '../components/EmptyItems';
import ErrorServer from '../components/ErrorServer';
import SectionPromotionNY from '../components/SectionPromotionNY';
import PrecioBottom from '../components/PrecioBottom';
import { getCadena } from '../utils/getCadena';
import { getPrecio } from '../utils/getPrecio';
import FormExperienceSidebar from '../components/FormExperienceSidebar';
import { useHistory } from 'react-router-dom';

function ExperienciasListado(){
    const {auth} = useContext(authContext);
    const history = useHistory()
    const query = useQuery()
    const data = JSON.parse(query.get('search'))
    const [dataSearch, setDataSearch] = useState(null)
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [itemsFilter, setItemsFilter] = useState([])
    const [minPrecio, setMinPrecio] = useState(0)
    const [maxPrecio, setMaxPrecio] = useState(100)
    const [positions, setPositions] = useState([])
    const [errorServer, setErrorServer] = useState(false)
    const [errorData, setErrorData] = useState(null)
    const [valuePrecio, setValuePrecio] = useState({min: 1, max: 100})
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    useEffect(()=>{     
        window.scrollTo(0, 0)
        setDataSearch(data)   
        // console.log(dataTest.map(el=>({
        //     latitude: el.address.geolocation !==null ? el.address.geolocation.latitude : null,
        //     longitude: el.address.geolocation !==null ? el.address.geolocation.longitude : null
        // })))
        //console.log(dataTest)
        // let arr = dataTest.map(el=>{return el.totalByNight})
        // setMinPrecio(Math.min.apply(Math, arr))
        // setMaxPrecio(Math.max.apply(Math, arr))
        // setValuePrecio({min: Math.min.apply(Math, arr), max: Math.max.apply(Math, arr)})


        
        //setLoading(false)
        setErrorServer(false)
        setLoading(true)
        const urlHotelList = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${TOUR_LIST}?sources=${process.env.REACT_APP_SUNAPI_APINAMETOUR}`
        Post({url: urlHotelList, data: data, access_token: auth.data.access_token, header: true})
        .then(response=>{
            console.log(response)
            if(response.data.errors.length > 0 && response.data.activities.length===0){
                setErrorData(response.data.errors)
                setErrorServer(true)
            }else{
                setItems(response.data.activities)
                setItemsFilter(response.data.activities)
                let arr = response.data.activities.map(el=>{return el.minRates.adult})
                if(response.data.activities.length > 0){
                    setMinPrecio(Math.min.apply(Math, arr))
                    setMaxPrecio(Math.max.apply(Math, arr))
                    setValuePrecio({min: Math.min.apply(Math, arr), max: Math.max.apply(Math, arr)})
                }            
                //maps
                setPositions(response.data.activities.filter(ele=>ele.address!==null && ele.address.geolocation!==null).map(el=>(
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
            setErrorServer(true)
            setLoading(false)
        })
    },[])

    const searchList = (valor, typeFilter, ) =>{
        if(typeFilter==="nombre"){
            if(valor!==""){
                let arr = [...items]      
                setItemsFilter(arr.filter(elem=>getCadena(elem.name).includes(valor.toLowerCase())))
            }else{
                setItemsFilter(items)
            }            
        }
        if(typeFilter==="precio"){
            let min = valor.min;
            let max = valor.max;
            let arr = [...items]
            setItemsFilter(arr.filter(elem=>getPrecio(elem.minRates.adult) >= min && getPrecio(elem.minRates.adult) <= max))          
        }
       
    }
    const sendData = (data) =>{
        setLoading(true)
        const urlHotelList = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${TOUR_LIST}?sources=${process.env.REACT_APP_SUNAPI_APINAMETOUR}`
        Post({url: urlHotelList, data: data, access_token: auth.data.access_token, header: true})
        .then(response=>{
            console.log(response)
            if(response.data.errors.length > 0 && response.data.activities.length===0){
                setErrorData(response.data.errors)
                setErrorServer(true)
            }else{
                setItems(response.data.activities)
                setItemsFilter(response.data.activities)
                let arr = response.data.activities.map(el=>{return el.minRates.adult})
                if(response.data.activities.length > 0){
                    setMinPrecio(Math.min.apply(Math, arr))
                    setMaxPrecio(Math.max.apply(Math, arr))
                    setValuePrecio({min: Math.min.apply(Math, arr), max: Math.max.apply(Math, arr)})
                }            
                //maps
                setPositions(response.data.activities.filter(ele=>ele.address!==null && ele.address.geolocation!==null).map(el=>(
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
            setErrorServer(true)
            setLoading(false)
        })
    }
    const onHandleClickCard = (id, source) =>{
        data['apiName'] = source;
        data['chain'] = '';
        data['id'] = id;
        window.open(`/experience/detail?search=${encodeURIComponent(JSON.stringify(data))}`, "_blank");
        //history.push(`/experience/detail?search=${encodeURIComponent(JSON.stringify(data))}`)
    }
    return (
        <>
          <SectionTop menu='Experiencias' destino={data.destino_name} total={items.length} product='Experiencias'/>
          
          {
              loading ? <CargandoOpciones /> :
              <Container fluid className="mt-3">
                <Row>
                    <Col xs="12" lg="3">
                        <Row>
                            <Col xs="12" lg="12"><FormExperienceSidebar auth={auth} searching={data} sendData={sendData} showDestiny={true}/> </Col>
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
                                    showStars={false}
                                />}
                            </Col>
                        </Row>                      
                    </Col>
                    <Col xs="12" lg="9">
                            {(itemsFilter.length === 0 && !errorServer) && <EmptyItems /> }
                            {errorServer  && <ErrorServer errorData={errorData} /> }
                            { 
                                itemsFilter.slice(indexOfFirstPost, indexOfLastPost).map((item,i)=>(
                                    <CardExperienciasHorizontal key={i} item={item} fechaStart={data.checkIn}  onHandleClickCard={onHandleClickCard}/>
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

export default ExperienciasListado