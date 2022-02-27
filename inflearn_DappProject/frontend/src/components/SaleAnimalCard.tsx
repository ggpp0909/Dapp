import { Box, Button, Text } from "@chakra-ui/react";
import React, {FC, useEffect, useState} from "react";
import { mintAnimalTokenContract, saleAnimalTokenContract, web3 } from "../web3Config";
import AnimalCard from "./AnimalCard";

interface SaleAnimalCardProps {
  animalType: string;
  animalPrice: string;
  animalTokenId: string;
  account: string;
  getOnSaleAnimalTokens: () => Promise<void>; // async함수가 아니면 그냥 void인데 async함수라서 Promise까지 (return해주는게 없어서 void)
}

const SaleAnimalCard:FC<SaleAnimalCardProps> = ({ animalType, animalPrice, animalTokenId, account, getOnSaleAnimalTokens}) => {

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

  const onClickBuy = async () => {
    try {
      if (!account) return;
      const response = await saleAnimalTokenContract.methods.purchaseAnimalToken(animalTokenId).send({
        from: account,
        value: animalPrice
      })
      if (response.status) {
        getOnSaleAnimalTokens();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        
        <Button size="sm" colorScheme="green" m={2} disabled={!isBuyable} onClick={onClickBuy}>
          Buy
        </Button>
        
      </Box>
    </Box>
  );
};

export default SaleAnimalCard