import { ethers } from "ethers";
import contract from "../contracts/Squad.json";
import { create, IPFSHTTPClient } from "ipfs-http-client";
const CryptoJS = require("crypto-js");

const ipfsEndpoint = "https://ipfs.infura.io:5001";
const projectId = "2IOUFPp6jaCvviGV7nMOkXaRtab";
const projectSecret = "37d7e98f26e5136a5f6a6055fc1ca7db";
const authorization =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const ipfsClient: IPFSHTTPClient = create({
  url: ipfsEndpoint,
  headers: {
    authorization,
  },
});

declare global {
  interface Window {
    ethereum: any;
  }
}

const provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(window.ethereum);

const signer: ethers.providers.JsonRpcSigner = provider.getSigner();

export const handleFileUpload = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  try {
    // get public key
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const files = (form[0] as HTMLInputElement).files;
    if (!files || files.length === 0) {
      return alert("No files selected");
    }
    const file = files[0];
    console.log(file);
    // generate key and iv
    const key = CryptoJS.lib.WordArray.random(256 / 8);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encryptedFile = await AESEncryptFile(file, key, iv);
    console.log(encryptedFile);
    // encrypt key with n public keys
    // const encryptedKeys = await RSAencryptKey(key);

    // const fileAdded = await ipfsClient.add(file);
    // console.log(fileAdded);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const AESEncryptFile = async (buffer: File, secretKey: any, iv: any) => {
  console.log(buffer, secretKey, iv);
  var ciphertext = CryptoJS.AES.encrypt(buffer, secretKey, {
    iv: iv,
  });
  return ciphertext;
};
