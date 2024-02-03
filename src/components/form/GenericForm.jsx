import { Button, Center, FormControl, FormHelperText, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import { loginButtonStyle } from "../../styles/buttons";
import { Link } from "react-router-dom";
import { useState } from "react";
import AlertMessage from "../common/AlertMessage";

export default function GenericForm({onSubmit,isLogin}) {



    const [formError, setFormError] = useState({
        status: false,
        description: ""
    })


    const [formData, setFormData] = useState({
        usuario: "",
        nombre: "",
        imagen: "",
        contraseña: ""
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
        setFormError({
            status: false,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData, setFormError);
    }


    return (
        <Center minHeight="100%">
            <form onSubmit={handleSubmit}>
            <VStack spacing={8} >
                <Heading as='h2' size='2xl' mt="100px">
                    Bienvenido - Truco
                </Heading>
                <Heading size="lg" mt="100px" >
                    {isLogin ? "Iniciar Sesión" : "Registro"}
                </Heading>
                { formError.status ? <AlertMessage status="error" description={formError.description} /> : null}
                <FormControl>
                    <VStack spacing={4} alignItems="left">
                        <FormLabel>Email</FormLabel>
                        <Input id="usuario" type='text' name='usuario' onChange={handleInputChange} />
                        {!isLogin && (
                            <>
                            <FormLabel>Nombre Completo</FormLabel>
                            <Input
                                id="nombre"
                                type="text"
                                name="nombre"
                                onChange={handleInputChange}
                            />
                            <FormLabel>Imagen de Perfil</FormLabel>
                            <Input
                                id="imagen"
                                type="file"
                                name="imagen"
                                onChange={handleInputChange}
                            />
                            </>
                        )}
                        <FormLabel>Contraseña</FormLabel>
                        <Input id="contraseña" type='password' name="contraseña" onChange={handleInputChange}/>
                        <Button {...loginButtonStyle} type="submit">Ingresar</Button>
                    </VStack>
                    { isLogin ? <FormHelperText color="white">No tienes un usuario? <Link to="/register">Crear uno</Link></FormHelperText> : <FormHelperText color="white"><Link to="/">Volver a Inicio de Sesión</Link></FormHelperText>}
                </FormControl>
                
            </VStack>
            </form>
        </Center>
    )
}