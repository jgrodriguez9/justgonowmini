import React, { useEffect, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { withTranslation } from 'react-i18next'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdPeople } from 'react-icons/md'
import { calcTotalPaxes } from '../utils/calcTotalPaxes'

function Paxes({t, setPasajeros, pasajeros}){
    const [hTextP, setTextP] = useState(t('personas'))
    const [hTextS, setTextS] = useState(t('persona'))
    const [paxes, setPaxes] = useState(pasajeros)
    const [show, setShow] = useState(false)
    const [texto, setTexto] = useState(`${calcTotalPaxes(paxes)} ${hTextP}`)

    useEffect(()=>{
        setTextP(t('personas'))
        setTextS(t('persona'))
        let cad = texto.split(" ");
        let count = cad[0]
        if(parseInt(count) > 1 ){
            setTexto(`${cad[0]} ${t('personas')}`)
        }else{
            setTexto(`${cad[0]} ${t('persona')}`)
        }
    }, [t])

    const onHandleClickAdultMinus = (e) =>{
        //console.log(i)
        if(paxes.adults > 1){
            paxes.adults--
            setPaxes(paxes)
            setTexto(`${calcTotalPaxes(paxes)} ${calcTotalPaxes(paxes) > 1 ? hTextP : hTextS}`)
            setPasajeros(paxes)
        }else{
            //disabled btn
        }        
    }
    const onHandleClickAdultPlus = (e) =>{
        //console.log(i)
        if(paxes.adults < 8){
            paxes.adults++
            setPaxes(paxes)
            setTexto(`${calcTotalPaxes(paxes)} ${calcTotalPaxes(paxes) > 1 ? hTextP : hTextS}`)
            setPasajeros(paxes)
        }else{
            //disabled btn
        }     
    }

    const onHandleClickChildMinus = (e) =>{
        if(paxes.children > 0){
            paxes.children--
            setPaxes(paxes)
            setTexto(`${calcTotalPaxes(paxes)} ${calcTotalPaxes(paxes) > 1 ? hTextP : hTextS}`)
            setPasajeros(paxes)
        }else{
            //disabled btn
        }   
    }

    const onHandleClickChildPlus = (e) =>{
        if(paxes.children < 8){
            paxes.children++
            setPaxes(paxes)
            setTexto(`${calcTotalPaxes(paxes)} ${calcTotalPaxes(paxes) > 1 ? hTextP : hTextS}`)
            setPasajeros(paxes)
        }else{
            //disabled btn
        }  
    }

    return(
        <div className="input-control-huespedes">
            <Dropdown show={show} onToggle={e=>setShow(!show)}>
                <Dropdown.Toggle variant="success" className="dropdown-control-huespedes">
                    <MdPeople className="text-white mr-2 icon-24"/> <span>{texto}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100 rounded-0">
                    <div className="py-1 px-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <span>{t('Adultos')}</span>
                            <div className="d-flex justify-content-between">
                                <span className="btn-h btn-minus" onClick={onHandleClickAdultMinus}><FaMinus /></span>
                                <span className="adult-number">{paxes.adults}</span>
                                <span className="btn-h btn-plus" onClick={onHandleClickAdultPlus}><FaPlus /></span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="lh-1">
                                {t('Ninos')}
                            </span>
                            <div className="d-flex justify-content-between">
                                <span className="btn-h btn-minus" onClick={onHandleClickChildMinus}><FaMinus /></span>
                                <span className="adult-number">{paxes.children}</span>
                                <span className="btn-h btn-plus" onClick={onHandleClickChildPlus}><FaPlus /></span>
                            </div>
                        </div>
                        <Button block variant="primary" className="mt-4"  onClick={e=>setShow(false)}>
                            {t('Aceptar')}
                            <small className="d-block">{texto}</small> 
                        </Button>
                    </div>                
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )

}

export default withTranslation()(Paxes)