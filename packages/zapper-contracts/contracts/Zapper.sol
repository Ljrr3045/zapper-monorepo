//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IBeefy.sol";

contract Zapper {

    IBeefy public vaultToken;
    IERC20 public wantToken;

    constructor(address _vault) {

        vaultToken = IBeefy(_vault);
        wantToken = vaultToken.want();
    }

    function deposit() public {

        wantToken.approve(address(vaultToken), 1051519424839082);
        vaultToken.deposit(1051519424839082);
    }

    function withdraw() public {
        vaultToken.withdraw(vaultToken.balanceOf(address(this)));
    }
}
