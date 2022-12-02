import { useWeb3React } from "@web3-react/core";
import useTokenBalance from "../hooks/useTokenBalance";
import { parseBalance } from "../util";

const TokenBalance = ({ tokenAddress, symbol }) => {
  const { account } = useWeb3React();
  const { data } = useTokenBalance(account, tokenAddress);

  return (
    <p>
      {`${symbol} Balance`}: {parseBalance(data ?? 0)}
    </p>
  );
};

export default TokenBalance;
