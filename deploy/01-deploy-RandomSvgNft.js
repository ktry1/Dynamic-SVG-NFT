const { getNamedAccounts, deployments, network, ethers } = require("hardhat")
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const {verify} = require("../utils/verify"); 
const fs = require("fs");

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  let ethUsdPriceFeedAddress;


  if (network.name in developmentChains){
    const ethUsdAggregator = await ethers.getContract("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  }
  else{
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  const lowSvg = await fs.readFileSync("./Images/frown.svg", {encoding:"utf8"});
  const highSvg = await fs.readFileSync("./Images/happy.svg", {encoding:"utf8"});

  const args = [ethUsdPriceFeedAddress,lowSvg,highSvg];

  const contract = await deploy('DynamicSvgNft', {
    from: deployer,
    args: args,
    log: true,
  });


  if (!(network.name in developmentChains)){
    await verify(contract.address,args);
  }

 
}

module.exports.tags = ["all","RandomSvg"]
