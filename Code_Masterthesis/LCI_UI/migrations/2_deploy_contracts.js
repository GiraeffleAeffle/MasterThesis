const LCIBlockchain = artifacts.require("LCIBlockchain");

module.exports = function(deployer) {
  deployer.deploy(LCIBlockchain);
};
