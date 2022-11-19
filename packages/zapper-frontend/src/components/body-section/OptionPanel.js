import "./OptionPanel.css";
import React from 'react';
import WalletConnected from "./WalletConnected";
import WithoutWallet from "./WithoutWallet";
import { useApp } from "../../contexts/AppContext";

function OptionPanel() {

    const { isConnected } = useApp();

    return (
        <div className="container text-center Panel-size">
            <div className="row align-items-center">
                {
                    isConnected ?
                    <div className="effect-WalletConnected">
                        <WalletConnected/>
                    </div> :
                    <div className="effect-WithoutWallet">
                        <WithoutWallet/>
                    </div>
                }
            </div>
        </div>
    )
}

export default OptionPanel;
