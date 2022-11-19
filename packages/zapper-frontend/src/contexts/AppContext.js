import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

/**
 * TODO
 * @type {React.Context<{}>}
 */
export const AppContext = createContext({});

/**
 * TODO
 * @param children
 * @return {JSX.Element}
 * @constructor
*/
export const AppProvider = ({ children }) => {

//UseState

    //Wallet options
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [buttonText, setButtonText] = useState("Connect Wallet");

    //User method options
    const [userAction, setUserAction] = useState(0);

    //Deposit options
    const [currency, setCurrency] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);

//Utility Functions

    const connectWallet = async () => {

        if(!isConnected){

            try {

                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const accounts = await provider.send("eth_requestAccounts", []);

                setWalletAddress(accounts[0]);
                setButtonText(`${accounts[0].slice(0, 4)}...${accounts[0].slice(-4)}`);

                setIsConnected(true);
            } catch (error) {
                setIsConnected(false);
            }
        }
    };

// Return component
  return (
    <AppContext.Provider
      value={{
        isConnected,
        walletAddress,
        buttonText,
        connectWallet,
        userAction,
        setUserAction,
        currency,
        setCurrency,
        depositAmount,
        setDepositAmount
      }}
    >
      {children}
    </AppContext.Provider>
  );

};

export const useApp = () => useContext(AppContext);
