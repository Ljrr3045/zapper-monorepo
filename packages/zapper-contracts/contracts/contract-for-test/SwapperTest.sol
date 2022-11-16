//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IUniswapV2Router.sol";
import "../interfaces/IUniswapV2Pair.sol";
import "../interfaces/IUniswapV2Factory.sol";

import "../utils/MathSqrt.sol";

contract SwapperTest is MathSqrt {

    address internal token1;
    address internal token2;
    address internal wMatic;
    IUniswapV2Router internal routerV2;
    IUniswapV2Factory internal factoryV2;

//Constructor

    constructor(
        address _wMatic,
        address _token1,
        address _token2,
        address _routerV2
    ) {

        wMatic = _wMatic;
        token1 = _token1;
        token2 = _token2;

        routerV2 = IUniswapV2Router(_routerV2);
        factoryV2 = IUniswapV2Factory(routerV2.factory());
    }

//Public Functions

    function addLiquidityWithMatic() external payable returns(uint _liquidity){

        _swapMaticForToken(token1, msg.value);

        uint _amountOfToken1 = IERC20(token1).balanceOf(address(this));
        uint _amountForSwap = _swapAmount(token1, token2, _amountOfToken1);

        _swapTokenForToken(token1, token2, _amountForSwap);

        uint _amountDesiredToken1 = IERC20(token1).balanceOf(address(this));
        uint _amountDesiredToken2 = IERC20(token2).balanceOf(address(this));

        IERC20(token1).approve(address(routerV2), _amountDesiredToken1);
        IERC20(token2).approve(address(routerV2), _amountDesiredToken2);

        (,, _liquidity) = routerV2.addLiquidity(
            token1,
            token2,
            _amountDesiredToken1,
            _amountDesiredToken2,
            1,
            1,
            address(this),
            block.timestamp
        );

        uint _refoundToken1 = IERC20(token1).balanceOf(address(this));
        uint _refoundToken2 = IERC20(token2).balanceOf(address(this));


        if(_refoundToken1 > 0){
            IERC20(token1).transfer(msg.sender, _refoundToken1);
        }

        if(_refoundToken2 > 0){
            IERC20(token2).transfer(msg.sender, _refoundToken2);
        }

        if(address(this).balance > 0){

            (bool _success,) = msg.sender.call{ value: address(this).balance }("");
            require(_success, "Swapper: Refund failed");
        }
    }

    function addLiquidityWithWmatic(uint _amount) external payable returns(uint _liquidity){

        IERC20(wMatic).transferFrom(msg.sender, address(this), _amount);

        _swapTokenForToken(wMatic, token1, _amount);

        uint _amountOfToken1 = IERC20(token1).balanceOf(address(this));
        uint _amountForSwap = _swapAmount(token1, token2, _amountOfToken1);

        _swapTokenForToken(token1, token2, _amountForSwap);

        uint _amountDesiredToken1 = IERC20(token1).balanceOf(address(this));
        uint _amountDesiredToken2 = IERC20(token2).balanceOf(address(this));

        IERC20(token1).approve(address(routerV2), _amountDesiredToken1);
        IERC20(token2).approve(address(routerV2), _amountDesiredToken2);

        (,, _liquidity) = routerV2.addLiquidity(
            token1,
            token2,
            _amountDesiredToken1,
            _amountDesiredToken2,
            1,
            1,
            address(this),
            block.timestamp
        );

        uint _refoundToken1 = IERC20(token1).balanceOf(address(this));
        uint _refoundToken2 = IERC20(token2).balanceOf(address(this));


        if(_refoundToken1 > 0){
            IERC20(token1).transfer(msg.sender, _refoundToken1);
        }

        if(_refoundToken2 > 0){
            IERC20(token2).transfer(msg.sender, _refoundToken2);
        }

        if(address(this).balance > 0){

            (bool _success,) = msg.sender.call{ value: address(this).balance }("");
            require(_success, "Swapper: Refund failed");
        }
    }

//Swapper Functions

    function _swapMaticForToken(address _token, uint _amount) internal{

        address[] memory path = new address[](2);
        path = new address[](2);
        path[0] = wMatic;
        path[1] = _token;

        routerV2.swapExactETHForTokens {value : _amount}(
            1,
            path,
            address(this),
            block.timestamp
        );
    }

    function _swapTokenForToken(address _tokenA, address _tokenB, uint _amount) internal {

        IERC20(_tokenA).approve(address(routerV2), _amount);

        address[] memory path = new address[](2);
        path = new address[](2);
        path[0] = _tokenA;
        path[1] = _tokenB;

        routerV2.swapExactTokensForTokens(
            _amount,
            1,
            path,
            address(this),
            block.timestamp
        );
    }

//Utility Functions

    function _swapAmount(address _tokenA, address _tokenB, uint _amount) private view returns(uint _swap){

        address _pair = factoryV2.getPair(_tokenA, _tokenB);
        require(_pair != address(0), "Sapper: There is no token pair");

        (uint reserve0, uint reserve1,) = IUniswapV2Pair(_pair).getReserves();

        if (IUniswapV2Pair(_pair).token0() == _tokenA) {
            _swap = _getSwapAmount(reserve0, _amount);
        } else {
            _swap = _getSwapAmount(reserve1, _amount);
        }
    }
}
