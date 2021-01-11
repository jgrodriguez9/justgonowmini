import { Field, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { authContext } from '../../context/AuthContext';
import { ErrorLogin } from '../../utils/ErrorLogin';
import Post from '../../services/Post';
import { LOGIN_SUNAPI } from '../../services/Routes';

function FormLogin({setIsSubmiting}){
    const history = useHistory();
    const qs = require('qs');
    const { setAuthData } = useContext(authContext);
    const [error, setError] = useState('')

    const shema = Yup.object().shape({
        username: Yup.string()
            .email("Correo electrónico inválido")
            .required('Campo Requerido'),
        password: Yup.string()
            .required('Campo Requerido'),
    });

    return(
        <>
            <Formik 
                initialValues={{username:'' ,password: ''}}
                validationSchema={shema}
                onSubmit={(values, { setSubmitting,setFieldValue }) => { 
                    setIsSubmiting(true)
                    setSubmitting(true)
                    //console.log(values)
                    const endpoint = `${process.env.REACT_APP_URL_LOGIN}?app=${process.env.REACT_APP_APPNAME_LOGIN}&key=${process.env.REACT_APP_APPKEY_LOGIN}`                    
                    axios({
                        method: 'post',
                        url: endpoint,
                        data: qs.stringify({
                            username: values.username,
                            password: values.password,
                            includeMemberships: '1',
                            includePermissions: '1'
                        }),
                        headers: { 
                            "Access-Control-Allow-Headers" : "Content-Type",
                            "Accept": "application/json",
                            'Content-Type': 'application/x-www-form-urlencoded', 
                            "Access-Control-Allow-Origin": "*",
                            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                        }
                      })
                      .then(response=>{
                        console.log(response)

                        if(response.data.success){
                            if(response.data.memberships.filter(item=>item.permissions.justGoNow===0).length > 0){
                                let dataStorage = {
                                    membership: response.data.memberships
                                }
                                //buscamos el token para las peticiones con SunApi
                                const urlLogin = `${process.env.REACT_APP_SUNAPI_ENDPOINT}${LOGIN_SUNAPI}`;
                                const d = {
                                    username: process.env.REACT_APP_SUNAPI_APIUSER,
                                    password: process.env.REACT_APP_SUNAPI_APIKEY
                                }
                                Post({url: urlLogin, data: d, header: false})
                                .then(resp=>{
                                    setIsSubmiting(false)
                                    setSubmitting(false)  
                                    dataStorage['access_token'] = resp.data.Bearer
                                    setAuthData(dataStorage)
                                    history.replace('/')
                                })
                                .catch(error=>{
                                    console.log(error)
                                    setIsSubmiting(false)
                                    setSubmitting(false) 
                                })
                            }else{
                                setError("NA")
                                setIsSubmiting(false)
                                setSubmitting(false) 
                            }
                            
                        }else{
                            setIsSubmiting(false)
                            setSubmitting(false)
                            setError(response.data.errorCode)
                        }                     
                      })
                      .catch(error=>{
                            console.log(error)
                            console.log(error.response)
                            setIsSubmiting(false)
                            setSubmitting(false)
                            setError(error.response.status)
                      });
                }}
            >{({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className="text-danger text-center">
                        <span>
                            {ErrorLogin(error)}
                        </span>
                    </div>
                    <div className="form-group mb-3">
                        <Field 
                            className={`${errors.username && 'error'} form-control form-control-sm`}
                            name="username" 
                            type="email"
                            placeholder="Correo electrónico" 
                        />
                        { errors.username && <div className="invalid-feedback d-block">{errors.username}</div> }
                    </div>
                    <div className="form-group mb-3">
                        <Field 
                            className={`${errors.password && 'error'} form-control form-control-sm`}
                            name="password" 
                            type="password"
                            placeholder="Contraseña" 
                        />
                        { errors.password && <div className="invalid-feedback d-block">{errors.password}</div> }
                    </div>   
                    <div>
                        <Button type="submit" disabled={isSubmitting} variant="primary" block className="btn-purple text-uppercase">
                            {
                                isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                : 'entrar'
                            }
                        </Button>
                    </div>                 
                </form>
            )}
            </Formik>
        </>
    )


}

export default FormLogin