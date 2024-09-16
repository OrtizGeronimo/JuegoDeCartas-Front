import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useCurrentTable } from "../../services/tableStore";
import ScoreDisplay from "./ScoreDisplay";
import { useSessionUser } from "../../services/userStore";
import { addPoint, removePoint } from "../../services/gameService";



export default function PlayerScore(props) {
  const table = useCurrentTable();
  const currentUser = useSessionUser();
  const [isLoading, setIsLoading] = useState(false);

  const addPointHandler = async () => {
    setIsLoading(true);
    try {
      await addPoint(table.id, props.team, table.estado);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removePointHandler = async () => {
    setIsLoading(true);
    try {
      await removePoint(table.id, props.team, table.estado);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Flex w="100%" flexDir="column" alignItems="center" p="2" my="2">
      <HStack>
        <Text ml="2" size="sm">
          Team {props.team + 1}
        </Text>
        <HStack>
          <IconButton
            variant="outline"
            size="xs"
            aria-label="Add point"
            icon={<AddIcon />}
            onClick={addPointHandler}
            isDisabled={isLoading}
          />
          <IconButton
            variant="outline"
            size="xs"
            aria-label="Remove point"
            icon={<MinusIcon />}
            onClick={removePointHandler}
          />
        </HStack>
      </HStack>
      <ScoreDisplay
        score={
          table
            ? table.equipos[props.team].puntos : 0
        }
      />
    </Flex>
  );
}