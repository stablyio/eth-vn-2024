import { Button, Grid } from "@mui/material";
import { AssetBanner } from "../Asset";
import { ERC20LiquidityAsset } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { walletSlice } from "@/redux/wallet";
import { getLendingPoolOfCurrentWallet } from "@/redux/borrowlending";

export interface UniswapV3LPListProps {
  erc20LiquidityAssets: ERC20LiquidityAsset[];
  supplyOnClick: (contractAddress: string) => void;
}

export function useLiquidityAssetList() {
  const dispatch = useAppDispatch();
  const walletAddress = useAppSelector((state) =>
    walletSlice.selectors.getAddress(state)
  );

  
  return {};
}

export function LiquidityAssetList({
  erc20LiquidityAssets,
  supplyOnClick,
}: UniswapV3LPListProps) {
  const {} = useLiquidityAssetList();

  return (
    <div>
      {erc20LiquidityAssets.map((uniswapV3LP) => {
        return (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            key={uniswapV3LP.address}
          >
            <Grid item xs={3}>
              <AssetBanner assetTicket={uniswapV3LP.symbol} />
            </Grid>
            <Grid item xs={6}>
              {"-"}
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                // disabled={false || !allBalances[uniswapV3LP.address]}
                onClick={() => supplyOnClick(uniswapV3LP.address)}
              >
                Borrow
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
