import { Button, Grid } from "@mui/material";
import { AssetBanner } from "../Asset";
import { ERC20LiquidityAsset } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { walletSlice } from "@/redux/wallet";
import { getLendingPoolOfCurrentWallet } from "@/redux/borrowlending";
import { AssetNumber } from "../Asset/AssetNumber";
import { PanelRow } from "../Panel/Panel";

export interface UniswapV3LPListProps {
  erc20LiquidityAssets: ERC20LiquidityAsset[];
  borrowOnClick: (contractAddress: string) => void;
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
  borrowOnClick,
}: UniswapV3LPListProps) {
  const {} = useLiquidityAssetList();

  return (
    <PanelRow>
      {erc20LiquidityAssets.map((uniswapV3LP) => {
        return (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            key={uniswapV3LP.address}
            columnSpacing={3}
          >
            <Grid item xs={3}>
              <AssetBanner
                assetTicket={uniswapV3LP.symbol}
                name={uniswapV3LP.name}
                logoName={uniswapV3LP.logoName}
              />
            </Grid>
            <Grid item xs={6} textAlign="end">
              <AssetNumber>{"0"}</AssetNumber> {uniswapV3LP.symbol}
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                // disabled={false || !allBalances[uniswapV3LP.address]}
                onClick={() => borrowOnClick(uniswapV3LP.address)}
              >
                Borrow
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </PanelRow>
  );
}
