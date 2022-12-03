import { ethers } from "ethers";
import contract from "../contracts/Squad.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(window.ethereum);

const signer: ethers.providers.JsonRpcSigner = provider.getSigner();

// create function to deploy contract
export const deployContract = async () => {
  const factory: ethers.ContractFactory = new ethers.ContractFactory(
    contract.abi,
    contract.bytecode,
    signer
  );

  const contractRes: ethers.Contract = await factory.deploy();

  return contractRes;
};
