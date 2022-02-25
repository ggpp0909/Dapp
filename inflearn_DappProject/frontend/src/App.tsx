import React, { FC, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Main from "./routes/main";

const App: FC = () => {
  // 메타마스크와 연결
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      if(window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        alert("Install Metamask.")
      }
    } catch(error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getAccount();
  }, []);

  // 제대로 연결되었는지 확인용
  useEffect(() => {
    console.log(account);
  }, [account]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main account={account}/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
