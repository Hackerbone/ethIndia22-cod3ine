import { ethers } from "ethers";
import contract from "../contracts/contracts/Squad.json";

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

export const joinOrganisation = async (orgAddress: string) => {
  try {
    const contractInstance = new ethers.Contract(
      orgAddress,
      contract.abi,
      signer
    );
    const userAddress = await signer.getAddress();
    const tx = await contractInstance.isEmployee(userAddress);
    if (tx === true) {
      localStorage.setItem("organisationAddress", orgAddress);
    } else {
      alert("You are not an employee of this organisation");
    }
    return tx;
  } catch (error) {
    console.log(error);
  }
};
