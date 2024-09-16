import { HStack } from "@chakra-ui/react";
import { useCurrentTable } from "../../services/tableStore";
import PlayerScore from "./PlayerScore";

export default function ScoreContainer() {
  const table = useCurrentTable();

  return (
    <HStack>
      {table?.status === "waiting_players" ? (
        <></>
      ) : (
        <>
          <PlayerScore team={0} />
          <PlayerScore team={1} />
        </>
      )}
    </HStack>
  );
}