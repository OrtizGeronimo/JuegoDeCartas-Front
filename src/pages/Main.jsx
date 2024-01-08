import { AbsoluteCenter, Button, Center, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import { loginButtonStyle } from "../styles/buttons";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useState } from "react";
import { login } from "../services/userService";



export default function Main(){

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        usuario: "",
        contraseña: ""
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await login(formData);
        console.log(response)
        navigate("/config")
    }


    return (
        <Center minHeight="100%">
            <form onSubmit={handleSubmit}>
            <VStack spacing={8} >
                <Heading as='h2' size='2xl' mt="100px">
                    Bienvenido - Truco
                </Heading>
                <Heading size="lg" mt="100px" >
                    Iniciar Sesión
                </Heading>
                
                <FormControl>
                    <VStack spacing={4} alignItems="left">
                        <FormLabel>Usuario</FormLabel>
                        <Input type='text' name='usuario' onChange={handleInputChange} />
                        <FormLabel>Contraseña</FormLabel>
                        <Input type='password' name="contraseña" onChange={handleInputChange}/>
                        <Button {...loginButtonStyle} type="submit">Ingresar</Button>
                    </VStack>
                <FormHelperText color="white">No tienes un usuario? <Link>Crear uno</Link></FormHelperText>
                </FormControl>
                
            </VStack>
            </form>
        </Center>
    )
}