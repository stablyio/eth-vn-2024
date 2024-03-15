import React from "react";
import RootLayout from "./layout";
import styles from "./app.module.css";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

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
          <div></div>
        </RootLayout>
      </MetaMaskUIProvider>
    </main>
  );
}
