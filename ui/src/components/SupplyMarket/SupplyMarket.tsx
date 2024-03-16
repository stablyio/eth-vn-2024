import React from "react";
import { Grid } from "@mui/material";
import { SupplyModal } from "../SupplyModal/SupplyModal";
import { UniswapV3LPList } from "./UniswapV3LPList";
import { getUniswapV3LPList } from "@/config";
import { useAppDispatch } from "@/store";
import { userLend } from "@/redux/borrowlending";
import { Panel, PanelHeader, PanelLabel, PanelLabelText } from "../Panel/Panel";

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
    <Panel>
      <PanelHeader>
        <h4>Supply Markets</h4>
      </PanelHeader>
      <h4>Collteral your LSDs position(s) to borrowing assets.</h4>
      <PanelLabel>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={3} padding={0}>
            <PanelLabelText>Asset</PanelLabelText>
          </Grid>
          <Grid item xs={6} textAlign="end">
            <PanelLabelText>Wallet balance</PanelLabelText>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </PanelLabel>
      <div>
        <UniswapV3LPList
          uniswapV3LPList={getUniswapV3LPList()}
          supplyOnClick={supplyOnClick}
        />
        <SupplyModal
          isOpen={open}
          handleClose={handleClose}
          contractAddress={selectedContractAddress}
          handleSupply={handleSupplyClicked}
        />
      </div>
    </Panel>
  );
}
