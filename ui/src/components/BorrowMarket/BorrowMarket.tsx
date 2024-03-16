import React from "react";
import { Box, Grid, styled } from "@mui/material";
import styles from "./borrowmarket.module.css";
import { SupplyModal } from "../SupplyModal/SupplyModal";
import { LiquidityAssetList } from "./LiquidityAssetList";
import { CurrentConfig, getErc20LiquidityAssets, getUniswapV3LPList } from "@/config";
import { useAppDispatch } from "@/store";

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
  const dispatch = useAppDispatch();
 
 
  const supplyOnClick = (contractAddress: string) => {
    setSelectedContractAddress(contractAddress);
    setOpen(true);
  };

  // Call Contract to lend the LP token
  const handleSupplyClicked = (lpTokenAddress: string, amount: number) => {
    // dispatch(userLend({ lpTokenAddress, amount }));
  };

  return (
    <div>
      <h1>Borrow Markets</h1>
      <h3>To borrow you need to supply any asset to be used as collateral.</h3>
      <div>
        <Grid
          container
          className={styles.tableHeader}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3} padding={0}>
            <Item>Asset</Item>
          </Grid>
          <Grid item xs={6}>
            Liquidity
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
      </div>
      <div>
        <LiquidityAssetList
          erc20LiquidityAssets={getErc20LiquidityAssets()}
          supplyOnClick={supplyOnClick}
        />
        <SupplyModal
          isOpen={open}
          handleClose={handleClose}
          contractAddress={selectedContractAddress}
          handleSupply={handleSupplyClicked}
        />
      </div>
    </div>
  );
}
