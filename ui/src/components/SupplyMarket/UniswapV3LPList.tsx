import { Button, Grid } from "@mui/material";
import { AssetBanner } from "../Asset";
import { UniswapV3LP } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { fetchERC20Balance, walletSlice } from "@/redux/wallet";

export interface UniswapV3LPListProps {
  uniswapV3LPList: UniswapV3LP[];
  lpOnClick: () => void;
}

export function useUniswapV3LPList(uniswapV3LPList: UniswapV3LP[]) {
  const dispatch = useAppDispatch();
  const allReadableBalances = useAppSelector((state) =>
    walletSlice.selectors.getAllReadableBalances(state)
  );
  const walletAddress = useAppSelector((state) =>
    walletSlice.selectors.getAddress(state)
  );

  useEffect(() => {
    uniswapV3LPList.forEach((uniswapV3LP) => {
      const balanceOfContract = allReadableBalances[uniswapV3LP.address];
      if (balanceOfContract == undefined) {
        dispatch(
          fetchERC20Balance({
            contractAddress: uniswapV3LP.address,
          })
        );
      }
    });
  }, [allReadableBalances, walletAddress]);

  return { allReadableBalances };
}

export function UniswapV3LPList({
  uniswapV3LPList,
  lpOnClick,
}: UniswapV3LPListProps) {
  const { allReadableBalances } = useUniswapV3LPList(uniswapV3LPList);

  return (
    <div>
      {uniswapV3LPList.map((uniswapV3LP) => {
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
              {allReadableBalances[uniswapV3LP.address] ?? "-"}
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="primary" onClick={lpOnClick}>
                Supply
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
