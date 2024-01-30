import { Box, Button, Center, Divider, Heading, Text, VStack } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { loginButtonStyle } from "../styles/buttons"
import { useEffect, useState } from "react"
import { startGame } from "../services/gameService"


export default function Lobby(){

    const location = useLocation()

    const navigate = useNavigate();

    // Assume you have a function to fetch player information from the endpoint
  /*const fetchPlayerInfo = async () => {
    try {
      // Make your API request and setPlayers with the response
      //const response = await yourApiCall();
      //setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching player information', error);
    }
  };

  useEffect(() => {
    // Fetch player information when the component mounts
    fetchPlayerInfo();
  }, []);*/

    const data = location.state?.data

    const [team1, setTeam1] = useState([{nombre: "Jugador 1" , id: 1}]);
    const [team2, setTeam2] = useState([{nombre: "Jugador 2" , id: 2}]);

    const [formData, setFormData] = useState({
      mesaId: data.id,
      ownerId: 1,
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
            equipos: [{ idJugadores: team1.map(player => player.id)}, { idJugadores: team2.map(player => player.id)}]
          })
    }

    useEffect(() => {
      // Call handleTeamChange when the component first renders
      handleTeamChange();
    }, []);

    const moveItemToTeam2 = (itemIndex) => {
      const movedItem = team1[itemIndex];
      setTeam1((prevTeam1) => prevTeam1.filter((_, index) => index !== itemIndex));
      setTeam2((prevTeam2) => [...prevTeam2, movedItem]);
      handleTeamChange()
    };
  
    const moveItemToTeam1 = (itemIndex) => {
      const movedItem = team2[itemIndex];
      setTeam2((prevTeam2) => prevTeam2.filter((_, index) => index !== itemIndex));
      setTeam1((prevTeam1) => [...prevTeam1, movedItem]);
      handleTeamChange()
    };
  
    return (
      <Center height="100vh">
          <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Heading as='h2' size='2xl' mt="10px">
                Mesa # {data.id}
            </Heading>
            <Box maxW="400px" width="full" p={4} borderWidth={1} borderRadius="lg">
        
            <VStack spacing={2}>
              <Text fontWeight="bold">Team 1</Text>
              {team1.map((item, index) => (
                <Box key={index}>
                  <Text>{item.nombre}</Text>
                  <Button onClick={() => moveItemToTeam2(index)} colorScheme="purple" size="sm">
                    Move to Team 2
                  </Button>
                </Box>
              ))}
            </VStack>
            <Divider orientation="vertical" />
            <VStack spacing={2}>
              <Text fontWeight="bold">Team 2</Text>
              {team2.map((item, index) => (
                <Box key={index}>
                  <Text>{item.nombre}</Text>
                  <Button onClick={() => moveItemToTeam1(index)} colorScheme="blue" size="sm">
                    Move to Team 1
                  </Button>
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

    