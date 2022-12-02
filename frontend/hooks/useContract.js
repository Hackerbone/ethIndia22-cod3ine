import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export default function useContract(address, ABI) {
  const { library, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library || !chainId) {
      return null;
    }

    try {
      return new Contract(address, ABI, library.getSigner(account));
    } catch (error) {
      console.error("Failed To Get Contract", error);

      return null;
    }
  }, [address, ABI, library, account, chainId]);
}
