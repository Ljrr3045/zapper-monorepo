//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IUniswapV2Router.sol";
import "../interfaces/IUniswapV2Pair.sol";
import "../interfaces/IUniswapV2Factory.sol";

contract Swapper {
    using SafeMath for uint;

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

    function addLiquidity() public payable{

        _swapEthForDai(_swapAmount(msg.value));
        uint _amountTokenDesired = IERC20(token1).balanceOf(address(this));
        uint _amountEthAdd = address(this).balance - 10;
        IERC20(token1).approve(address(routerV2), _amountTokenDesired);

        routerV2.addLiquidityETH{value: _amountEthAdd}(
            token1,
            _amountTokenDesired,
            0,
            0,
            msg.sender,
            block.timestamp
        );

        uint refoundDai = IERC20(token1).balanceOf(address(this));

        if(address(this).balance > 0){

            (bool success,) = msg.sender.call{ value: address(this).balance }("");
            require(success, "refund failed");
        }

        if(refoundDai > 0){
            IERC20(token1).transfer(msg.sender, refoundDai);
        }

    }

//Utility Functions

    function _sqrt(uint y) private pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        }else if (y != 0) {
            z = 1;
        }
    }

    function _getSwapAmount(uint r, uint a) private pure returns (uint) {
        return (_sqrt(r.mul(r.mul(3988009) + a.mul(3988000))).sub(r.mul(1997))) / 1994;
    }

    function _swapAmount(uint _amount) private view returns(uint _swap){

        address pair = factoryV2.getPair(token2, token1);
        (uint reserve0, uint reserve1, ) = IUniswapV2Pair(pair).getReserves();

        if (IUniswapV2Pair(pair).token0() == token2) {
            _swap = _getSwapAmount(reserve0, _amount);
        } else {
            _swap = _getSwapAmount(reserve1, _amount);
        }
    }

    function _swapEthForDai(uint _amount) private {

        address[] memory path = new address[](2);
        path = new address[](2);
        path[0] = token2;
        path[1] = token1;

        routerV2.swapExactETHForTokens {value : _amount}(
            1,
            path,
            address(this),
            block.timestamp
        );
    }
}
