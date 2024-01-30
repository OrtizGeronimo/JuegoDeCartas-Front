import { Box, Center, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Table() {
  const [players, setPlayers] = useState([]);

  const location = useLocation()

  const data = location.state?.data

  const renderPlayers = () => {
    if (data.cantidad === 2) {
      // Render players for 2-player game
      return (
        <>
          <Player position="left" />
          <Player position="right" />
        </>
      );
    } else if (data.cantidad === 4) {
      // Render players for 4-player game
      return (
        <>
          <Player position="left" />
          <Player position="right" />
          <Player position="top" />
          <Player position="bottom" />
        </>
      );
    } else if (data.cantidad === 6) {
      // Render players for 6-player game
      return (
        <>
          <Player position="left" />
          <Player position="right" />
          <Player position="top-left" />
          <Player position="top-right" />
          <Player position="bottom-left" />
          <Player position="bottom-right" />
        </>
      );
    }

    // Default: Render no players
    return null;
  };

  return (
    <Center minHeight="100vh">
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
    </Center>
  );
};

const Player = ({ position }) => {
  const playerStyle = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    bg: 'red.500',
  };

  switch (position) {
    case 'left':
      playerStyle.left = '10%';
      playerStyle.top = '50%';
      break;
    case 'right':
      playerStyle.right = '10%';
      playerStyle.top = '50%';
      break;
    case 'top':
      playerStyle.top = '10%';
      playerStyle.left = '50%';
      break;
    case 'bottom':
      playerStyle.bottom = '10%';
      playerStyle.left = '50%';
      break;
    case 'top-left':
      playerStyle.top = '10%';
      playerStyle.left = '10%';
      break;
    case 'top-right':
      playerStyle.top = '10%';
      playerStyle.right = '10%';
      break;
    case 'bottom-left':
      playerStyle.bottom = '10%';
      playerStyle.left = '10%';
      break;
    case 'bottom-right':
      playerStyle.bottom = '10%';
      playerStyle.right = '10%';
      break;
    default:
      break;
  }

  return <Box {...playerStyle}></Box>;
};

