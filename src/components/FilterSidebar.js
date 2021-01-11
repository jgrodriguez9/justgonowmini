import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import InputRange from 'react-input-range';
import { AiFillStar } from "react-icons/ai";

import 'react-input-range/lib/css/index.css'
import { formatNumber } from '../utils/formatNumber';
import { withTranslation } from 'react-i18next';

function FilterSidebar({t, searchList, mPrecio, mxPrecio,valuePrecio,showStars,showPrecio=true}){
    const [nombre, setNombre] = useState('')
    const [minPrecio, setMinPrecio] = useState(mPrecio)
    const [maxPrecio, setMaxPrecio] = useState(mxPrecio)
    const [rangePrecio, setRangePrecio] = useState(valuePrecio)
    const [stars, setStars] = useState([])

    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);


    const onChangeHandle = (checked, tipo) =>{
        let arr = [...stars]
        if(checked){
            if(arr.findIndex(elem=>elem===tipo) >= 0){
                searchList(arr, "stars")
            }else{
                arr.push(tipo)
                setStars(arr)
                searchList(arr, "stars")
            }
        }else{
            if(arr.findIndex(elem=>elem===tipo) >= 0){
                arr.splice(arr.findIndex(elem=>elem===tipo), 1)
                setStars(arr)
                searchList(arr, "stars")
            }
        }

    }
    return (
        <>
            <Row className="mb-5 justify-content-md-center">
                <Col xs="12" lg="10">
                    <label className="font-weight-bold">{t('Nombre')}</label>
                    <Form.Control 
                        type="text"
                        value={nombre}
                        onChange={e=>{
                            setNombre(e.target.value)
                            searchList(e.target.value, "nombre")
                        }}
                        placeholder={t('IngreseNombre')}
                    />
                </Col>
            </Row>
            {
                showPrecio &&
                <Row className="mb-5 justify-content-md-center">
                    <Col xs="12" lg="10">
                        <h4 className="text-uppercase mb-3">{t('FiltrosPopulares')}</h4>
                        <label className="font-weight-bold  mb-3">{t('Precio')}</label>
                        <InputRange
                            maxValue={maxPrecio}
                            minValue={minPrecio}
                            value={rangePrecio}
                            onChange={value => {
                                setRangePrecio(value)
                                searchList(value, "precio")
                            }} 
                            formatLabel={value => `${numberFormat2.format(value)} `}
                        />

                    </Col>
                </Row>
            }
            {   showStars===true &&

                <Row className="mb-5 justify-content-md-center">
                <Col xs="12" lg="10">
                    <label className="font-weight-bold">{t('Entrellas')}</label>
                    <Form.Check 
                        type='checkbox'
                        id={`check-todas`}
                        label={t('Todas')}
                        onChange={e=>{onChangeHandle(e.target.checked, "todas")}}
                    />                    
                    <Form.Check 
                        type='checkbox'
                        id={`check-1`}
                        label={<AiFillStar className="mb-1"/>}
                        onChange={e=>{onChangeHandle(e.target.checked, "1")}}
                    />
                    <Form.Check 
                        type='checkbox'
                        id={`check-1`}
                        label={<><AiFillStar className="mb-1"/><AiFillStar className="mb-1"/></>}
                        onChange={e=>{onChangeHandle(e.target.checked, "2")}}
                    /> 
                    <Form.Check 
                        type='checkbox'
                        id={`check-1`}
                        label={<><AiFillStar className="mb-1"/><AiFillStar className="mb-1"/><AiFillStar className="mb-1"/></>}
                        onChange={e=>{onChangeHandle(e.target.checked, "3")}}
                    />
                    <Form.Check 
                        type='checkbox'
                        id={`check-1`}
                        label={<><AiFillStar className="mb-1"/><AiFillStar className="mb-1"/><AiFillStar className="mb-1"/><AiFillStar className="mb-1"/></>}
                        onChange={e=>{onChangeHandle(e.target.checked, "4")}}
                    />
                    <Form.Check 
                        type='checkbox'
                        id={`check-1`}
                        label={<><AiFillStar className="mb-1"/><AiFillStar className="mb-1"/><AiFillStar className="mb-1"/><AiFillStar className="mb-1"/><AiFillStar className="mb-1"/></>}
                        onChange={e=>{onChangeHandle(e.target.checked, "5")}}
                    />                     
                </Col>
                </Row>
                

            }
            
        </>
    )
}

export default withTranslation()(FilterSidebar)