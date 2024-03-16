import { Button, Grid, Typography } from "@mui/material";
import { AssetBanner } from "../Asset";
import { UniswapV3LP } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { fetchERC20Balance, walletSlice } from "@/redux/wallet";
import { AssetNumber } from "../Asset/AssetNumber";
import { PanelRow } from "../Panel/Panel";
import { supplyButtonStyle } from "./styles";

export interface UniswapV3LPListProps {
  uniswapV3LPList: UniswapV3LP[];
  supplyOnClick: (uniswapV3LP: UniswapV3LP) => void;
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
  const { allReadableBalances } = useUniswapV3LPList(uniswapV3LPList);

  return (
    <PanelRow>
      {uniswapV3LPList.map((uniswapV3LP) => {
        return (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            key={uniswapV3LP.address}
            columnSpacing={3}
            sx={{ height: "100%" }}
          >
            <Grid item xs={6}>
              <AssetBanner
                name={uniswapV3LP.name}
                logoName={uniswapV3LP.logoName}
              />
            </Grid>
            <Grid item xs={4} textAlign="end">
              <div>
              <AssetNumber>
                {allReadableBalances[uniswapV3LP.address] ?? "0"}
              </AssetNumber>{" "}
              <Typography noWrap component="span">{uniswapV3LP.symbol}</Typography>
              </div>
            </Grid>
            <Grid item xs={2} textAlign="end">
              <Button
                variant="outlined"
                size="small"
                // disabled={false || !allBalances[uniswapV3LP.address]}
                onClick={() => supplyOnClick(uniswapV3LP)}
                sx={supplyButtonStyle}
              >
                Supply
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </PanelRow>
  );
}
