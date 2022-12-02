const SquadContract = artifacts.require("Squad");


module.exports = function (deployer) {
  const orgName = "Bugbase Organisations";
    deployer.deploy(SquadContract, orgName);
  };