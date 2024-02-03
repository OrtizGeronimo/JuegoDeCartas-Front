import axios from "axios";
import { environment } from "../utils/environment";
import { setCurrentTable } from "./tableStore";

export async function startGame(data){
    try {
        const response = axios.post(environment.api_url + "/crearJuego", data)
        return response
    } catch (error) {
        console.error(error)
    }
}

export async function joinGame(value){
    const data = {
        codigo: value
    }
    try {
        const response = await axios.post(environment.api_url + "/unirse", data)
        console.log(response)
        setCurrentTable(response.data)
        return response;
    } catch (error) {
        console.error(error)
    }
}