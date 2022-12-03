import { ethers } from "ethers";
import contract from "../contracts/Squad.json";
import * as PushAPI from "@pushprotocol/restapi";

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
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      provider
    );
    // call getOrgDetails function
    const orgDetails = await contractInstance.getOrgDetails();
    return orgDetails;
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
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `New Message`,
        body: `Congtratulations,${employeeName}! You have been added to a new organisation.Sign the files in HR section to get started.`,
      },
      payload: {
        title: `New Message`,
        body: `Congtratulations,${employeeName}! You have been added to a new organisation.Sign the files in HR section to get started.`,
        cta: "",
        img: "",
      },
      recipients: employeeAddress, // recipient address
      channel: "0x3d6e6678E43ecd302867EE0c92bcBF2Fd6C60239", // your channel address
      env: "staging",
    });
    console.log(apiResponse);
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
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `New Message`,
        body: `Congtratulations,${groupName}! You have been added to a new group.`,
      },
      payload: {
        title: `New Message`,
        body: `Congtratulations,${groupName}! You have been added to a new organisation.`,
        cta: "",
        img: "",
      },
      recipients: employeeAddress, // recipient address
      channel: "0x3d6e6678E43ecd302867EE0c92bcBF2Fd6C60239", // your channel address
      env: "staging",
    });
    console.log(apiResponse);

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
    const tx = await contractInstance.getEmployeesByGroup(groupName);
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
    console.log(typeof contractInstance.getGroupNames);
    const tx = await contractInstance.getGroupNames();
    return tx;
  } catch (error) {
    console.log(error);
  }
};

export const getFilesByGroup = async (groupName: string) => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.getFilesByGroup(groupName);
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// send notification via push protocol
