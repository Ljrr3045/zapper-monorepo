import "./AmountField.css";
import React from 'react';
import { useApp } from "../../../contexts/AppContext";

function AmountField() {

    const { setDepositAmount } = useApp();

    const handleChange = event => {
        setDepositAmount(event.target.value);
    };

    return (
        <div>
            <input
                className="form-control form-control-lg AmountField-position"
                type="number"
                placeholder="Amount"
                aria-label="Amount"
                onChange={handleChange}
            />
        </div>
    )
}

export default AmountField;
