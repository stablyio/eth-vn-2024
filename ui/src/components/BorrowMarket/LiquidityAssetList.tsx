import { Button, Grid } from "@mui/material";
import { AssetBanner } from "../Asset";
import { AssetProp, ERC20LiquidityAsset } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { walletSlice } from "@/redux/wallet";
import {
  borrowLending,
  getLendingPoolOfCurrentWallet,
} from "@/redux/borrowlending";
import { AssetNumber } from "../Asset/AssetNumber";
import { PanelRow } from "../Panel/Panel";

export interface UniswapV3LPListProps {
  erc20LiquidityAssets: ERC20LiquidityAsset[];
  borrowOnClick: (asset: AssetProp) => void;
}

export function useLiquidityAssetList() {
  const dispatch = useAppDispatch();
  const walletAddress = useAppSelector((state) =>
    walletSlice.selectors.getAddress(state)
  );
  const lendUserInfos = useAppSelector((state) =>
    borrowLending.selectors.getLendUserInfo(state)
  );

  useEffect(() => {
    dispatch(getLendingPoolOfCurrentWallet());
  }, []);

  return { lendUserInfos };
}

export function LiquidityAssetList({
  erc20LiquidityAssets,
  borrowOnClick,
}: UniswapV3LPListProps) {
  const { lendUserInfos } = useLiquidityAssetList();

  return (
    <PanelRow>
      {erc20LiquidityAssets.map((uniswapV3LP) => {
        const currentLend =
          (lendUserInfos &&
            lendUserInfos[
              uniswapV3LP.lendingPoolId
            ]?.currTotalLend.toString()) ||
          0;
        return (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            key={uniswapV3LP.address}
            columnSpacing={2}
            rowSpacing={2}
            sx={{
              marginTop: "0px",
            }}
          >
            <Grid item xs={6}>
              <AssetBanner
                name={uniswapV3LP.name}
                logoName={uniswapV3LP.logoName}
              />
            </Grid>
            <Grid item xs={4} textAlign="end">
              <AssetNumber>{currentLend}</AssetNumber> {uniswapV3LP.symbol}
            </Grid>
            <Grid item xs={2} textAlign="end">
              <Button
                variant="outlined"
                color="primary"
                size="small"
                // disabled={false || !allBalances[uniswapV3LP.address]}
                onClick={() => borrowOnClick(uniswapV3LP)}
                sx={{ width: "85px" }}
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
