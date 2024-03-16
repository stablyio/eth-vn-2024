import React from "react";
import { Provider } from "react-redux";
import RootLayout from "./layout";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

import { CssBaseline, Grid, ThemeProvider, createTheme } from "@mui/material";
import { store } from "../../store";
import { SupplyBorrowPanel } from "./SupplyBorrowPanel";

const darkTheme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      'main': '#ab00ff'
    }
  },
});

// The startup page for displaying every features of the app
export function App() {
  return (
    <main>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
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
            <Provider store={store}>
              <RootLayout>
                <SupplyBorrowPanel />
              </RootLayout>
            </Provider>
          </MetaMaskUIProvider>
        </MetaMaskProvider>
      </ThemeProvider>
    </main>
  );
}
