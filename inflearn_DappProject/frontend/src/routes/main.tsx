import React, {FC, useState} from "react";
import {Box, Text, Flex, Button} from "@chakra-ui/react"
import { mintAnimalTokenContract } from "../web3Config";
import AnimalCard from "../components/AnimalCard";

interface MainProps {
  account: string;
}

const Main: FC<MainProps> = ({ account }) => {
  const [newAnimalType, setNewAnimalType] = useState<string>();

  const onClickMint = async () => {
    try {
      if (!account) return;

      // mintAnimalTokenContract 가 가진 mintAnimalToken 함수를 실행(인자 필요없는함수)
      const response = await mintAnimalTokenContract.methods.mintAnimalToken().send({
        from: account
      });
      console.log(response);
      if (response.status) {
        const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();
        const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLength) - 1).call();
        const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();
        setNewAnimalType(animalType);

      }

    } catch(error) {
      console.error(error);
    }
  };

  return (
  <Flex w="full" h="100vh" justifyContent="center" alignItems="center" direction="column">
    <Box>
      {newAnimalType ? <AnimalCard animalType={newAnimalType} />: <Text>Let's mint Animal Card!</Text>}
    </Box>
    <Button mt={1} size="md" colorScheme="teal" onClick={onClickMint}>Mint</Button>
  </Flex>
  );
};

export default Main;