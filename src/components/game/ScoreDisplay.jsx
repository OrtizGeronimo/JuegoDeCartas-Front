import { Grid, Image } from "@chakra-ui/react";


export default function ScoreDisplay(props) {
    console.log("props: ---" + JSON.stringify(props))
    const displayScore = () => {
    const fives = Math.floor(props.score / 5);
    const remainder = props.score % 5;
    const score = Array.from({ length: fives }, (_, index) => (
        <Image key={index} src={"/puntos/points5.png"} width="100px" height="40px" />
      ));
      return [
      remainder > 0 ? (
        <Image key={0} src={`/puntos/points${remainder}.png`} width="70px" height="40px" />
      ) : (
        ""
      ),
    ].concat(score.map((item, index) => <div key={index + 1}>{item}</div>));
  };

  return (
    <Grid
      templateColumns="repeat(1, 1fr)"
      p="2"
      my="2"
      border="2px"
      overflowY="scroll"
      h="300px"
      w="60%"
    >
      {displayScore()}
    </Grid>
  );
}