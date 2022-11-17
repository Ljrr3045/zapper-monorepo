//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./interfaces/IBeefy.sol";
import "./utils/Swapper.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Zapper is Swapper {

    IBeefy public vaultContract;
    IERC20 public liquidityToken;

//Events

    event userDeposit(address _user, uint _amount, uint _date);
    event userWithdraw(address _user, uint _amount, uint _date);

//Mappins

    mapping (address => uint) public userBalance;

//Modifiers

    modifier checkToDepositWithWmatic(uint _amount) {
        uint _allowedBalance = IERC20(wMatic).allowance(msg.sender, address(this));
        require(
            _allowedBalance >= _amount,
            "Zapper: The amount exceeds the allowed balance"
        );
        _;
    }

    modifier checkToWithdraw(){
        require(
            userBalance[msg.sender] > 0,
            "Zapper: User has no funds to withdraw"
        );
        _;
    }

    constructor(
        address _vaultContract,
        address _wMatic,
        address _token1,
        address _token2,
        address _routerV2
    ) Swapper (
        _wMatic,
        _token1,
        _token2,
        _routerV2
    ) {

        vaultContract = IBeefy(_vaultContract);
        liquidityToken = vaultContract.want();

        require(
            address(liquidityToken) == _getPair(_token1, _token2),
            "Zapper: LP token is different from the token that the Vault uses"
        );
    }

    function depositWithMatic() public payable{

        uint _liquidityAdded = _addLiquidityWithMatic();

        uint _balanceBeforeDeposit = vaultContract.balanceOf(address(this));

        liquidityToken.approve(address(vaultContract), _liquidityAdded);
        vaultContract.deposit(_liquidityAdded);

        uint _balanceAfterDeposit = vaultContract.balanceOf(address(this));

        uint _totalBalanceAddedForUser = _balanceAfterDeposit - _balanceBeforeDeposit;
        userBalance[msg.sender] += _totalBalanceAddedForUser;

        emit userDeposit(msg.sender, _totalBalanceAddedForUser, block.timestamp);
    }

    function depositWithWMatic(uint _amount) public checkToDepositWithWmatic(_amount){

        uint _liquidityAdded = _addLiquidityWithWmatic(_amount);

        uint _balanceBeforeDeposit = vaultContract.balanceOf(address(this));

        liquidityToken.approve(address(vaultContract), _liquidityAdded);
        vaultContract.deposit(_liquidityAdded);

        uint _balanceAfterDeposit = vaultContract.balanceOf(address(this));

        uint _totalBalanceAddedForUser = _balanceAfterDeposit - _balanceBeforeDeposit;
        userBalance[msg.sender] += _totalBalanceAddedForUser;

        emit userDeposit(msg.sender, _totalBalanceAddedForUser, block.timestamp);
    }

    function withdraw() public checkToWithdraw{

        uint _balanceToWithdraw = userBalance[msg.sender];
        userBalance[msg.sender] = 0;

        vaultContract.withdraw(_balanceToWithdraw);
        uint _balanceForUser = liquidityToken.balanceOf(address(this));

        _removeLiquidityAndSwap(_balanceForUser);

        emit userWithdraw(msg.sender, _balanceToWithdraw, block.timestamp);
    }
}
