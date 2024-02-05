import {  Button, Center, Divider, FormLabel, HStack, Heading, Input, Radio, RadioGroup, Stack, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { loginButtonStyle } from "../styles/buttons";
import { useState } from "react";
import { createTable } from "../services/tableService";
import { joinGame } from "../services/gameService";
import { getCurrentUser } from "../services/userService";


export default function Config(){
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cantJugadores: 2
    })

    const [joinFormData, setJoinFormData] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createTable(formData);
            navigate("/lobby", { state: {data: response.data}})
        } catch (error) {
            console.log("ERROR" + error)
        }

        
    }

    const handleJoinSubmit = async (e) => {
        e.preventDefault()


        try {
            await joinGame(joinFormData)
            navigate("/lobby")
        } catch (error) {
            
        }
    }

    const handleAmountChange = (value) => {
        setFormData({
            cantJugadores : value
        })
    }


    const handleJoinFormData = (e) => {
        
        const {value} = e.target;


        setJoinFormData(value)
    }



    return (
        <Center minHeight="100%">
                <VStack spacing={10}>
                    <Heading size="lg" mt={100}>
                                Mesas
                    </Heading>
                   <form onSubmit={handleSubmit}>    
                        <VStack spacing={5}>
                        
                        
                        <HStack>
                        <FormLabel>Cantidad de Jugadores</FormLabel>
                        <RadioGroup onChange={handleAmountChange}>
                            <Stack direction='row'>
                                <Radio value='2'>2</Radio>
                                <Radio value='4'>4</Radio>
                            </Stack>
                        </RadioGroup>
                        </HStack>
                        <Button {...loginButtonStyle} type="submit">Crear mesa</Button>
                        

                        </VStack>
                    </form>    
                    <Divider my={4} />
                    <form onSubmit={handleJoinSubmit}>
                        <VStack spacing={5}>
                        <FormLabel>Ingresar Código</FormLabel>
                        <Input onChange={handleJoinFormData}/>
                        <Button {...loginButtonStyle} type="submit">Unirse a mesa</Button>
                        </VStack>
                    </form>
                </VStack>
        </Center>
    )
}