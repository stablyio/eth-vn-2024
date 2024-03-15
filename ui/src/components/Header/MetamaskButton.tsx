import { walletSwitchToLineaNetwork } from "@/libs/providers";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import { useSDK } from "@metamask/sdk-react";
import { getCurrentNetworkConfig } from "@/config";
import { Button } from "@mui/material";
import { useAppDispatch } from "@/store";
import { useEffect } from "react";
import { walletSlice } from "@/redux/wallet";

export function MetamaskButton() {
  const currentNetworkConfig = getCurrentNetworkConfig();
  const { account, chainId } = useSDK();
  const chainIDNumber = Number(chainId);
  const shouldChangeNetwork = chainIDNumber !== currentNetworkConfig.chainID;
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("account", account);
    if (account) {
      dispatch(walletSlice.actions.updateWalletAddress(account));
    }
  }, [account]);

  if (shouldChangeNetwork) {
    return (
      <Button onClick={walletSwitchToLineaNetwork}>
        Switch to Linea Network
      </Button>
    );
  }

  return <MetaMaskButton></MetaMaskButton>;
}
