import React, { ChangeEvent, FC, useState } from "react";
import { Box, Button, Input, InputGroup, InputRightAddon, Text } from "@chakra-ui/react"
import AnimalCard from "./AnimalCard";
import { saleAnimalTokenContract, web3 } from "../web3Config";

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
  const [sellPrice, setSellPrice] = useState<string>("");
  const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice);

  const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    try {
      if(!account || !saleStatus) return;
      const response = await saleAnimalTokenContract.methods
        .setForSaleAnimalToken(
          animalTokenId,
          web3.utils.toWei(sellPrice, "ether")
        )
        .send({ from: account });
      
      if (response.status) {
        setMyAnimalPrice(web3.utils.toWei(sellPrice, "ether"));
      }
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Box textAlign="center" w={150}>
      <AnimalCard animalType={animalType}></AnimalCard>
      <Box mt={2}>
        {myAnimalPrice === "0"? (
          <>
            <InputGroup>
              <Input type="number" value={sellPrice} onChange={onChangeSellPrice}></Input>
              <InputRightAddon children="Ether"></InputRightAddon>
            </InputGroup>
            <Button size="sm" colorScheme="green" mt={2} onClick={onClickSell}>
              Sell
            </Button>
          </>
        ) : (
          <Text display="inline-block">{web3.utils.fromWei(myAnimalPrice)} Ether</Text>
        )}
      </Box>
    </Box>
  )
};

export default MyAnimalCard;