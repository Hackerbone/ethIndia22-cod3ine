import { ethers } from "ethers";
import { create, IPFSHTTPClient } from "ipfs-http-client";
import { getEmployeesInGroup } from "./services";
import { encrypt } from "@metamask/eth-sig-util";
const ascii85 = require("ascii85");

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

export const handleFileUpload = async (file: File, groupName: string) => {
  try {
    // SETTING UP FOR ENCRYPTION OF FILE
    const arrayBuff: any = await FileToArrayBuffer(file);
    const key = CryptoJS.lib.WordArray.random(256 / 8);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const keyObj = {
      key: key.toString(),
      iv: iv.toString(),
    };

    //GET DETAILS OF ALL OTHER MEMBERS IN GROUP
    const employees = await getEmployeesInGroup(groupName);
    console.log(employees);

    // SETTING UP FOR ENCRYPTION OF KEY OBJ
    const keyObjString = JSON.stringify(keyObj);
    const keyObjBuffer = Buffer.from(keyObjString);

    // ENCRYPT EACH EMPLOYEE'S PUBLIC KEY WITH KEY OBJ
    const encryptedKeysObj = await Promise.all(
      employees.map(async (employee: any) => {
        // get public key of each employee in group
        let account = employee.employeeAddress;
        let keyB64 = await window.ethereum.request({
          method: "eth_getEncryptionPublicKey",
          params: [account],
        });
        let publicKey = Buffer.from(keyB64, "base64");
        // encrypt keyObj with each employee's public key
        const enc = encrypt({
          publicKey: publicKey.toString("base64"),
          data: ascii85.encode(keyObjBuffer).toString(),
          version: "x25519-xsalsa20-poly1305",
        });
        const buf = Buffer.concat([
          Buffer.from(enc.ephemPublicKey, "base64"),
          Buffer.from(enc.nonce, "base64"),
          Buffer.from(enc.ciphertext, "base64"),
        ]);
        return {
          buf,
          employeeAddress: employee.employeeAddress,
        };
      })
    );

    //ENCRYPTION OF FILE
    const encryptedFile = await encryptFile(arrayBuff, key, iv);
    const encryptedFileObj = new File(
      [encryptedFile],
      "encrypted_" + file.name
    );

    // upload encrypted file to IPFS
    const encryptedFileAdded = await ipfsClient.add(encryptedFileObj);
    // upload encrypted keys obj to IPFS
    const encryptedKeysObjAdded = await ipfsClient.add(encryptedKeysObj);

    // Update the contract with the IPFS hash of the encrypted file and encrypted keys
    // const contract = await signer.getContractAt();

    return { encryptedFileAdded, encryptedKeysObjAdded };
  } catch (error) {
    console.log(error);
  }
};

// export const handleDownloadData = async (cid: any, keyCid: any) => {
//   try {
//     // FETCH FILE FROM IPFS
//     const file = await ipfsClient.cat(cid);
//     // FETCH KEY FROM IPFS
//     const keyObjEnc = await ipfsClient.cat(keyCid);

//     // Reconstructing the original object outputed by encryption
//     const structuredData = {
//       version: "x25519-xsalsa20-poly1305",
//       ephemPublicKey: data.slice(0, 32).toString("base64"),
//       nonce: data.slice(32, 56).toString("base64"),
//       ciphertext: data.slice(56).toString("base64"),
//     };
//     // Convert data to hex string required by MetaMask
//     const ct = `0x${Buffer.from(
//       JSON.stringify(structuredData),
//       "utf8"
//     ).toString("hex")}`;
//     const decrypt = await window.ethereum.request({
//       method: "eth_decrypt",
//       params: [ct, account],
//     });
//     // Decode the base85 to final bytes
//     const keyObj = ascii85.decode(decrypt);

//     // DECRYPTION OF FILE
//     const textEncryptedFile = await getFileAsTextFromBlob(file);
//     const decryptedFile = await AESDecryptFile(
//       textEncryptedFile,
//       keyObj.key,
//       keyObj.iv
//     );
//     const uintArr = convertWordArrayToUint8Array(decryptedFile);
//     const decryptedFileObject = new File([uintArr], fileName);
//     return decryptedFileObject;
//   } catch (err) {
//     console.log(err);
//   }
// };

const AESDecryptFile = async (encryptedFile: any, secretKey: any, iv: any) => {
  var decrypted = CryptoJS.AES.decrypt(encryptedFile, secretKey, {
    iv: iv,
  });
  return decrypted;
};

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

async function encryptFile(file: ArrayBuffer, key: any, iv: any) {
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