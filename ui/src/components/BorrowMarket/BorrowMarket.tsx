import React, { useEffect } from "react";
import { Box, Grid, ThemeProvider, createTheme, styled } from "@mui/material";
import styles from "./borrowmarket.module.css";
import { LiquidityAssetList } from "./LiquidityAssetList";
import { AssetProp, UniswapV3LP, getErc20LiquidityAssets } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { getLendingPoolOfCurrentWallet } from "@/redux/borrowlending";
import { BorrowModal } from "../BorrowModal/BorrowModal";
import {
  Panel,
  PanelHeader,
  PanelHeaderDesc,
  PanelLabel,
  PanelLabelText,
} from "../Panel/Panel";

const borrowTheme = createTheme({
  palette: {
    primary: {
      main: "#9669ED",
    },
  },
});

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function BorrowMarket() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [selectedUniswapV3LP, setSelectedUniswapV3LP] =
    React.useState<UniswapV3LP | undefined>();

  const currentWalletAddress = useAppSelector((state) => state.wallet.address);
  const dispatch = useAppDispatch();

  const borrowOnClick = (uniswapV3LP: UniswapV3LP) => {
    setSelectedUniswapV3LP(uniswapV3LP);
    setOpen(true);
  };

  // Call Contract to lend the LP token
  const handleBorrowClicked = (asset: AssetProp, amount: number) => {
    // dispatch(userLend({ lpTokenAddress, amount }));
  };

  useEffect(() => {
    dispatch(getLendingPoolOfCurrentWallet());
  }, [currentWalletAddress]);

  return (
    <ThemeProvider theme={borrowTheme}>
      <Panel>
        <PanelHeader sx={{ borderBottomColor: "#9669ED" }}>
          <h4 style={{ margin: "0px" }}>Borrow Markets</h4>
          <PanelHeaderDesc>
            To borrow you need to supply any asset to be used as collateral.
          </PanelHeaderDesc>
        </PanelHeader>
        <PanelLabel>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={6} padding={0}>
              <PanelLabelText>Asset</PanelLabelText>
            </Grid>
            <Grid item xs={4} textAlign="end">
              <PanelLabelText>Liquidity</PanelLabelText>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </PanelLabel>
        <div>
          <LiquidityAssetList
            erc20LiquidityAssets={getErc20LiquidityAssets()}
            borrowOnClick={borrowOnClick}
          />
          <BorrowModal
            isOpen={open}
            handleClose={handleClose}
            asset={selectedUniswapV3LP}
            handleBorrow={handleBorrowClicked}
          />
        </div>
      </Panel>
    </ThemeProvider>
  );
}
