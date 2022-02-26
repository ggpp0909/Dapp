import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react"
import AnimalCard from "./AnimalCard";
import { web3 } from "../web3Config";

export interface IMyAnimalCard {
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
}

interface MyAnimalCardProps extends IMyAnimalCard {
  saleStatus: boolean;
  account:string;
}

const MyAnimalCard:FC<MyAnimalCardProps> = ({animalType, animalPrice, animalTokenId, account, saleStatus}) => {
  return (
    <Box textAlign="center" w={150}>
      <AnimalCard animalType={animalType}></AnimalCard>
      <Box mt={2}>
        {animalPrice === "0"? (
          <div>판매버튼</div>
        ) : (
          <Text display="inline-block">{web3.utils.fromWei(animalPrice)} ether</Text>
        )}
      </Box>
    </Box>
  )
};

export default MyAnimalCard;