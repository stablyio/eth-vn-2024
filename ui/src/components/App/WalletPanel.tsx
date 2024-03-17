import { getCurrentNetworkConfig } from "@/config";
import { walletSwitchToLineaNetwork } from "@/libs/providers";
import {
  ethereumProviderInit,
  ethereumProviderSlice,
} from "@/redux/ethereumProvider";
import { walletSlice } from "@/redux/wallet";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { useEffect } from "react";

const BalanceWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

const Title = styled("span")({
  // backgroundColor: "#CFD8DC",
  color: "#FFFFFF",
  fontWeight: 600,
  fontSize: "1.2rem",
});

const WalletPanelWrapper = styled("div")({
  height: "300px",
  backgroundColor: "#ab00ff",
  backgroundImage:
    "radial-gradient(circle at center center, #ffffff, #ab00ff), repeating-radial-gradient(circle at center center, #ffffff, #ffffff, 10px, transparent 20px, transparent 10px)",
  backgroundBlendMode: "multiply",
});

const CenterWrapper = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyItems: "center",
  justifyContent: "center",
});

export function WalletPanel() {
  const currentNetworkConfig = getCurrentNetworkConfig();
  const chainID = useAppSelector((state) =>
    ethereumProviderSlice.selectors.getChainID(state)
  );
  const account = useAppSelector((state) =>
    ethereumProviderSlice.selectors.getAccount(state)
  );
  const shouldChangeNetwork = chainID !== currentNetworkConfig.chainID;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ethereumProviderInit());

    window.ethereum.on("chainChanged", (chainId: string) => {
      dispatch(ethereumProviderInit());
    });

    window.ethereum.on("accountsChanged", (chainId: string) => {
      dispatch(ethereumProviderInit());
    });
  }, []);

  useEffect(() => {
    dispatch(walletSlice.actions.updateWalletAddress(account));
  }, [account]);

  return (
    <WalletPanelWrapper sx={{ color: "white" }}>
      {/* <Paper elevation={0} />
      <Paper />
      <Paper elevation={3} /> */}
      {/* <Divider orientation="vertical" variant="middle" /> */}
      <Grid
        container
        sx={{
          display: "flex",
          paddingTop: "2rem",
        }}
      >
        <Grid item md={2} xs={0}></Grid>
        <Grid item md={3} xs={12} justifyContent="center">
          <BalanceWrapper>
            <Title>Supply Balance</Title>
            <div>0</div>
          </BalanceWrapper>
        </Grid>
        <Grid item md={3} xs={12}>
          <BalanceWrapper>
            <Title>Borrow Balance</Title>
            <div>0</div>
          </BalanceWrapper>
        </Grid>

        <Grid
          item
          md={3}
          xs={12}
          alignContent="center"
          justifyContent="center"
          sx={
            {
              // backgroundColor: "black",
              // borderRadius: "50%",
              // width: "150px",
              // height: "150px",
            }
          }
          style={{
            flexBasis: "auto",
          }}
        >
          <CenterWrapper>
            {shouldChangeNetwork ? (
              <Button onClick={() => walletSwitchToLineaNetwork()} sx={{color: "white"}}>
                Switch to Linea Network
              </Button>
            ) : (
              <>
                <span>Chan ID</span>
                <span>
                  <b>{chainID ?? "N/A"}</b>
                </span>
                <span>Account</span>
                <Typography noWrap component="span" sx={{ width: "100px" }}>
                  {account ?? "N/A"}
                </Typography>
              </>
            )}
          </CenterWrapper>
        </Grid>

        <Grid item md={2} xs={0}></Grid>
      </Grid>
    </WalletPanelWrapper>
  );
}
