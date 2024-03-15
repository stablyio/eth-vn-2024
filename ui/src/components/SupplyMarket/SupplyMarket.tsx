import React from "react";
import { Grid } from "@mui/material";

export function SupplyMarket() {
  return (
    <div>
      <h1>Supply Markets</h1>
      <div>
        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            Asset
          </Grid>
          <Grid item xs={6}>
            Wallet balance
          </Grid>
          <Grid item xs={3}>
            Actions
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
