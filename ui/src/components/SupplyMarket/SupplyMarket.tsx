import React from "react";
import { Box, Button, Grid, Modal, styled } from "@mui/material";
import styles from "./supplymarket.module.css";
import { AssetBanner } from "../Asset";
import { SupplyForm } from "../SupplyModal/SupplyForm";
import { SupplyModal } from "../SupplyModal/SupplyModal";

const Item = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function SupplyMarket() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <h1>Supply Markets</h1>
      <h2>Collteral your LSDs position(s) to borrowing assets.</h2>
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
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={3}>
            <AssetBanner assetTicket="USDC" />
          </Grid>
          <Grid item xs={6}>
            -
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Supply
            </Button>
          </Grid>
        </Grid>
        <SupplyModal isOpen={open} handleClose={handleClose} />
      </div>
    </div>
  );
}
