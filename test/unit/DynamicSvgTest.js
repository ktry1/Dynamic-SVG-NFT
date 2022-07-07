
const { expect } = require("chai");
const { deployments, ethers, getNamedAccounts, network } = require("hardhat");
let contract, signer;

describe("Random SVG NFT", function () {
  beforeEach(async function () {
    await deployments.fixture(["all"]);
    const {deployer} = await getNamedAccounts();
    const provider = ethers.getDefaultProvider(network.config.url);
    signer = await new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",provider);
    contract = await ethers.getContract("DynamicSvgNft",signer);
    VRFCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
  })
  describe("Function tests",async ()=>{
  it("Should update the counter after minting a token", async function () {
    const tx = await contract.mintNFT(300000);
    const txReceipt = await tx.wait(1);
    const tokenCounter = await contract.getTokenCounter();
    expect(tokenCounter.toString()).to.be.equal("1");
  });
  it("Emits nftMinted() event after minting an NFT", async function () {
    await expect(contract.mintNFT(300000)).to
    .emit(contract,"nftMinted")
    .withArgs(0,300000);
  });
  it("Returns happy image if high is reached, else returns frown", async function () {
    const tx = await contract.mintNFT(300000);
    const txReceipt = await tx.wait(1);
    const txResponse = await contract.tokenURI(0);
    console.log(txResponse);
  })
});
});