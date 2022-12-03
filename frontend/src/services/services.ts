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
export const deployContract = async (orgName: String) => {
  try {
    const factory = new ethers.ContractFactory(
      contract.abi,
      contract.bytecode,
      signer
    );
    const contractRes = await factory.deploy(orgName);
    await contractRes.deployed();
    localStorage.setItem("contractAddress", contractRes.address);
    return contractRes;
  } catch (error) {
    console.log(error);
  }
};
