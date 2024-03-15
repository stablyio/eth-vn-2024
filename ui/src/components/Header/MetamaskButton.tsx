import { useEffect } from "react";
import { walletSwitchToLineaNetwork } from "@/libs/providers";
import { MetaMaskButton } from "@metamask/sdk-react-ui";

export function MetamaskButton() {
  useEffect(() => {
    walletSwitchToLineaNetwork();
  }, []);

  return (
    <MetaMaskButton></MetaMaskButton>
  );
}
