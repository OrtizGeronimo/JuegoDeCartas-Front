import axios from "axios";
import { environment } from "../utils/environment";

export async function startGame(data){
    try {
        const response = axios.post(environment.api_url + "/crearJuego", data)
        return response
    } catch (error) {
        console.error(error)
    }
}