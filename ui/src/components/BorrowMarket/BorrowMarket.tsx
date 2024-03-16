import React, { useEffect } from "react";
import { Box, Grid, styled } from "@mui/material";
import styles from "./borrowmarket.module.css";
import { LiquidityAssetList } from "./LiquidityAssetList";
import { getErc20LiquidityAssets } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { getLendingPoolOfCurrentWallet } from "@/redux/borrowlending";
import { BorrowModal } from "../BorrowModal/BorrowModal";
import { Panel, PanelHeader, PanelLabel } from "../Panel/Panel";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function BorrowMarket() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [selectedContractAddress, setSelectedContractAddress] =
    React.useState("");

  const currentWalletAddress = useAppSelector((state) => state.wallet.address);
  const dispatch = useAppDispatch();

  const borrowOnClick = (contractAddress: string) => {
    setSelectedContractAddress(contractAddress);
    setOpen(true);
  };

  // Call Contract to lend the LP token
  const handleBorrowClicked = (lpTokenAddress: string, amount: number) => {
    // dispatch(userLend({ lpTokenAddress, amount }));
  };

  useEffect(() => {
    dispatch(getLendingPoolOfCurrentWallet());
  }, [currentWalletAddress]);

  return (
    <Panel>
      <PanelHeader><h4>Borrow Markets</h4></PanelHeader>
      <h4>To borrow you need to supply any asset to be used as collateral.</h4>
      <div>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={3} padding={0}>
            <PanelLabel>Asset</PanelLabel>
          </Grid>
          <Grid item xs={6}>
            <PanelLabel>Liquidity</PanelLabel>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
      <div>
        <LiquidityAssetList
          erc20LiquidityAssets={getErc20LiquidityAssets()}
          borrowOnClick={borrowOnClick}
        />
        <BorrowModal
          isOpen={open}
          handleClose={handleClose}
          contractAddress={selectedContractAddress}
          handleBorrow={handleBorrowClicked}
        />
      </div>
    </Panel>
  );
}
