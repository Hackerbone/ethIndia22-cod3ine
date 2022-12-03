import SquadButton from '../../components/common/SquadButton'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import './Connect.css'
import { useWeb3AuthContext } from "../../contexts/SocialLoginContext";
import { useSmartAccountContext } from "../../contexts/SmartAccountContext";
import PageLoader from '../../components/common/PageLoader';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Connect = () => {
  const navigate = useNavigate()
  const {
    address,
    connect,
    disconnect,
    loading: authLoading,
  } = useWeb3AuthContext();
  const { setSelectedAccount, loading } = useSmartAccountContext();

  useEffect(() => {
    if (address) {
      navigate("/onboarding")
    }
  }, [address])


  if (loading || authLoading) {
    return <PageLoader />
  }

  return (
    <ConnectLayout image="/images/growth.svg"
      title="Connect Wallet"
      subtitle="You need to connect to your crypto wallet to continue">
      <SquadButton
        style={{ width: 'fit-content', padding: "0rem 3rem" }}
        onClick={
          !address
            ? connect
            : () => {
              setSelectedAccount(null);
              disconnect();
            }
        }
      >{!address ? "Connect Wallet" : "Disconnect Wallet"}</SquadButton>
    </ConnectLayout>
  )
}

export default Connect