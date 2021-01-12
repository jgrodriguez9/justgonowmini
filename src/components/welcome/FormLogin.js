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

    return(
        <>
            <Formik 
                initialValues={{username:'demo' ,password: 'demo'}}
                onSubmit={(values, { setSubmitting,setFieldValue }) => { 
                    setIsSubmiting(true)
                    setSubmitting(true)
                    //console.log(values)
                    const urlLogin = `${process.env.REACT_APP_SUNAPI_ENDPOINT}${LOGIN_SUNAPI}`;
                    const d = {
                        username: process.env.REACT_APP_SUNAPI_APIUSER,
                        password: process.env.REACT_APP_SUNAPI_APIKEY
                    }
                    Post({url: urlLogin, data: d, header: false})
                    .then(resp=>{
                        setIsSubmiting(false)
                        setSubmitting(false)   
                        let d = {
                            access_token: resp.data.Bearer
                        }                       
                        setAuthData(d)
                        history.replace('/')
                    })
                    .catch(error=>{
                        console.log(error)
                        setIsSubmiting(false)
                        setSubmitting(false) 
                    })
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
                        <div className="form-control form-control-sm">{values.username}</div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="form-control form-control-sm">{values.password}</div>
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