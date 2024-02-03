import axios from "axios";
import { environment } from "../utils/environment";
import { setCurrentUser } from "./userStore";

export async function login(data){
    try {
        const response = await axios.post(environment.api_url + "/users/login", data)
        setCurrentToken(response.data.token)
        getCurrentUser()
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


function setCurrentToken(token){
    localStorage.setItem('token', token)
    axios.defaults.headers.common.Authorization = 'Bearer ' + token
  }

export async function getCurrentUser(){
    if (axios.defaults.headers.common.Authorization === undefined){
      axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    const res = await axios.get(environment.api_url + '/users/current')
    const user = res.data
    setCurrentUser(user)
  
    return user
  }