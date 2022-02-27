import { Grid } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { IMyAnimalCard } from "../components/MyAnimalCard";
import {
  mintAnimalTokenContract,
  saleAnimalTokenContract,
} from "../web3Config";

interface SaleAnimalProps {
  account: string;
}

const SaleAnimal: FC<SaleAnimalProps> = ({ account }) => {
  const [saleAnimalCard, setSaleAnimalCard] = useState<IMyAnimalCard[]>();

  const getOnSaleAnimalTokens = async () => {
    try {
      const onSaleAnimalTokenArrayLength = await saleAnimalTokenContract.methods
        .getOnSaleAnimalTokenArrayLength()
        .call();

      const tempOnSaleArray: IMyAnimalCard[] = [];

      for (let i = 0; i < parseInt(onSaleAnimalTokenArrayLength); i++) {
        const animalTokenId = await saleAnimalTokenContract.methods
          .onSaleAnimalTokenArray(i)
          .call();
        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();
        const animalPrice = await saleAnimalTokenContract.methods
          .animalTokenPrices(animalTokenId)
          .call();
        // 원래는 이렇게하면 시간오래걸려서 전강의처럼 리팩토링 해야됨.

        tempOnSaleArray.push({ animalTokenId, animalType, animalPrice });
      }
      setSaleAnimalCard(tempOnSaleArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOnSaleAnimalTokens();
  }, []);

  useEffect(() => {
    console.log(saleAnimalCard);
  }, [saleAnimalCard]);

  return <Grid mt={4} templateColumns="repeat(4, 1fr)" gap={8}></Grid>;
};

export default SaleAnimal;
