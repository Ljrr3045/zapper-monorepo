const { expect } = require("chai");
const { ethers } = require("hardhat");
const MooSushiAbi = require("./ContractJson/MooSushiUsdcBifi.json");
const SushiSwapLpAbi = require("./ContractJson/SushiSwapLPToken.json");

xdescribe("Zapper", function () {
    let Zapper, zapper, vaultToken, wantToken, user, impersonateAccount;

    before(async ()=> {
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: ["0xcb16f82e5949975f9cf229c91c3a6d43e3b32a9e"],
        });

        [user] = await ethers.getSigners();
        impersonateAccount = await ethers.getSigner("0xcb16f82e5949975f9cf229c91c3a6d43e3b32a9e");

        vaultToken = await new ethers.Contract( "0x03F69AAF4c8512f533Da46cC9eFd49C4969e3CB8" , MooSushiAbi );
        wantToken = await new ethers.Contract( "0x180237bd326d5245D0898336F54b3c8012c5c62f" , SushiSwapLpAbi );

        Zapper = await ethers.getContractFactory("Zapper");
        zapper = await Zapper.deploy(
            vaultToken.address
        );

        await network.provider.send("hardhat_setBalance", [
            impersonateAccount.address,
            ethers.utils.formatBytes32String("5000000000000000000"),
        ]);
    });

    it("balance", async ()=> {
        await vaultToken.connect(impersonateAccount).transfer(zapper.address, "880529607342951");

        expect(await vaultToken.connect(impersonateAccount).balanceOf(zapper.address)).to.equal("880529607342951");
    });

    it("retiro", async ()=> {
        await zapper.connect(user).withdraw();

        expect(await vaultToken.connect(user).balanceOf(zapper.address)).to.equal(0);
        expect(await wantToken.connect(user).balanceOf(zapper.address)).to.equal("1051519424839082");
    });

    it("deposito", async ()=> {
        await zapper.connect(user).deposit();

        //expect(await wantToken.connect(user).allowance(zapper.address, vaultToken.address)).to.equal("1051519424839082");
        //expect(await wantToken.connect(user).balanceOf(zapper.address)).to.equal(0);
        //expect(await vaultToken.connect(user).balanceOf(zapper.address)).to.equal(0);
    });
});
