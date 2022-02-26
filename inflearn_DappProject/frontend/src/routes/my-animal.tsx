import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import MyAnimalCard, { IMyAnimalCard } from "../components/MyAnimalCard";
import { mintAnimalTokenContract, saleAnimalTokenAddress, saleAnimalTokenContract } from "../web3Config";

interface MyAnimalProps {
  account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
  const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);

  const getAnimalTokens = async () => {
    try {
      const balanceLength = await mintAnimalTokenContract.methods
        .balanceOf(account)
        .call();

      const tempAnimalCardArray = [];

      for (let i = 0; i < parseInt(balanceLength); i++) {
        const animalTokenId = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, i)
          .call();

        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        const animalPrice = await saleAnimalTokenContract.methods
          .animalTokenPrices(animalTokenId)
          .call();
        tempAnimalCardArray.push({animalTokenId, animalType, animalPrice});
      }

      setAnimalCardArray(tempAnimalCardArray);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if(!account) return;

      const response = await mintAnimalTokenContract.methods
        .setApprovalForAll(saleAnimalTokenAddress, !saleStatus)
        .send({ from: account });
      
      if (response.status) {
        setSaleStatus(!saleStatus)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getIsApprovedForAll = async () => {
    try {
      const response = await mintAnimalTokenContract.methods.isApprovedForAll(account, saleAnimalTokenAddress).call();
      if (response) {
        setSaleStatus(response)
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) return; // 주의할점, 처음에 account가 안내려옴, 실행에는 account가 필요한데 없는데 실행하라고 하면 오류뜸
    getIsApprovedForAll();
    getAnimalTokens();
  }, [account]);

  useEffect(() => {
    console.log(animalCardArray); //확인용
  }, [animalCardArray]);

  return (
    <>
      <Flex alignItems="center" justifyContent="center" mb={3}>
        <Text display="inline-block">{saleStatus ? "True" : "False"}</Text>
        <Button
          size="xs"
          ml={2}
          colorScheme={saleStatus ? "red" : "blue"}
          onClick={onClickApproveToggle}
        >
          {saleStatus ? "Cancle" : "Approve"}
        </Button>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap={8}>
        {animalCardArray &&
          animalCardArray.map((v, i) => {
            return (
              <MyAnimalCard
                key={i}
                animalType={v.animalType}
                animalPrice={v.animalPrice}
                animalTokenId={v.animalTokenId}
                saleStatus={saleStatus}
                account={account}
              ></MyAnimalCard>
            );
          })}
      </Grid>
    </>
  );
};

export default MyAnimal;
