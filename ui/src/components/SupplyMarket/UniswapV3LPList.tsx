import { Button, Grid, Typography } from "@mui/material";
import { AssetBanner } from "../Asset";
import { UniswapV3LP } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { fetchERC20Balance, walletSlice } from "@/redux/wallet";
import { AssetNumber } from "../Asset/AssetNumber";
import { PanelRow } from "../Panel/Panel";
import { supplyButtonStyle } from "./styles";
import { borrowLending } from "@/redux/borrowlending";

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
  const lendingContractAddress = useAppSelector((state) =>
    borrowLending.selectors.getLendingContractAddress(state)
  );

  useEffect(() => {
    if (lendingContractAddress && walletAddress) {
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
    }
  }, [lendingContractAddress, walletAddress]);

  return { allBalances, allReadableBalances };
}

export function UniswapV3LPList({
  uniswapV3LPList,
  supplyOnClick,
}: UniswapV3LPListProps) {
  const minus12 = false;
  const { allReadableBalances } = useUniswapV3LPList(uniswapV3LPList);
  let getBalance = (uniswapV3LP, minus12) => {
    let balance =  +allReadableBalances[uniswapV3LP.address]
    return minus12 ? balance - 12 : balance;
  }
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
            <Grid item xs={5}>
              <AssetBanner
                name={uniswapV3LP.name}
                logoName={uniswapV3LP.logoName}
              />
            </Grid>
            <Grid item xs={2} textAlign="end">
              <AssetNumber>
                6.8
              </AssetNumber>{" "}
              <Typography noWrap component="span">
                %
              </Typography>
            </Grid>
            <Grid item xs={3} textAlign="end">
              <div>
                <AssetNumber>
                  {getBalance(uniswapV3LP, minus12)}
                </AssetNumber>{" "}
                <Typography noWrap component="span">
                  {uniswapV3LP.symbol}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={2} textAlign="end">
              <Button
                variant="outlined"
                size="small"
                // disabled={false || !allBalances[uniswapV3LP.address]}
                onClick={() => supplyOnClick(uniswapV3LP)}
                sx={supplyButtonStyle}
                style={{ width: '85px' }}
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
