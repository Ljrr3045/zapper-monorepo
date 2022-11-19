import "./ButtonsActions.css";
import React from 'react';
import { useApp } from "../../../contexts/AppContext";

function ButtonsActions() {

    const { currency } = useApp();

    const wMaticSteps = [
        {
            id: 0,
            step: "Approve"
        },
        {
            id: 0,
            step: "Deposit"
        }
    ]

    if(currency === 0){
        return (
            <div className="row ButtonsActions-position">
                <button
                    className="btn btn-primary ButtonsActions-size-matic"
                    type="button"
                >
                    Deposit
                </button>
            </div>
        )
    }

    if(currency === 1){
        return (
            <div className="ButtonsActions-position">
                {
                    wMaticSteps.map( step => (
                        <button
                            key={step.id}
                            type="button"
                            className="btn btn-primary ButtonsActions-size-wmatic"
                        >
                            {step.step}
                        </button>
                    ))
                }
            </div>
        )
    }
}

export default ButtonsActions
