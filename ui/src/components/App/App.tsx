import React from "react";
import RootLayout from "./layout";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

import { Grid } from "@mui/material";
import { SupplyMarket } from "../SupplyMarket";
import { Provider } from "react-redux";
import { store } from "../../store";
// The startup page for displaying every features of the app
export function App() {
  return (
    <main>
      <Provider store={store}>
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            dappMetadata: {
              name: "Lending Borrowing Dapp",
              url: window.location.href,
            },
          }}
        >
          <MetaMaskUIProvider
            sdkOptions={{
              dappMetadata: {
                name: "Lending Borrowing Dapp",
                url: window.location.href,
              },
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
        </MetaMaskProvider>
      </Provider>
    </main>
  );
}
