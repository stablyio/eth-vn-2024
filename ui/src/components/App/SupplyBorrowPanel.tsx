import { useEffect } from "react";
import { getLendingBorrowContract } from "@/config";
import { borrowLending } from "@/redux/borrowlending";
import { useAppDispatch } from "@/store";
import { Grid } from "@mui/material";
import { SupplyMarket } from "../SupplyMarket";
import { BorrowMarket } from "../BorrowMarket";

export function SupplyBorrowPanel() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const lendintBorrowContract = getLendingBorrowContract();
    dispatch(
      borrowLending.actions.updateLendingContractAddress(
        lendintBorrowContract.lendingContractAddress
      )
    );

    dispatch(
      borrowLending.actions.updateBorrowContractAddress(
        lendintBorrowContract.borrowContractAddress
      )
    );
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <SupplyMarket />
      </Grid>
      <Grid item xs={12} md={6}>
        <BorrowMarket />
      </Grid>
    </Grid>
  );
}
