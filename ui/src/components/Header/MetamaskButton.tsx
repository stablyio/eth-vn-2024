import { walletSwitchToLineaNetwork } from "@/libs/providers";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import { useSDK } from "@metamask/sdk-react";
import { getCurrentNetworkConfig } from "@/config";
import { Button } from "@mui/material";

export function MetamaskButton() {
  const currentNetworkConfig = getCurrentNetworkConfig();
  const { chainId } = useSDK();
  const chainIDNumber = Number(chainId);
  const shouldChangeNetwork = chainIDNumber !== currentNetworkConfig.chainID;

  if (shouldChangeNetwork) {
    return (
      <Button onClick={walletSwitchToLineaNetwork}>
        Switch to Linea Network
      </Button>
    );
  }

  return <MetaMaskButton></MetaMaskButton>;
}
