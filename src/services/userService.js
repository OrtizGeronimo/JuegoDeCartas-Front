import axios from "axios";
import { environment } from "../utils/environment";

export async function login(data){
    try {
        const response = await axios.post(environment.api_url + "/users/login", data)
        //setCurrentToken(response.token)
        return response;
    } catch (error) {
        console.error('Form submission error:', error);
        throw error;
    }
}

export async function register(data){
    try {
        const response = await axios.post(environment.api_url + "/users/register", data)
        return response;
    } catch (error) {
        console.error('Form submission error:', error);
        throw error;
    }
}

/*function setCurrentToken(token){
    localStorage.setItem('token', token)
    axios.defaults.headers.common.Authorization = 'Bearer ' + token
  }*/