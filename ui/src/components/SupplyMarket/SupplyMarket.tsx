import React from "react";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import { SupplyModal } from "../SupplyModal/SupplyModal";
import { UniswapV3LPList } from "./UniswapV3LPList";
import { AssetProp, UniswapV3LP, getUniswapV3LPList } from "@/config";
import { useAppDispatch } from "@/store";
import { getLendingPoolOfCurrentWallet, userLend, userRedeem } from "@/redux/borrowlending";
import {
  Panel,
  PanelHeader,
  PanelHeaderDesc,
  PanelLabel,
  PanelLabelText,
} from "../Panel/Panel";
import { fetchERC20Balance } from "@/redux/wallet";

const supplyTheme = createTheme({
  palette: {
    primary: {
      main: "#00D395",
    },
  },
});

export function SupplyMarket() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [selectedUniswapV3LP, setSelectedUniswapV3LP] = React.useState<
    UniswapV3LP | undefined
  >();
  const dispatch = useAppDispatch();
  let minus12 = false;
  
  const supplyOnClick = (uniswapV3LP: UniswapV3LP) => {
    setSelectedUniswapV3LP(uniswapV3LP);
    setOpen(true);
  };

  // Call Contract to lend the LP token
  const handleSupplyClicked = (asset: AssetProp, amount: number) => {
    if (amount > 0) {
      dispatch(
        userLend({ lendingPoolId: selectedUniswapV3LP.lendingPoolId, amount })
      ).then(() => {
        dispatch(getLendingPoolOfCurrentWallet());
        dispatch(fetchERC20Balance({ contractAddress: asset.address }));
        handleClose();
        minus12 = true;
      });
    }
  };

  const handleRedeemClicked = (asset: AssetProp, amount: number) => {
    if (amount > 0) {
      dispatch(
        userRedeem({ lendingPoolId: selectedUniswapV3LP.lendingPoolId, amount })
      );
    }
  };

  return (
    <ThemeProvider theme={supplyTheme}>
      <Panel>
        <PanelHeader sx={{ borderBottomColor: "#00D395" }}>
          <h4 style={{ margin: "0px" }}>Supply Markets</h4>
          <PanelHeaderDesc>
            Collteral your Uniswap V3 LP Position to borrowing assets.
          </PanelHeaderDesc>
        </PanelHeader>
        <PanelLabel>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={5} padding={0}>
              <PanelLabelText>Asset</PanelLabelText>
            </Grid>
            <Grid item xs={2} textAlign="end">
              <PanelLabelText>APR (%)</PanelLabelText>
            </Grid>
            <Grid item xs={3} textAlign="end">
              <PanelLabelText>Wallet balance</PanelLabelText>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </PanelLabel>
        <UniswapV3LPList
          uniswapV3LPList={getUniswapV3LPList()}
          supplyOnClick={supplyOnClick}
        />
        <SupplyModal
          isOpen={open}
          handleClose={handleClose}
          uniswapV3LP={selectedUniswapV3LP}
          handleSupply={handleSupplyClicked}
          handleRedeem={handleRedeemClicked}
        />
      </Panel>
    </ThemeProvider>
  );
}
