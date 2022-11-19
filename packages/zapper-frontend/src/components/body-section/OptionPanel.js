import "./OptionPanel.css";
import React from 'react';
import Card from 'react-bootstrap/Card';
import SwitchButtons from "./SwitchButtons";
import DepositOptions from "./deposit-options/DepositOptions";
import WithdrawOptions from "./withdraw-options/WithdrawOptions";
import { useApp } from "../../contexts/AppContext";

function OptionPanel() {

    const { userAction } = useApp();

    return (
        <div className="container text-center Panel-size">
            <div className="row align-items-center">
                <Card>
                    <Card.Body>
                        <SwitchButtons/>
                        {
                            userAction === 0 ?
                                <DepositOptions/> :
                                <WithdrawOptions/>
                        }
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default OptionPanel;
