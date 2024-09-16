import { Box, Button, Center, HStack, Image, Text, VStack, createLocalStorageManager } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { setCurrentTable, useCurrentTable } from '../services/tableStore';
import SockJsClient from 'react-stomp';
import { endRound, getAllCards, giveCards, retire, shuffleCards, throwCard } from '../services/gameService';
import { useSessionUser } from '../services/userStore';
import { loginButtonStyle, throwCardButtonStyle } from '../styles/buttons';
import { ToastContainer, toast } from 'react-toastify';
import { getCurrentUser } from '../services/userService';
import 'react-toastify/dist/ReactToastify.css';
import ScoreContainer from '../components/game/ScoreContainer';


const SOCKET_URL = 'http://localhost:8080/ws-message';

export default function Table() {
  
  const table = useCurrentTable();

  const user = useSessionUser()

  const [topics, setTopics] = useState([]);

  let onConnected = () => {
    console.log("Connected!!")
    setTopics(['/topic/message']);
  }

  let onMessageReceived = (msg) => {
    console.log("mensaje recibido: " + JSON.stringify(msg, null, 2)); 
    if (msg.estado === "mezclando"){
      if (msg.punto){
        setCurrentTable(msg)
      }
      console.log("ejecutando toast..")
      toast("El dealer mezcló")
    } else {
      if (msg.usuarioAlMazo !== ""){
          toast(msg.usuarioAlMazo + " se fue al mazo")
      }
      setCurrentTable(msg) 
    }
  }


  let cards 
  
  
  const fetchCards = async () => {
    try {
      const res = await getAllCards()
      cards = res
    } catch (error) {
      
    }
  }
  fetchCards();
  

  const mezclar = async () => {
    cards = shuffle(cards)
    await shuffleCards()
  }

  const repartir = async () => {
    await giveCards(cards, table)
    //setCurrentTable(res.data)
  }

  const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  };


  const renderPlayers = () => {
    const players = table.turnero.jugadoresOrdenados
    if (table.cantJugadores === 2) {
      
      return (
        <>
          <Player table={table} index={0} player={players[0]} position="left" />
          <Player table={table} index={1} player={players[1]} position="right" />
        </>
      );
    } else if (table.cantJugadores === 4) {
      
      return (
        <>
          <Player table={table} index={0} player={players[0]} position="left" />
          <Player table={table} index={1} player={players[1]} position="bottom" />
          <Player table={table} index={2} player={players[2]} position="right" />
          <Player table={table} index={3} player={players[3]} position="top" />
        </>
      );
    } else if (table.cantJugadores === 6) {
      
      return (
        <>
          <Player table={table} index={0} player={players[0]} position="left" />
          <Player table={table} index={1} player={players[1]} position="bottom-left" />
          <Player table={table} index={2} player={players[2]} position="bottom-right" />
          <Player table={table} index={3} player={players[3]} position="right" />
          <Player table={table} index={4} player={players[4]} position="top-right" />
          <Player table={table} index={5} player={players[5]} position="top-left" />
        </>
      );
    }

    // Default: Render no players
    return null;
  };

  return (
    <Center minHeight="100vh">
      <SockJsClient
        url={SOCKET_URL}
        topics={topics}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
        />
        <ToastContainer />

        <HStack>
        <ScoreContainer />
      <VStack>
        
        
        <Text>Mesa : {table.id}</Text>
        <Box
        w="70vw"
        h="70vw"
        maxW="70vh"
        maxH="70vh"
        bg="green.800"
        borderRadius="md"
        position="relative"
      >
        {renderPlayers()}
      </Box>
      <SmallBox user={user} table={table} mezclar={mezclar} repartir={repartir}></SmallBox>
      
      </VStack>
      </HStack>
    </Center>
  );
};

