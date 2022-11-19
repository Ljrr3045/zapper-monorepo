import "./WithdrawButton.css";
import React from 'react';

function WithdrawButton() {

    return (
        <div className="row WithdrawButton-position">
            <button
                className="btn btn-primary WithdrawButton-size-matic"
                type="button"
            >
                Withdraw All
            </button>
        </div>
    )
}

export default WithdrawButton;
