import axios from "axios";
import { environment } from "../utils/environment";

export async function createTable(data){
    try {
        console.log("se llama al endpoint")
        const response = await axios.post(environment.api_url + "/crearMesa", data)
        return response
    } catch (error) {
        console.error("Hubo un error al crear la mesa:" , error)
    }
        
}
