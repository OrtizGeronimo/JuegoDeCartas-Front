import axios from "axios";
import { environment } from "../utils/environment";
import { setCurrentTable } from "./tableStore";

export async function createTable(data){
    try {
        console.log("se llama al endpoint")
        const response = await axios.post(environment.api_url + "/crearMesa", data)
        console.log(response)
        setCurrentTable(response.data)
        return response
    } catch (error) {
        console.error("Hubo un error al crear la mesa:" , error)
    }
        
}

export async function changeTeam(idUsuario, idMesa){
    try {
        const data = {
            idUsuario: idUsuario,
            idMesa: idMesa
        }
        const response = await axios.post(environment.api_url + "/cambiarEquipo", data)
        setCurrentTable(response.data)
    } catch (error) {
        console.error("Hubo un error al cambiar de equipo:" , error)
    }
}
