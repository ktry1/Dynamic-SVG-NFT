async function test(){
const {ethers, getNamedAccounts, network} = require("hardhat");
const {deployer} = await getNamedAccounts();
const provider = ethers.getDefaultProvider(network.config.url);
const signer = new ethers.Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",provider);
const contract = await ethers.getContract("DynamicSvgNft",signer);
const encodedValue = await contract.tokenURI(0);
console.log(encodedValue);
}

test();