import axios from "axios";
import { environment } from "../utils/environment";
import { setCurrentTable } from "./tableStore";

export async function startGame(data){
    try {
        const response = axios.post(environment.api_url + "/iniciarJuego", data)
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

export async function getAllCards(){
    try {
        const response = await axios.get(environment.api_url + "/cartas")
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function giveCards(cards, table){
    const data = {
        cartas: cards,
        mesa: table
    }
    try {
        const response = await axios.post(environment.api_url + "/repartir", data)
        setCurrentTable(response.data)
        return response
    } catch (error) {
        console.error(error)
    }
}

export async function shuffleCards(){
    try {
        await axios.post(environment.api_url + "/mezclar")
    } catch (error) {
        console.error(error)
    }
}

export async function throwCard(cardId, tableId, playerId){
    const data = {
        cartaId: cardId,
        mesaId: tableId,
        jugadorId: playerId
    }
    try {
        const res = await axios.post(environment.api_url + "/tirar", data)
        setCurrentTable(res.data)
        return res;
    } catch (error) {
        console.error(error)
    }


}

export async function endRound(tableId){
    const data = {
        mesaId: tableId
    }
    try {
        const res = await axios.post(environment.api_url + "/finalizarRonda", data)
        setCurrentTable(res.data)
        return res.data   
    } catch (error) {
        console.error(error)
    }
}

export async function addPoint(tableId, teamId, status){
    const data = {
        mesaId: tableId,
        equipoId: teamId,
        estado: status
    }
    try {
        const res = await axios.post(environment.api_url + "/sumarPunto", data)
        setCurrentTable(res.data)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function removePoint(tableId, teamId, status){
    const data = {
        mesaId: tableId,
        equipoId: teamId,
        estado: status
    }
    try {
        const res = await axios.post(environment.api_url + "/restarPunto", data)
        setCurrentTable(res.data)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function retire(tableId, username){
    const data = {
        mesaId: tableId,
        usuario: username
    }

    try {
        const res = await axios.post(environment.api_url + "/irseAlMazo", data)
        setCurrentTable(res.data)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

