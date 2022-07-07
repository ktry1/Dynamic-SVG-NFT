const {ethers,network, getNamedAccounts} = require("hardhat");
require("dotenv").config();
const {abi} = require("../constants");
let tx;
const CONTRACT_ADDRESS = "0x13C1f5a5A088fc6B9eF6E4bc3257C082E4CdB430";

async function mint(contractAddress,amount){
    const {deployer} = await getNamedAccounts();
    const provider = ethers.getDefaultProvider(network.config.url);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY,provider); 
    const contract = await new ethers.Contract(contractAddress,abi,signer);
    console.log(`We are going to print ${amount} NFTs from the ${contractAddress} contract address!`);
    console.log("----------------------------------------");
    for(let i=0;i<amount;i++){
        console.log(`Minting token №${i+1}...`)
        tx = await contract.mintNFT("30000");
        await tx.wait(6);
    }
    console.log("----------------------------------------");
    console.log("Minting is over!");
}

async function getUri(number, contractAddress){
    const {deployer} = await getNamedAccounts();
    const provider = ethers.getDefaultProvider(network.config.url);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY,provider); 
    const contract = await new ethers.Contract(contractAddress,abi,signer);
    console.log(`Dynamic SVG NFT index 0 tokenURI: ${await contract.tokenURI(0)}`)
}


mint(CONTRACT_ADDRESS, 3);
