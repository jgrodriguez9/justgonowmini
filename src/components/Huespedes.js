import React, { useEffect, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import {FaMinus, FaPlus } from 'react-icons/fa'
import { MdPeople } from "react-icons/md";
import { calcTotalHuespedes } from '../utils/calcTotalHuespedes';
import { isSelected } from '../utils/isSelected';

function Huespedes({t, setHuespedesSend,huespedesSend}){
    const [hTextP, setTextP] = useState(t('huespedes'))
    const [hTextS, setTextS] = useState(t('huesped'))
    const [huespedes, setHuespedes] = useState(huespedesSend)
    const [show, setShow] = useState(false)
    const [texto, setTexto] = useState(`${calcTotalHuespedes(huespedes, 'hab')} hab., ${calcTotalHuespedes(huespedes, "adult")+calcTotalHuespedes(huespedes, "child")} ${hTextP}`)
    const proveedor = process.env.REACT_APP_SUNAPI_APINAMEHOTEL

    useEffect(()=>{
        setTextP(t('huespedes'))
        setTextS(t('huesped'))
        let cad = texto.split(",")[0]+","+texto.split(",")[1].substring(0,3);
        let count = texto.split(",")[1].substring(1,3)
        if(parseInt(count) > 1){
            cad += t('huespedes')
        }else{
            cad += t('huesped')
        }
        setTexto(cad)
    },[t])

    const onHandleClickAdultMinus = (i) =>{
        //console.log(i)
        let  obj = [...huespedes]
        let adult = obj[i].adults
        if(proveedor==='RateHawk'){
            if(adult > 1){
                adult--;
            obj.forEach(elem=>{
                elem.adults = adult
            })
            setHuespedes(obj)
            setTexto(`${calcTotalHuespedes(obj, 'hab')} hab., ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child")} ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child") > 1 ? hTextP : hTextS}`)
            setHuespedesSend(obj)
            }
            
        }else{
            if(adult > 1){
                adult--;
                obj[i].adults = adult;
                setHuespedes(obj)
                setTexto(`${calcTotalHuespedes(obj, 'hab')} hab., ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child")} ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child") > 1 ? hTextP : hTextS}`)
                setHuespedesSend(obj)
            }
        }       
    }
    const onHandleClickAdultPlus = (i) =>{
        //console.log(i)
        let  obj = [...huespedes]
        let adult = obj[i].adults
        if(proveedor==='RateHawk'){
            if(adult < 6){
                adult++;
                obj.forEach(elem=>{
                    elem.adults = adult
                })
                setHuespedes(obj)
                setTexto(`${calcTotalHuespedes(obj, 'hab')} hab., ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child")} ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child") > 1 ? hTextP : hTextS}`)
                setHuespedesSend(obj)
            }

        }else{
            if(adult < 6){
                adult++;
                obj[i].adults = adult;
                setHuespedes(obj)
                setTexto(`${calcTotalHuespedes(obj, 'hab')} hab., ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child")} ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child") > 1 ? hTextP : hTextS}`)
                setHuespedesSend(obj)
            }
        }
    }

    const onHandleClickChildMinus = (i) =>{
        let  obj = [...huespedes]
        let child  = obj[i].children.ages.length;
        if(proveedor==='RateHawk'){
            if(child>=1){
                obj.forEach(ele=>{
                    ele.children.ages.pop()
                })
                setHuespedes(obj)
                setTexto(`${calcTotalHuespedes(obj, 'hab')} hab., ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child")} ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child") > 1 ? hTextP : hTextS}`)
                setHuespedesSend(obj)
            }
        }else{
            if(child>=1){
                obj[i].children.ages.pop()
                setHuespedes(obj)
                setTexto(`${calcTotalHuespedes(obj, 'hab')} hab., ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child")} ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child") > 1 ? hTextP : hTextS}`)
                setHuespedesSend(obj)
            }
        }        
    }
    const onHandleClickChildPlus = (i) =>{
        let  obj = [...huespedes]
        let child  = obj[i].children.ages.length;
        if(proveedor==='RateHawk'){
            if(child<4){
                obj.forEach(ele=>{
                    ele.children.ages.push(0)
                })
                setHuespedes(obj)
                setTexto(`${calcTotalHuespedes(obj, 'hab')} hab., ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child")} ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child") > 1 ? hTextP : hTextS}`)
                setHuespedesSend(obj)
            }
        }else{
            if(child<4){
                obj[i].children.ages.push(0)
                setHuespedes(obj)
                setTexto(`${calcTotalHuespedes(obj, 'hab')} hab., ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child")} ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child") > 1 ? hTextP : hTextS}`)
                setHuespedesSend(obj)
            }
        }
    }

    const onHandleChangeAge = (indexParent, indexChild, value) => {
        let obj = [...huespedes]
        obj[indexParent].children.ages[indexChild] = parseInt(value)
        setHuespedes(obj)
        setHuespedesSend(obj)
    }

    const onHandleClickAddHabitacion = e =>{
        let obj = [...huespedes];
        let hab = obj.length;

        if(hab<5){
            if(proveedor==='RateHawk'){
                let newObj = {
                    "adults": obj[0].adults,      
                    "children": {
                        "ages": obj[0].children.ages.map(item=>{return 0})
                    }
                }
                obj.push(newObj)
                setHuespedes(obj)
                setTexto(`${calcTotalHuespedes(obj, 'hab')} hab., ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child")} ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child") > 1 ? hTextP : hTextS}`)
                setHuespedesSend(obj)
            }else{
                let newObj = {
                    "adults": 2,      
                    "children": {
                        "ages": []
                  }
                }
                obj.push(newObj)
                setHuespedes(obj)
                setTexto(`${calcTotalHuespedes(obj, 'hab')} hab., ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child")} ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child") > 1 ? hTextP : hTextS}`)
                setHuespedesSend(obj)
            }            
        }
    }

    const onHandleClickDelHabitacion = (i) =>{
        let obj = [...huespedes]
        let hab = obj.length;
        if(hab>1){
            obj.pop()
            setHuespedes(obj)
            setTexto(`${calcTotalHuespedes(obj, 'hab')} hab., ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child")} ${calcTotalHuespedes(obj, "adult")+calcTotalHuespedes(obj, "child") > 1 ? hTextP : hTextS}`)
            setHuespedesSend(obj)
        }
    }

    return(
        <div className="input-control-huespedes">
            <Dropdown show={show} onToggle={e=>setShow(!show)}>
                <Dropdown.Toggle variant="success" className="dropdown-control-huespedes shadow-none">
                    <MdPeople className="text-white mr-2 icon-24"/> <span>{texto}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100 rounded-0">
                    <div className="py-1 px-3">
                    {
                        huespedes.map((item,i)=>(
                            <div key={i}>
                                <h6 className={`${i > 0 && 'mt-3'}`}>{t('Habitacion')} {i+1}</h6>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>{t('Adultos')}</span>
                                    <div className="d-flex justify-content-between">
                                        {
                                            (proveedor !== 'RateHawk' || i === 0) ?
                                            <span className={`btn-h btn-minus ${item.adults === 1 ? 'disabled' : ''}`} onClick={e=>onHandleClickAdultMinus(i)}><FaMinus /></span>
                                            :<span className={`btn-h btn-minus disabled`}><FaMinus /></span>
                                        }
                                        <span className="adult-number">{item.adults}</span>
                                        {
                                            (proveedor !== 'RateHawk' || i === 0) ?
                                            <span className={`btn-h btn-plus ${item.adults === 6 ? 'disabled' : ''}`} onClick={e=>onHandleClickAdultPlus(i)}><FaPlus /></span>
                                            : <span className={`btn-h btn-plus disabled`}><FaPlus /></span>
                                        }
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="lh-1">
                                        {t('Ninos')}
                                        <small className="d-block">{t('NinosRangoEdad')}</small>
                                    </span>
                                    <div className="d-flex justify-content-between">
                                        {
                                            (proveedor !== 'RateHawk' || i === 0) ?
                                            <span className={`btn-h btn-minus ${item.children.ages.length === 0 ? 'disabled' : ''}`} onClick={e=>onHandleClickChildMinus(i)}><FaMinus /></span>
                                            : <span className={`btn-h btn-minus disabled`}><FaMinus /></span>
                                        }
                                        <span className="adult-number">{item.children.ages.length}</span>
                                        {
                                            (proveedor !== 'RateHawk' || i === 0) ?
                                            <span className={`btn-h btn-plus ${item.children.ages.length === 4 ? 'disabled' : ''}`} onClick={e=>onHandleClickChildPlus(i)}><FaPlus /></span>
                                            : <span className={`btn-h btn-plus disabled`}><FaPlus /></span>
                                        }
                                    </div>
                                </div>
                                {
                                    item.children.ages.map((itemChild, idx)=>(
                                        <div className="d-flex justify-content-between align-items-center" key={idx}>
                                            <span className="ft-08rem">{`${t('EdadNino')} ${idx+1}`}</span>
                                            <select className="ft-08rem" onChange={e=>onHandleChangeAge(i, idx, e.target.value)} defaultValue={itemChild}>
                                                <option value="0">{t('NinosMenosDe')} 1</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                        </div>
                                    ))
                                }
                                { huespedes.length > 1 &&    
                                    <div className="text-right mt-1">
                                        <Button variant="link" size="sm" className="p-0 shadow-none" onClick={e=>onHandleClickDelHabitacion(i)}>{t('EliminarHabitación')}</Button>
                                    </div>
                                }        
                            </div>
                        ))
                    }
                        
                        { huespedes.length < 5 && 
                            <div className="text-right mt-1">
                                <Button variant="link" size="sm" className="p-0 shadow-none" onClick={onHandleClickAddHabitacion}>{t('AgregarHabitación')}</Button>
                            </div>
                        }
                        <Button block variant="primary" className="mt-2 shadow-none"  onClick={e=>setShow(false)}>
                            {t('Aceptar')}
                            <small className="d-block">{texto}</small> 
                        </Button>

                    </div>
                
                </Dropdown.Menu>
            </Dropdown>
            
        </div>
    );
}

export default withTranslation()(Huespedes)