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
    // console.log(file);
    const b64data = await FiletoBase64(file);

    // KEY AND IV GENERATION
    // console.log(b64data);
    const buffer = CryptoJS.enc.Base64.parse(b64data);
    const key = CryptoJS.lib.WordArray.random(256 / 8);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    // ENCRYPT AND DECRYPT
    const encryptedFile = await AESEncryptFile(buffer, key, iv);
    const decryptedFile = await AESDecryptFile(encryptedFile, key, iv);

    // SANITY CHECK
    const decryptedFileObject = new File(
      [decryptedFile.toString()],
      "decrypted_" + file.name
    );
    const pre_encryptedFile = new File([buffer.toString()], "pre_" + file.name);
    // console.log(pre_encryptedFile, decryptedFileObject);

    // UPLOAD TO IPFS
    // const fileAdded = await ipfsClient.add(file);
    // console.log(fileAdded);
    return decryptedFileObject;
  } catch (error) {
    console.log(error);
  }
};

const AESEncryptFile = async (buffer: any, secretKey: any, iv: any) => {
  console.log(buffer, secretKey, iv);
  var encrypted = CryptoJS.AES.encrypt(buffer, secretKey, {
    iv: iv,
  });
  return encrypted;
};

const AESDecryptFile = async (encryptedFile: any, secretKey: any, iv: any) => {
  var decrypted = CryptoJS.AES.decrypt(encryptedFile, secretKey, {
    iv: iv,
  });
  return decrypted;
};

const FiletoBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
