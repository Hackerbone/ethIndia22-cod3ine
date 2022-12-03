import { ethers } from "ethers";
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

export const handleFileUploadOld = async (file: File) => {
  try {
    const b64data = await FiletoBase64(file);

    // KEY AND IV GENERATION
    console.log(b64data);
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
    //get base64 of decryptedFileObject
    const pre_encryptedFile = new File([buffer.toString()], "pre_" + file.name);
    console.log(buffer, decryptedFile);
    console.log(pre_encryptedFile, decryptedFileObject);

    // UPLOAD TO IPFS
    // const fileAdded = await ipfsClient.add(file);
    // console.log(fileAdded);
    return decryptedFileObject;
  } catch (error) {
    console.log(error);
  }
};

export const handleFileUpload = async (file: File) => {
  try {
    // encrypt file with AES & get encrypted file
    const arrayBuff: any = await FileToArrayBuffer(file);
    console.log(arrayBuff);

    const key = CryptoJS.lib.WordArray.random(256 / 8);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encryptedFile = await encrypt(arrayBuff, key, iv);
    console.log("exc", encryptedFile);
    const encryptedFileObj = new File(
      [encryptedFile],
      "encrypted_" + file.name
    );

    const textEncryptedFile = await getFileAsTextFromBlob(encryptedFile);

    console.log("textEncryptedFile", textEncryptedFile);

    // console.log(encryptedFileObj);

    // // console.log("resss", reader.result);
    const decryptedFile = await AESDecryptFile(textEncryptedFile, key, iv);
    console.log("decryptedFile", decryptedFile);

    const uintArr = convertWordArrayToUint8Array(decryptedFile);

    const decryptedFileObject = new File([uintArr], "decrypted_" + file.name);
    console.log("decryptedFileObject", decryptedFileObject);
    return decryptedFileObject;
    // get decrypted file object from above reader function
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
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader?.result
        ?.replace("data:", "")
        .replace(/^.+,/, "");
      resolve(base64data);
    };
    reader.onerror = (error: any) => reject(error);
  });

const FileToArrayBuffer = (file: File) =>
  new Promise((resolve, reject) => {
    const reader: any = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const arrayBuffer = reader?.result;
      resolve(arrayBuffer);
    };
    reader.onerror = (error: any) => reject(error);
  });

async function encrypt(file: ArrayBuffer, key: any, iv: any) {
  var wordArray = CryptoJS.lib.WordArray.create(file); // Convert: ArrayBuffer -> WordArray

  const encrypted = CryptoJS.AES.encrypt(wordArray, key, {
    iv,
  });

  console.log("encrypted", encrypted);

  var fileEnc = new Blob([encrypted]); // Create blob from string

  return fileEnc;
}

function convertWordArrayToUint8Array(wordArray: any) {
  var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
  var length = wordArray.hasOwnProperty("sigBytes")
    ? wordArray.sigBytes
    : arrayOfWords.length * 4;
  var uInt8Array = new Uint8Array(length),
    index = 0,
    word,
    i;
  for (i = 0; i < length; i++) {
    word = arrayOfWords[i];
    uInt8Array[index++] = word >> 24;
    uInt8Array[index++] = (word >> 16) & 0xff;
    uInt8Array[index++] = (word >> 8) & 0xff;
    uInt8Array[index++] = word & 0xff;
  }
  return uInt8Array;
}

function getFileAsTextFromBlob(blob: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result);
    };
    reader.onerror = reject;
    reader.readAsText(blob);
  });
}
