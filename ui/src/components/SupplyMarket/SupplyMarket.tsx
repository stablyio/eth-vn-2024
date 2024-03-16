import React from "react";
import { Box, Grid, styled } from "@mui/material";
import styles from "./supplymarket.module.css";
import { SupplyModal } from "../SupplyModal/SupplyModal";
import { UniswapV3LPList } from "./UniswapV3LPList";
import { CurrentConfig } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { borrowLending, userLend } from "@/redux/borrowlending";

const Item = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function SupplyMarket() {
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
    dispatch(userLend({ lpTokenAddress, amount }));
  };

  return (
    <div>
      <h1>Supply Markets</h1>
      <h3>Collteral your LSDs position(s) to borrowing assets.</h3>
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
            Wallet balance
          </Grid>
          <Grid item xs={3}>
            Actions
          </Grid>
        </Grid>
      </div>
      <div>
        <UniswapV3LPList
          uniswapV3LPList={CurrentConfig.uniswapV3LP}
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
