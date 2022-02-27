import { Box, Button, Text } from "@chakra-ui/react";
import React, {FC, useEffect, useState} from "react";
import { mintAnimalTokenContract, web3 } from "../web3Config";
import AnimalCard from "./AnimalCard";

interface SaleAnimalCardProps {
  animalType: string;
  animalPrice: string;
  animalTokenId: string;
  account: string;
}

const SaleAnimalCard:FC<SaleAnimalCardProps> = ({ animalType, animalPrice, animalTokenId, account}) => {

  const [isBuyable, setIsBuyable] = useState<boolean>(false);

  const getAnimalTokenOwner = async () => {
    try {
      const response = await mintAnimalTokenContract.methods.ownerOf(animalTokenId).call();
      // response로 받은 owner주소와 내 계정주소가 같아도 대소문자가 섞여서 틀리다고 나오므로 대소문자 통일시켜줌
      setIsBuyable(response.toLocaleLowerCase() !== account.toLocaleLowerCase()); 
      // console.log(account);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAnimalTokenOwner();
  }, []);
  return (
    <Box textAlign="center" w={150}>
      <AnimalCard animalType={animalType} />
      <Box>
        <Text display="inline-block">
          {" "}
          {web3.utils.fromWei(animalPrice)} Ether
        </Text>
        
        <Button size="sm" colorScheme="green" m={2} disabled={!isBuyable}>
          Buy
        </Button>
        
      </Box>
    </Box>
  );
};

export default SaleAnimalCard