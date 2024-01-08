import axios from "axios";
import { environment } from "../utils/environment";

export async function login(data){
    try {
        const response = await axios.post(environment.api_url + "/users/login", data)
        return response;
    } catch (error) {
        console.error('Form submission error:', error);
    }
}