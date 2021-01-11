import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { MdPeople } from 'react-icons/md'

function SelectPerson({adult, child, setAdult,setChild}){
    const [show, setShow] = useState(false)
    const [texto, setTexto] = useState(adult ? 1 : 0)
    const opt = [0,1,2,3,4,5,6,7,8,9,10]

    const onHandleClick = item =>{
        //console.log(item)
        if(adult){
            setAdult(item)
        }else{
            setChild(item)
        }
        setTexto(item)
        setShow(false)
    }

    return(
        <div className="input-control-huespedes">
            <Dropdown show={show} onToggle={e=>setShow(!show)}>
                <Dropdown.Toggle variant="success" className="dropdown-control-huespedes">
                    <MdPeople className="text-white mr-2 icon-24"/> <span>{texto}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100 rounded-0">
                    {
                        opt.map(item=>(
                            <div className="py-1 px-3 cursor-pointer" key={item} onClick={e=>onHandleClick(item)}>{item}</div>
                        ))
                    }                
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default SelectPerson