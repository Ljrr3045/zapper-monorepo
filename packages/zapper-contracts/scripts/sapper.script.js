const {ethers} = require("hardhat");

async function main() {

    const vaultAddress = "0x03F69AAF4c8512f533Da46cC9eFd49C4969e3CB8"

    const Zapper = await ethers.getContractFactory("Zapper");
    const zapper = await Zapper.deploy(
        vaultAddress
    );

    console.log("Contract deployed to:", zapper.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
