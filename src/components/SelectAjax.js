import React, { useState } from 'react'
import { withTranslation } from 'react-i18next';
import AsyncSelect from 'react-select/async';
import Get from '../services/Get';


function SelectAjax(props){    
    const [sugestion, setSugestion] = useState([])

    //console.log(props)
    
        const filterData = (inputValue: string, temp: []) => {           
            return temp.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        };    

        const loadOptions = (inputValue, callback) => {            
            if(!inputValue){
                callback([])
            }else{
                Get({url: props.url, access_token: props.access_token})
                .then((res)=>{
                    //console.log(res)           
                    const temp = []
                    res.data.forEach(element => {
                        temp.push({label: `${element.name}`, value: `${element.id}`})
                    });
                    callback(filterData(inputValue, temp))
                    setSugestion(res.data.data)
        
                })
                .catch(err=>{
                    console.log(err)
                })
            }        
      };

      const customStyles = {
        control: styles => ({ ...styles, borderColor: 'red' }),
        option: (styles, { isDisabled, isFocused, isSelected }) => {
            return {
              ...styles,
              backgroundColor: 'white!important',
              color: 'black!important',
              cursor: isDisabled ? 'not-allowed' : 'default',                      
            };
          },
      }

      return(
        <AsyncSelect
            className={props.className}
            styles={!props.valid && customStyles}
            defaultValue={props.defaultValue}
            isMulti={props.isMulti}
            cacheOptions   
            defaultOptions={props.defaultOptions}
            loadOptions={loadOptions}
            placeholder={`${props.t('Buscar')} ...`}
            onChange={props.handleChange}   
            value={props.value}    
            isClearable={props.isClearable}
            openMenuOnClick={false}              
        />
      )

}

export default withTranslation()(SelectAjax)