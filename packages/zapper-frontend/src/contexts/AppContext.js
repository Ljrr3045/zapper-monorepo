import React, { createContext, useContext, useState } from "react";

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

    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [buttonText, setButtonText] = useState("Connect Wallet");

//Utility Functions

    const connectWallet = async () => {

        const { ethereum } = window;

        if(!isConnected){

            try {

                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                });

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
        connectWallet
      }}
    >
      {children}
    </AppContext.Provider>
  );

};

export const useApp = () => useContext(AppContext);
