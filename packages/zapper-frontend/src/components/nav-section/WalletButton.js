import "./WalletButton.css";
import React, { useState } from 'react';

function WalletButton() {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [buttonText, setButtonText] = useState("Connect Wallet");

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

    return (
        <>
            <button
                className="btn btn-outline-primary"
                type="button"
                onClick={connectWallet}
            >
                {buttonText}
            </button>
        </>
    )
}

export default WalletButton;
