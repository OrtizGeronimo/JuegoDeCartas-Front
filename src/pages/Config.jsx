import { Box, Button, Center, FormControl, FormLabel, HStack, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack, Switch, Text, VStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { loginButtonStyle } from "../styles/buttons";
import { useState } from "react";
import { AddIcon, MinusIcon } from '@chakra-ui/icons';


export default function Config(){
    
    /*
    const [showRemoveCard, setShowRemoveCard] = useState(false);

    const [cardsToRemove, setCardsToRemove] = useState([<HStack mt={3}>
        <Select placeholder='Número' color="black">
            <option value='option1'>As</option>
            <option value='option2'>J</option>
            <option value='option3'>Q</option>
        </Select>
        <Text>DE</Text>
        <Select placeholder='Pinta' color="black">
            <option value='option1'>Corazon</option>
            <option value='option2'>Trebol</option>
            <option value='option3'>Diamante</option>
            <option value='option3'>Pica</option>
        </Select>
    </HStack>]);


    const addCardsToRemove = () => {
        
        const newCardsToRemoveList = [...cardsToRemove];


        newCardsToRemoveList.push(
            <>
        <HStack mt={3}>
            <Select placeholder='Número' color="black">
                <option value='option1'>As</option>
                <option value='option2'>J</option>
                <option value='option3'>Q</option>
            </Select>
            <Text>DE</Text>
            <Select placeholder='Pinta' color="black">
                <option value='option1'>Corazon</option>
                <option value='option2'>Trebol</option>
                <option value='option3'>Diamante</option>
                <option value='option3'>Pica</option>
            </Select>
        </HStack>
        </>
        );

        

        setCardsToRemove(newCardsToRemoveList);
    }

    const removeCardsToRemove = () => {
        
        const newCardsToRemoveList = [...cardsToRemove];

        newCardsToRemoveList.pop();

        setCardsToRemove(newCardsToRemoveList);
    }

    const removeCard = () =>{ 
        
        return !showRemoveCard ? (<></>) : (
     <>
        <HStack justifyContent="space-between">
            <FormLabel mt={1.5}>Quitar</FormLabel>
            <HStack spacing={3}>
            <Box
            as="span"
            _hover={{ color: 'purple.500', cursor: 'pointer', transition: 'color 0.2s ease-in-out' }}
            >
                <AddIcon boxSize={5} focusable={true} onClick={addCardsToRemove} />
                
            </Box>
            <Box
            as="span"
            _hover={{ color: 'purple.500', cursor: 'pointer', transition: 'color 0.2s ease-in-out' }}
            >
            <MinusIcon boxSize={5} focusable={true} onClick={removeCardsToRemove} />
            </Box>
            </HStack>
        </HStack>
        {cardsToRemove}
    </>
    );
    }

    
                    <HStack mt={5}>
                        <FormLabel>Quitar Cartas?</FormLabel>
                        <Switch id='remove-cards' onChange={(e) => setShowRemoveCard(e.target.checked)} />
                    </HStack>
                    
                    {removeCard()}
    */

    let {state} = useLocation();


    return (
        <Center minHeight="100%">
            <VStack spacing={10}>
                <Heading size="lg" mt={100}>
                    Mesas
                </Heading>
                <HStack>
                    <Link to="/table" state={{amount : 4}}>
                        <Button {...loginButtonStyle}>Unirse a mesa</Button>
                    </Link>
                    <Link to="/table" state={{amount : 4}}>
                        <Button {...loginButtonStyle}>Crear mesa</Button>
                    </Link> 
                </HStack>
                <FormControl>
                    <FormLabel>Cantidad de Jugadores</FormLabel>
                <RadioGroup>
                    <Stack direction='row'>
                        <Radio value='2'>2</Radio>
                        <Radio value='4'>4</Radio>
                    </Stack>
                </RadioGroup>
                    
                </FormControl>
                
            </VStack>
        </Center>
    )
}