const Player = ({ position, player, index, table }) => {
   let isDealer = false;
  if (index === table.turnero.indexDealer){
    isDealer = true;
  }

  const user = useSessionUser()

  const enMesa = player.enMesa

  const isCurrent = player.id === user.id

  const playerStyle = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    bg: 'red.500',
    boxShadow: isCurrent ? '0 0 10px rgba(255, 255, 255, 0.8)' : 'none',
  };
  const cardStyle = {
    position: 'absolute',
    width: '50px',
    height: '30px',
    bg: 'blue.500',
    borderRadius: 'md',
    border: '1px solid black', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const dealerCardStyle = {
    position: 'absolute',
    width: '30px',
    height: '40px',
    bg: 'orange.500', 
    borderRadius: 'md',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const nameStyle = {
    position: 'absolute',
    fontSize: 'xs',
    color: 'white',
    textAlign: 'center',
    top: '70%',
    width: '100%',
    whiteSpace: 'nowrap',
  };

  const getVerticalOffset = (index, position) => {
    // Adjust this value to control the overlap
    const overlapOffset = 20;
  
    if (position === 'bottom') {
      return `${index * overlapOffset - 100}px`; // Adjust the offset for the top player
    } else if (position === 'top') {
      return `${index * overlapOffset + 60}px`; // Adjust the offset for the bottom player
    } else {
      return `${index * overlapOffset}px`; // Use the default offset for other positions
    }
  };

  switch (position) {
    case 'left':
      playerStyle.left = '10%';
      playerStyle.top = '45%';
      cardStyle.left = '50px';
      dealerCardStyle.top = '70px'; // Adjust the dealer card position
      break;
    case 'right':
      playerStyle.right = '10%';
      playerStyle.top = '45%';
      cardStyle.right = '50px';
      dealerCardStyle.bottom = '70px'; // Adjust the dealer card position
      break;
    case 'top':
      playerStyle.top = '5%';
      playerStyle.left = '50%';
      cardStyle.top = '30px';
      dealerCardStyle.left = '-70px'; // Adjust the dealer card position
      break;
    case 'bottom':
      playerStyle.bottom = '10%';
      playerStyle.left = '50%';
      cardStyle.bottom = '30px';
      dealerCardStyle.right = '-70px'; // Adjust the dealer card position
      break;
    

    default:
      break;
  }

  return (
    <>
      <Box {...playerStyle}>
        <Text {...nameStyle}>{player.nombre}</Text>
        { enMesa.length !== 0 &&  
          enMesa.map( (card, cardIndex) => {
            return (<Box
              key={cardIndex}
              {...cardStyle}
              style={{ top: getVerticalOffset(cardIndex, position) }}
            >
              <Image key={0} src={`/cartas/${card.carta.link}.png`} height="80px" width="75px" />
            </Box>)
          })
          
        }
        {isDealer && <Box {...dealerCardStyle}><Image key={0} src={`/cartas/r0.png`} height="40px" width="30px" /></Box>}
      </Box>
      
    </>
  );
};

const SmallBox = ({ user, table, mezclar, repartir }) => {
  
  console.log("ESTADO" + table.estado)
  
  const isDealer = table.turnero.jugadoresOrdenados[table.turnero.indexDealer].id === user.id;

  const player = table.turnero.jugadoresOrdenados.find((jugador) => jugador.id === user.id);
  
  const handleThrowCard = async (id) => {
    await throwCard(id, table.id, player.id)
  }

  const handleRetire = async (nombre) => {
    await retire(table.id, nombre)
  }
  
  const hand = player.enMano;

  const cardHandStyle = {
    /*
    width: '40px',
    height: '50px',
    bg: 'blue.500',
    borderRadius: 'md',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  */
  };


  const handleEndRound = async () => {
    await endRound(table.id)
  }

  return (
    <HStack spacing="2">
      {(table.estado === "mezclando" || table.estado === "Nueva Ronda") && isDealer && (
        <>
          <Button {...loginButtonStyle} onClick={mezclar}>
            Mezclar
          </Button>
          <Button {...loginButtonStyle} onClick={repartir}>
            Repartir
          </Button>
        </>
      )}

      {table.estado === "En Juego" &&
        hand.map((card) => (
          <>
          <VStack>
          <Box key={card.carta.id} {...cardHandStyle}>
          <Image key={0} src={`/cartas/${card.carta.link}.png`} height="60px" width="50px" />
          </Box>
          <Button {...throwCardButtonStyle} onClick={() => handleThrowCard(card.id)}>Tirar</Button>
          </VStack>
          </>
        ))
         }

         {table.estado === "En Juego" && <Button {...throwCardButtonStyle} onClick={() => handleRetire(player.nombre)}>Irse al mazo</Button> }

        {table.estado === "Fin Ronda" && isDealer && <Button onClick={handleEndRound}>Finalizar Ronda</Button>}

    </HStack>
  );
};

