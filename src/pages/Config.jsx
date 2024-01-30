import {  Button, Center, FormLabel, HStack, Heading, Radio, RadioGroup, Stack, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { loginButtonStyle } from "../styles/buttons";
import { useState } from "react";
import { createTable } from "../services/tableService";


export default function Config(){
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cantJugadores: 2
    })


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createTable(formData);
            console.log(response)
            navigate("/lobby", { state: {data: response.data}})
        } catch (error) {
            console.log("ERROR" + error)
        }

        
    }

    const handleAmountChange = (value) => {
        console.log("amount Changed")
        setFormData({
            cantJugadores : value
        })
    }



    return (
        <Center minHeight="100%">
            <form onSubmit={handleSubmit}>
                <VStack spacing={10}>
                
                    <Heading size="lg" mt={100}>
                        Mesas
                    </Heading>
                    
                    <HStack>
                    <FormLabel>Cantidad de Jugadores</FormLabel>
                    <RadioGroup onChange={handleAmountChange}>
                        <Stack direction='row'>
                            <Radio value='2'>2</Radio>
                            <Radio value='4'>4</Radio>
                            <Radio value='6'>6</Radio>
                        </Stack>
                    </RadioGroup>
                            
                    </HStack>
                    
                
                            <Button {...loginButtonStyle} type="submit">Crear mesa</Button>
                    
                    
                    <Text> o </Text>
                    <Link to="/table" state={{amount : 4}}>
                        <Button {...loginButtonStyle}>Unirse a mesa</Button>
                    </Link> 
                        
                    
                        
                </VStack>
                </form>
        </Center>
    )
}