import "./WithdrawText.css";
import React from 'react';
import { useApp } from "../../../contexts/AppContext";

function WithdrawText() {

    const { amountToWithdraw } = useApp();

  return (
    <div className="WithdrawText-position">
        <div>
            <b>Your total balance to withdraw from Beefy Finance is</b>
        </div>
        <div className="WithdrawText-value">
            {`${amountToWithdraw} Vault Token`}
        </div>
    </div>
  )
}

export default WithdrawText;
