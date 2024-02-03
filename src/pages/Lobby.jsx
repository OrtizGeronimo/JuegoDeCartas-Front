import { Box, Button, Center, Divider, Heading, Text, VStack, createLocalStorageManager } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { loginButtonStyle } from "../styles/buttons"
import { useEffect, useState } from "react"
import { startGame } from "../services/gameService"
import SockJsClient from 'react-stomp';
import { environment } from "../utils/environment"
import { io } from "socket.io-client"
import { useSessionUser } from "../services/userStore"
import { setCurrentTable, useCurrentTable } from "../services/tableStore"

const SOCKET_URL = 'http://localhost:8080/ws-message';

export default function Lobby(){

    const table = useCurrentTable();


    const navigate = useNavigate();

    const [topics, setTopics] = useState([]);

    const user = useSessionUser();

    console.log("USER: " + user);
    console.log("table: " + table.equipos[0].jugadores.length)

    let onConnected = () => {
      console.log("Connected!!")
      setTopics(['/topic/message']);
    }

    let onMessageReceived = (msg) => {
      console.log("mensaje recibido: " + msg)
      setTeam1(msg.equipos[0])
      setTeam2(msg.equipos[1])
      setCurrentTable(msg)
    }


    const [team1, setTeam1] = useState(table.equipos[0]);
    const [team2, setTeam2] = useState(table.equipos[1]);

    const [formData, setFormData] = useState({
      mesaId: table.id,
      ownerId: table.owner.id,
      equipos: [{},{}]
    })
  
 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await startGame(formData);
            console.log(response)
            navigate("/table", { state: {data: response.data}})
        } catch (error) {
            console.log("ERROR" + error)
        }
   
    }

    


    const handleTeamChange = () => {
        setFormData(
          { 
            ...formData,
            equipos: [{ idJugadores: team1.jugadores.map(player => player.id)}, { idJugadores: team2.jugadores.map(player => player.id)}]
          })
    }

    useEffect(() => {

      handleTeamChange();
    }, []);

    const moveItemToTeam2 = (itemIndex) => {
      const movedItem = team1[itemIndex];
      setTeam1((prevTeam1) => prevTeam1.jugadores.filter((_, index) => index !== itemIndex));
      setTeam2((prevTeam2) => [...prevTeam2, movedItem]);
      handleTeamChange()
    };
  
    const moveItemToTeam1 = (itemIndex) => {
      const movedItem = team2[itemIndex];
      setTeam2((prevTeam2) => prevTeam2.jugadores.filter((_, index) => index !== itemIndex));
      setTeam1((prevTeam1) => [...prevTeam1, movedItem]);
      handleTeamChange()
    };

  
    return (
      <Center height="100vh">
        <SockJsClient
        url={SOCKET_URL}
        topics={topics}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
        />
          <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Heading as='h2' size='2xl' mt="10px">
                Mesa # {table.id} - {table.codigo}
            </Heading>
            <Box maxW="400px" width="full" p={4} borderWidth={1} borderRadius="lg">
        
            <VStack spacing={2}>
              <Text fontWeight="bold">Team 1</Text>
              {team1.jugadores.map((item, index) => (
                <Box key={index}>
                  <Text>{item.nombre}</Text>
                  { user.isOwner &&
                  <Button onClick={() => moveItemToTeam2(index)} colorScheme="purple" size="sm">
                    Move to Team 2
                  </Button>
                  }
                </Box>
              ))}
            </VStack>
            <Divider orientation="vertical" />
            <VStack spacing={2}>
              <Text fontWeight="bold">Team 2</Text>
              {team2.jugadores.length !== 0 && team2.jugadores.map((item, index) => (
                <Box key={index}>
                  <Text>{item.nombre}</Text>
                  {user.isOwner &&
                    <Button onClick={() => moveItemToTeam1(index)} colorScheme="blue" size="sm">
                    Move to Team 1
                  </Button>}
                </Box>
              ))}
            </VStack>
            
        </Box>
        <Button {...loginButtonStyle} type="submit">Comenzar</Button>
        </VStack>
        </form>
      </Center>
    );
  };

    