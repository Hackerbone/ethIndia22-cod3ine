import { ethers } from "ethers";
import contract from "../contracts/Squad.json";

const provider = new ethers.providers.Web3Provider(window?.ethereum);
const signer = provider.getSigner();

// create function to deploy contract
export const deployContract = async () => {
  console.log(contract);
  const factory = new ethers.ContractFactory(
    contract.abi,
    contract.bytecode,
    signer
  );
  const contract = await factory.deploy();
  await contract.deployed();
  return contract;
};
