import React, {useState, useEffect, useContext} from 'react';
import { authContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import useQuery from '../hook/useQuery';
import SectionTop from '../components/SectionTop';
import CargandoOpciones from '../loader/CargandoOpciones';
import SectionPromotionNY from '../components/SectionPromotionNY';
import PrecioBottom from '../components/PrecioBottom';
import {CONDOS_LIST} from '../services/Routes';
import Post from '../services/Post';
import ErrorServer from '../components/ErrorServer';
import CondosFormSideBar from '../components/condos/CondosFormSideBar';
import MapSidebar from '../components/MapSidebar';
import FilterSidebar from '../components/FilterSidebar';
import { getCadena } from '../utils/getCadena';
import { getPrecio } from '../utils/getPrecio';
import { getStars } from '../utils/getStars';
import EmptyItems from '../components/EmptyItems';
import CardCondos from '../components/condos/CardCondos';
import '../css/Pagination.css'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Pagination from 'rc-pagination';


import response from '../data/condos/condosList.json'


function CondosListado(){
    const {auth} = useContext(authContext);
    const history = useHistory();
    const query = useQuery();
    const data = JSON.parse(query.get('search'));

    const [loading, setLoading] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [items, setItems] = useState([]);
    const [itemsFilter, setItemsFilter] = useState([])
    const [minPrecio, setMinPrecio] = useState(0)
    const [maxPrecio, setMaxPrecio] = useState(100)
    const [valuePrecio, setValuePrecio] = useState({min: 1, max: 100})
    const [positions, setPositions] = useState([])
    const [errorData, setErrorData] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [starFilter,setStarFilter] = useState(false);
    const [condosTotal,setCondosTotal] = useState(0);
    const [precioFilter,setPrecioFilter] = useState(true);
    const postsPerPage = 6;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

   useEffect( ()=>{
    window.scrollTo(0, 0);
    setErrorServer(false);
    setLoading(true);

    
    const appiVersion = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}`;
    const globalizador = `${process.env.REACT_APP_SUNAPI_APINAMECONDOS}`;
    const urlService = `${appiVersion}${CONDOS_LIST}?sources=${globalizador}`;
    const accesToken = `${auth.data.access_token}`;
     
    
   Post({url:urlService, data:data, access_token:accesToken, header:true})
    .then( (response) => {
        let data = response.data;
        let condos = data.hotels;
        let newCondos = [];

        condos.map((condo) => {
           let ar = newCondos.filter((c) => c.id === condo.id);
           if(ar.length === 0)
               newCondos.push(condo)
        });

        if(data.f_stars != null && data.f_stars.length>0)
            setStarFilter(true)

        if(data.minPrice === data.maxPrice)
            setPrecioFilter(false);

        setItems(newCondos);
        setItemsFilter(newCondos);
        setMinPrecio(data.minPrice);
        setMaxPrecio(data.maxPrice);
        setValuePrecio({min: data.minPrice, max: data.maxPrice});
        setCondosTotal(newCondos.length);

        setPositions(condos.filter((condo) => condo.address !== null && condo.address.geolocation !== null).map((el)=>(
            {
                latitude: el.address.geolocation !==null ? el.address.geolocation.latitude : null,
                longitude: el.address.geolocation !==null ? el.address.geolocation.longitude : null
            }
        )));

        setLoading(false);
    } )
    .catch( (ex) => {
        console.error("ERROR!!!",ex);
        setErrorServer(true);
        setLoading(false);
    } );

   }, [] );


    const searchList = (valor, typeFilter, ) =>{
        if(typeFilter==="nombre"){
            if(valor!==""){
                let arr = [...items]       
                setItemsFilter(arr.filter((elem)=>getCadena(elem.name).includes(valor)));
            }else{
                setItemsFilter(items)
            }            
        }

        if(typeFilter==="precio"){
            let min = valor.min;
            let max = valor.max;
            let arr = [...items]
            setItemsFilter(arr.filter((elem)=>getPrecio(elem.total) >= min && getPrecio(elem.total) <= max))  
        } else if(typeFilter==="stars") {
            if(valor.includes("todas") || valor.length === 0){
                setItemsFilter(items)
            }else{
                let arr = [...items]
                setItemsFilter(arr.filter(el=>valor.includes(getStars(el.stars))))
            }
        }
    }

    const onHandleClickCard = (id, source) =>{
        data['apiName'] = source;
        data['chain'] = '';
        data['id'] = id;
        history.push(`/condo/detail?search=${encodeURIComponent(JSON.stringify(data))}`)
    }

    return (
        <>
            <SectionTop menu='Condominios' destino={data.destino_name} total={condosTotal} product='Condominios' />
            
            {
                (loading == true) 
                ? <CargandoOpciones />
                : <Container fluid className="mt-3">
                    <Row>
                        <Col xs="12" lg="3">
                            <Row>
                                <Col xs="12" lg="12">
                                    <CondosFormSideBar auth={auth} searching={data}/>
                                </Col>
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
                                        showStars={starFilter}
                                        showPrecio={precioFilter}
                                    />}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="12" lg="9">
                            {(itemsFilter.length === 0 && !errorServer) && <EmptyItems />}
                            {errorServer  && <ErrorServer errorData={errorData} />}
                            { 
                                itemsFilter.slice(indexOfFirstPost, indexOfLastPost).map((item,i)=>(
                                    <CardCondos key={i} 
                                        item={item} 
                                        huespedesGet={data.rooms} 
                                        fechaStar={data.checkIn} 
                                        fechaEnd={data.checkOut}
                                        onHandleClickCard={onHandleClickCard}
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
    );
}

export default CondosListado