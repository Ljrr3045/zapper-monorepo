import "./WalletConnected.css";
import React from 'react';
import Card from 'react-bootstrap/Card';
import SwitchButtons from "./SwitchButtons";
import DepositOptions from "./deposit-options/DepositOptions";
import WithdrawOptions from "./withdraw-options/WithdrawOptions";
import { useApp } from "../../contexts/AppContext";

function WalletConnected() {

    const { userAction } = useApp();

    return (
        <Card className="walletConnected-style">
            <Card.Body>
                <SwitchButtons/>
                {
                    userAction === 0 ?
                        <div className="deposit-effect">
                            <DepositOptions/>
                        </div> :
                        <div className="withdraw-effect">
                            <WithdrawOptions/>
                        </div>
                }
            </Card.Body>
        </Card>
    )
}

export default WalletConnected;
