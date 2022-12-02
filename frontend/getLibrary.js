import { Web3Provider } from "@ethersproject/providers";

export default function getLibrary(provider) {
  return new Web3Provider(provider);
}
