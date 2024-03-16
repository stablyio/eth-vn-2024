import { getCurrentNetworkConfig } from "@/config";
import { walletSwitchToLineaNetwork } from "@/libs/providers";
import { useSDK } from "@metamask/sdk-react";
import { Button, Grid, styled } from "@mui/material";

const BalanceWrapper = styled("div")({});

const Title = styled("div")({
  color: "#FFFFFF",
  fontWeight: 600,
  fontSize: "1.5rem",
});

const WalletPanelWrapper = styled("div")({
  height: "300px",
  backgroundColor: "#ab00ff",
  backgroundImage:
    "radial-gradient(circle at center center, #ffffff, #ab00ff), repeating-radial-gradient(circle at center center, #ffffff, #ffffff, 10px, transparent 20px, transparent 10px)",
  backgroundBlendMode: "multiply",
});

const CenterWrapper = styled("div")({
  borderRadius: "50%",
  maxWidth: "150px",
  display: "flex",
  justifyContent: "center",
});

export function WalletPanel() {
  const currentNetworkConfig = getCurrentNetworkConfig();
  // const { chainId, account } = useSDK();
  const {chainId, account} = {} as any;
  const chainIDNumber = Number(chainId);
  const shouldChangeNetwork = chainIDNumber !== currentNetworkConfig.chainID;

  return (
    <WalletPanelWrapper sx={{ color: "white" }}>
      <Grid container>
        <Grid item xs={3}>
          <BalanceWrapper>
            <Title>Supply balance</Title>
            <div>0</div>
          </BalanceWrapper>
        </Grid>

        <Grid item xs={6} alignContent="center" justifyContent="center">
          <CenterWrapper>
            {shouldChangeNetwork ? (
              <Button onClick={walletSwitchToLineaNetwork}>
                Switch to Linea Network
              </Button>
            ) : (
              <div>
                <div>Chan ID</div>
                <div>
                  <b>{chainId ? Number(chainId) : "N/A"}</b>
                </div>
                <div>Account</div>
                <div>{account ?? "N/A"}</div>
              </div>
            )}
          </CenterWrapper>
        </Grid>

        <Grid item xs={3}>
          <BalanceWrapper>
            <Title sx={{ color: "black" }}>Borrow Balance</Title>
            <div>0</div>
          </BalanceWrapper>
        </Grid>
      </Grid>
    </WalletPanelWrapper>
  );
}
