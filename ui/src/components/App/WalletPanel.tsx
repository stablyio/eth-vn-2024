import { getCurrentNetworkConfig } from "@/config";
import { walletSwitchToLineaNetwork } from "@/libs/providers";
import { useSDK } from "@metamask/sdk-react";
import { Button, styled } from "@mui/material";

const BalanceWrapper = styled("div")({});
const Title = styled("div")({
  color: "#FFFFFF",
  fontWeight: 600,
  fontSize: "1.5rem",
});
const WalletPanelWrapper = styled("div")({
  backgroundColor: "#ab00ff",
  height: "300px",
});
export function WalletPanel() {
  const currentNetworkConfig = getCurrentNetworkConfig();
  const { chainId, account } = useSDK();
  const chainIDNumber = Number(chainId);
  const shouldChangeNetwork = chainIDNumber !== currentNetworkConfig.chainID;

  return (
    <WalletPanelWrapper>
      <div style={{ margin: "30ox", display: "flex" }}>
        <BalanceWrapper>
          <Title>Supply balance</Title>
          <div>0</div>
        </BalanceWrapper>
        <BalanceWrapper>
          <Title sx={{color: "black"}}>Borrow Balance</Title>
          <div>0</div>
        </BalanceWrapper>
      </div>
      <div>Chan ID</div>
      <div>
        <b>{chainId ? Number(chainId) : "N/A"}</b>
      </div>
      <div>Account</div>
      <div>{account ?? "N/A"}</div>
      {shouldChangeNetwork && (
        <Button onClick={walletSwitchToLineaNetwork}>
          Switch to Linea Network
        </Button>
      )}
    </WalletPanelWrapper>
  );
}
