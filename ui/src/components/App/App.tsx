import React from 'react';
import RootLayout from "./layout";
import styles from "./app.module.css";

// The startup page for displaying every features of the app
export function App() {
  return (
    <main className={styles.main}>
     
          <RootLayout>
            <div></div>
            </RootLayout> 
    </main>
  );
}
