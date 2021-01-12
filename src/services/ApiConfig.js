import axios from 'axios';
import { LOGIN_SUNAPI } from './Routes';


const httpInstance = axios.create( {
    baseURL: `${process.env.REACT_APP_SUNAPI_ENDPOINT}` 
});

httpInstance.interceptors.response.use((response)=>{
    

    if(response.data.apiCode==='E_EXPIRED_TOKEN'){
        const originalRequest = response.config
        originalRequest._retry = true
        const urlLogin = `${process.env.REACT_APP_SUNAPI_ENDPOINT}${LOGIN_SUNAPI}`;
        const d = {
            username: process.env.REACT_APP_SUNAPI_APIUSER,
            password: process.env.REACT_APP_SUNAPI_APIKEY
        }
        return axios.post(urlLogin, d)
                    .then(response=>{
                        //console.log(response)
                        let storage = JSON.parse(localStorage.getItem("authJustGoNowMini"));
                        storage.access_token = response.data.Bearer
                        localStorage.setItem("authJustGoNowMini", JSON.stringify(storage));
                        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.Bearer;
                        return axios(originalRequest);
                    })           
    }else if(response.data.apiCode==='E_SIGNATURE_INVALID'){
        const originalRequest = response.config
        originalRequest._retry = true
        const urlLogin = `${process.env.REACT_APP_SUNAPI_ENDPOINT}${LOGIN_SUNAPI}`;
        const d = {
            username: process.env.REACT_APP_SUNAPI_APIUSER,
            password: process.env.REACT_APP_SUNAPI_APIKEY
        }
        const h = { headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }}
        return axios.post(urlLogin, d, h)
                    .then(response=>{
                        console.log(response)
                        let storage = JSON.parse(localStorage.getItem("authJustGoNowMini"));
                        storage.access_token = response.data.Bearer
                        localStorage.setItem("authJustGoNowMini", JSON.stringify(storage));
                        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.Bearer;
                        return axios(originalRequest);
                    })           
    }
    return response
}, (error) => {    
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;    
    if(error.response.status===403){
        window.localStorage.setItem('authData', null);
        //window.location.href="https://rio.commune.com.mx/sign-in"
    }
    if (expectedError) {
        //console.log(error.response.status)
        // Loggear mensaje de error a un servicio como Sentry
        // Mostrar error genérico al usuario
        return Promise.reject(error);
    }
});

export default httpInstance;