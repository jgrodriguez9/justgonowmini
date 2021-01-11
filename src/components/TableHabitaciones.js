import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import GetMealPlan from '../utils/getMealPlan';
import moment from 'moment'
import { formatNumber } from '../utils/formatNumber';
import AmenitiesRoomDetalle from './AmenitiesRoomDetalle';
import { FaInfoCircle } from 'react-icons/fa';
import { withTranslation } from 'react-i18next';

function TableHabitaciones({t,rates, onHandleClickReservar}){
    const [show, setShow] = useState(false)
    const [showTaxes, setShowTaxes] = useState(false)
    const [politicas, setPoliticas] = useState([])
    const [taxes, setTaxes] = useState([])

    const handleClose = () => setShow(false);
    const handleCloseTaxes = () => setShowTaxes(false);
    const [countShow, setCountShow] = useState(3)
    const [texto, setTexto] = useState(t('VerMas'))

    const onHandleClickPolitica = item =>{
        //console.log(item)
        setPoliticas(item.cancellationPolicies)
        setShow(true)
    }

    const onHandleClickTaxes = item =>{
        //console.log(item)
        setTaxes(item.taxes)
        setShowTaxes(true)
    }

    const showAll = e =>{
        if(countShow===1000){
            setTexto(t('VerMas'))
            setCountShow(3)
        }else{
            setTexto(t('VerMenos'))
            setCountShow(1000)
        }
    }

    return(
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>{t('PoliticaCancelacion')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>{t('Inicia')}</th>
                                <th>{t('Termina')}</th>
                                <th>{t('Monto')}</th>
                                <th className="text-center">{t('Reembolsable')}</th>
                                <th>{t('Descripcion')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                politicas.map((pol, i)=>(
                                    <tr key={i}>
                                        <td>{moment(pol.startDate, "DD-MM-YYYYTHH:mm").format("DD-MM-YYYY HH:mm")}</td>
                                        <td>{moment(pol.endDate, "DD-MM-YYYYTHH:mm").format("DD-MM-YYYY HH:mm")}</td>
                                        <td>{formatNumber(pol.amountDetail.amount)} USD</td>
                                        <td className="text-center">{pol.nonRefundable ? 'No' : 'Si'}</td>
                                        <td>{pol.description}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
            
            <Modal show={showTaxes} onHide={handleCloseTaxes} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>{t('Impuestos')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>{t('Nombre')}</th>
                                <th className="text-center">{t('Incluido')}</th>
                                <th className="text-center">{t('Precio')}</th>
                                <th>{t('Descripcion')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                taxes.map((tax, i)=>(
                                    <tr key={i} className={tax.included ? 'text-success' : 'text-danger'}>
                                        <td>{tax.name}</td>
                                        <td className="text-center">{tax.included ? t('Si') : 'No'}</td>
                                        <td className="text-center">{formatNumber(tax.amount)} USD</td>
                                        <td>{tax.description}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>

            <Table hover striped bordered responsive className="mt-3 table-rates">
                <thead>
                    <tr>
                        <th>{t('Detalle')}</th>
                        <th className="text-center">{t('Cancelacion')}</th>
                        <th className="text-center">{t('Precio')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rates.map((item, i)=>(
                            i < countShow &&
                            <tr key={i}>
                                <td width="50%">
                                    <label className="ft-14 d-block mb-0 text-secondary font-weight-bold">{item.roomDescription[0].description}</label>
                                    <label className="text-secondary"><GetMealPlan mealPlan={item.mealPlan}/></label>
                                    <AmenitiesRoomDetalle amenities={item.roomDescription[0].amenities}/>
                                </td>
                                <td className="text-center" width="20%">
                                    <Button variant="light" size="sm" className="font-weight-bold  text-info" onClick={e=>onHandleClickPolitica(item)}>{t('Mostrar')}</Button>                                    
                                </td>
                                <td className="text-center" width="20%">
                                    <div className="text-success font-weight-bold">
                                        {formatNumber(item.amountDetail.total)} USD
                                        <FaInfoCircle  className="text-info icon-18 mb-1 ml-2" onClick={e=>onHandleClickTaxes(item)}/>                                      
                                    </div>
                                </td>
                                <td width="10%" className="text-center">
                                    <Button variant="primary" className="font-weight-bold" onClick={e=>onHandleClickReservar(item)}>{t('Reservar')}</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                {
                    rates.length > 3 &&
                    <tfoot>
                        <tr>
                            <td colSpan="4" className="text-center">
                                <Button variant="light" size="sm" className="font-weight-bold" onClick={showAll}>{texto}</Button>
                            </td>
                        </tr>
                    </tfoot>
                }
            </Table>
        </>
        
    )

}

export default withTranslation()(TableHabitaciones)