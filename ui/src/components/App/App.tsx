import React from "react";
import RootLayout from "./layout";
import styles from "./app.module.css";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import { Grid } from "@mui/material";
import { SupplyMarket } from "../SupplyMarket";

// The startup page for displaying every features of the app
export function App() {
  return (
    <main>
      <MetaMaskUIProvider
        sdkOptions={{
          dappMetadata: {
            name: "Example React UI Dapp",
            url: window.location.href,
          },
          // Other options
        }}
      >
        <RootLayout>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <SupplyMarket /> 
            </Grid>
            <Grid item xs={6} md={6}>
              <p>List</p>
            </Grid>
          </Grid>
        </RootLayout>
      </MetaMaskUIProvider>
    </main>
  );
}
