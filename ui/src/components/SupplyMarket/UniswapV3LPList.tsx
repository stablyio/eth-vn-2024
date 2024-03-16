import { Button, Grid } from "@mui/material";
import { AssetBanner } from "../Asset";
import { UniswapV3LP } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { fetchERC20Balance, walletSlice } from "@/redux/wallet";
import { AssetNumber } from "../Asset/AssetNumber";

export interface UniswapV3LPListProps {
  uniswapV3LPList: UniswapV3LP[];
  supplyOnClick: (contractAddress: string) => void;
}

export function useUniswapV3LPList(uniswapV3LPList: UniswapV3LP[]) {
  const dispatch = useAppDispatch();
  const allReadableBalances = useAppSelector((state) =>
    walletSlice.selectors.getAllReadableBalances(state)
  );
  const allBalances = useAppSelector((state) =>
    walletSlice.selectors.getAllBalances(state)
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

  return { allBalances, allReadableBalances };
}

export function UniswapV3LPList({
  uniswapV3LPList,
  supplyOnClick,
}: UniswapV3LPListProps) {
  const { allBalances, allReadableBalances } =
    useUniswapV3LPList(uniswapV3LPList);

  return (
    <div>
      {uniswapV3LPList.map((uniswapV3LP) => {
        return (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            key={uniswapV3LP.address}
            columnSpacing={3}
          >
            <Grid item xs={6}>
              <AssetBanner
                assetTicket={uniswapV3LP.symbol}
                name={uniswapV3LP.name}
              />
            </Grid>
            <Grid item xs={3} textAlign="end">
              <AssetNumber>
                {allReadableBalances[uniswapV3LP.address] ?? "0"}
              </AssetNumber>{" "}
              {uniswapV3LP.symbol}
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                // disabled={false || !allBalances[uniswapV3LP.address]}
                onClick={() => supplyOnClick(uniswapV3LP.address)}
              >
                Supply
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
