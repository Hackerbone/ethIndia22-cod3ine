import React, { useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import SocialLogin, { getSocialLoginSDK } from "@biconomy/web3-auth";
import { activeChainId } from "../utils/chainConfig";

// Types
export enum SignTypeMethod {
  PERSONAL_SIGN = "PERSONAL_SIGN",
  EIP712_SIGN = "EIP712_SIGN",
}

type StateType = {
  provider?: any;
  web3Provider?: ethers.providers.Web3Provider | null;
  ethersProvider?: ethers.providers.Web3Provider | null;
  address?: string;
  chainId?: number;
};
interface web3AuthContextType {
  connect: () => Promise<SocialLogin | null | undefined>;
  disconnect: () => Promise<void>;
  getUserInfo: () => Promise<any>;
  provider: any;
  ethersProvider: ethers.providers.Web3Provider | null;
  web3Provider: ethers.providers.Web3Provider | null;
  loading: boolean;
  chainId: number;
  address: string;
  userInfo: any;
}

// Initial State
const initialState: StateType = {
  provider: null,
  web3Provider: null,
  ethersProvider: null,
  address: "",
  chainId: activeChainId,
};

// Create Context
export const Web3AuthContext = React.createContext<web3AuthContextType>({
  connect: () => Promise.resolve(null),
  disconnect: () => Promise.resolve(),
  getUserInfo: () => Promise.resolve(),
  loading: false,
  provider: null,
  ethersProvider: null,
  web3Provider: null,
  chainId: activeChainId,
  address: "",
  userInfo: null,
});

export const useWeb3AuthContext = () => useContext(Web3AuthContext);

export const Web3AuthProvider = ({ children }: any) => {
  const [web3State, setWeb3State] = useState<StateType>(initialState);

  const { provider, web3Provider, ethersProvider, address, chainId } =
    web3State;

  const [loading, setLoading] = useState(false);

  const [socialLoginSDK, setSocialLoginSDK] = useState<SocialLogin | null>(
    null
  );

  const [userInfo, setUserInfo] = useState<any>(null);

  const checkIfUserIsLoggedIn = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          const address = accounts[0];
          const chainId = await ethereum.request({
            method: "eth_chainId",
          });
          const web3Provider = new ethers.providers.Web3Provider(ethereum);
          const ethersProvider = new ethers.providers.Web3Provider(ethereum);

          setWeb3State({
            ...web3State,
            address,
            chainId,
            web3Provider,
            ethersProvider,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // if wallet already connected close widget
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const connect = useCallback(async () => {
    if (address) return; // if already connected return

    if (socialLoginSDK?.provider) {
      setLoading(true);
      const web3Provider = new ethers.providers.Web3Provider(
        socialLoginSDK.provider
      );

      const signer = web3Provider.getSigner();
      const gotAccount = await signer.getAddress();
      const network = await web3Provider.getNetwork();

      setWeb3State({
        provider: socialLoginSDK.provider,
        web3Provider: web3Provider,
        ethersProvider: web3Provider,
        address: gotAccount,
        chainId: Number(network.chainId),
      });

      setLoading(false);
      return;
    }

    if (socialLoginSDK) {
      socialLoginSDK.showWallet();
      return;
    }

    setLoading(true);

    const sdk = await getSocialLoginSDK(ethers.utils.hexValue(80001));

    sdk.showConnectModal();

    sdk.showWallet();

    setSocialLoginSDK(sdk);

    setLoading(false);

    return socialLoginSDK;
  }, [address, socialLoginSDK]);

  const getUserInfo = useCallback(async () => {
    if (socialLoginSDK) {
      const userInfo = await socialLoginSDK.getUserInfo();
      console.log("userInfo", userInfo);
      setUserInfo(userInfo);
    }
  }, [socialLoginSDK]);

  // after social login -> set provider info
  useEffect(() => {
    (async () => {
      if (window && (window as any).location.hash && !address) {
        const sdk = await getSocialLoginSDK(ethers.utils.hexValue(80001));
        setSocialLoginSDK(sdk);
      }
    })();
  }, [connect, address]);

  // after metamask login -> get provider event
  useEffect(() => {
    const interval = setInterval(async () => {
      if (address) {
        clearInterval(interval);
      }
      if (socialLoginSDK && !address) {
        connect();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [address, connect, socialLoginSDK]);

  const disconnect = useCallback(async () => {
    if (socialLoginSDK) {
      await socialLoginSDK.logout();
      (window as any).getSocialLoginSDK = null;

      socialLoginSDK.hideWallet();
    }

    // remove metamask provider from browser
    if (window.ethereum) {
      window.ethereum.removeAllListeners();
      console.log("kardia");
    }

    if (web3State) {
      setWeb3State(initialState);
    }
    setUserInfo(null);
    setSocialLoginSDK(null);
  }, [socialLoginSDK, web3State]);

  return (
    <Web3AuthContext.Provider
      value={{
        connect,
        disconnect,
        getUserInfo,
        loading,
        provider: provider,
        ethersProvider: ethersProvider || null,
        web3Provider: web3Provider || null,
        chainId: chainId || 0,
        address: address || "",
        userInfo,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};
