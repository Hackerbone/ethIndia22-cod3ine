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
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getOrganizationDetails = async () => {
  try {
    const orgAddress = localStorage.getItem("contractAddress");

    if (orgAddress) {
      const contractInstance = new ethers.Contract(
        orgAddress,
        contract.abi,
        provider
      );

      console.log(contractInstance);

      // call getOrgDetails function
      const orgDetails = await contractInstance.getOrgDetails();
      return orgDetails;
    }
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
      localStorage.setItem("contractAddress", orgAddress);
    } else {
      alert("You are not an employee of this organisation");
    }
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to add employee to organisation
export const addEmployee = async (
  employeeAddress: string,
  employeeName: string
) => {
  try {
    console.log("contract address", localStorage.getItem("contractAddress"));
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.addEmployee(
      employeeAddress,
      employeeName
    );
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to create a group
export const createGroup = async (groupName: string) => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.createGroup(groupName);
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to add employee to group
export const addEmployeeToGroup = async (
  groupName: string,
  employeeAddress: string
) => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.addEmployeeToGroup(
      groupName,
      employeeAddress
    );
    await tx.wait();
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to get all employees
export const getAllEmployees = async () => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.getEmployees();
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to get all employees in a group
export const getEmployeesInGroup = async (groupName: string) => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.getEmployeesInGroup(groupName);
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to get all groups
export const getAllGroups = async () => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.getGroups();
    return tx;
  } catch (error) {
    console.log(error);
  }
};
