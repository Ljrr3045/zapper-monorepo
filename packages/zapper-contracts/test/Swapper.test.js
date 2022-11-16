const { expect } = require("chai");
const { ethers } = require("hardhat");
const WMaticAbi = require("./ContractJson/WMatic.json");
const UsdcAbi = require("./ContractJson/Usdc.json");
const BifiAbi = require("./ContractJson/Bifi.json");
const SushiSwapLpAbi = require("./ContractJson/SushiSwapLPToken.json");

describe("Swapper", function () {

    const sushiSwapRouterV2 = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
    let Swapper, swapper, wMatic, token1, token2, liquidityToken, user1, user2;

    before(async ()=> {
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: ["0xfffbcd322ceace527c8ec6da8de2461c6d9d4e6e"],
        });

        [user1] = await ethers.getSigners();
        user2 = await ethers.getSigner("0xfffbcd322ceace527c8ec6da8de2461c6d9d4e6e");

        wMatic = await new ethers.Contract( "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" , WMaticAbi );
        token1 = await new ethers.Contract( "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" , UsdcAbi );
        token2 = await new ethers.Contract( "0xFbdd194376de19a88118e84E279b977f165d01b8" , BifiAbi );
        liquidityToken = await new ethers.Contract( "0x180237bd326d5245D0898336F54b3c8012c5c62f" , SushiSwapLpAbi );

        Swapper = await ethers.getContractFactory("SwapperTest");
        swapper = await Swapper.deploy(
            wMatic.address,
            token1.address,
            token2.address,
            sushiSwapRouterV2
        );

        await network.provider.send("hardhat_setBalance", [
            user2.address,
            ethers.utils.formatBytes32String("5000000000000000000"),
        ]);
    });

    it("User should be able to add liquidity With MATIC", async ()=> {

        await swapper.connect(user1).addLiquidityWithMatic(
            { value: ethers.utils.parseEther("100") }
        );

        expect(await ethers.provider.getBalance(swapper.address)).to.equal(0);
        expect(await token1.connect(user1).balanceOf(swapper.address)).to.equal(0);
        expect(await token2.connect(user1).balanceOf(swapper.address)).to.equal(0);
        expect(await liquidityToken.connect(user1).balanceOf(swapper.address)).to.equal("1961117968151");
    });

    it("User should be able to add liquidity With WMATIC", async ()=> {

        await wMatic.connect(user2).approve(swapper.address, ethers.utils.parseEther("100"));

        await swapper.connect(user2).addLiquidityWithWmatic(
            ethers.utils.parseEther("100")
        );

        expect(await ethers.provider.getBalance(swapper.address)).to.equal(0);
        expect(await token1.connect(user2).balanceOf(swapper.address)).to.equal(0);
        expect(await token2.connect(user2).balanceOf(swapper.address)).to.equal(0);
        expect(await liquidityToken.connect(user2).balanceOf(swapper.address)).to.equal("3918495231510");
    });

    it("User should be able to withdraw their money receive WMATIC", async ()=> {
        await swapper.connect(user1).removeLiquidityAndSwap(
            3918495231510
        );

        expect(await token1.connect(user1).balanceOf(swapper.address)).to.equal(0);
        expect(await token2.connect(user1).balanceOf(swapper.address)).to.equal(0);
        expect(await liquidityToken.connect(user1).balanceOf(swapper.address)).to.equal(0);
        expect(await wMatic.connect(user1).balanceOf(user1.address)).to.equal("111682962402881693370");
    });
});
