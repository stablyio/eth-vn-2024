import { Button, Grid } from "@mui/material";
import { AssetBanner } from "../Asset";
import { UniswapV3LP } from "@/config";

export interface UniswapV3LPListProps {
  uniswapV3LPList: UniswapV3LP[];
  lpOnClick: () => void;
}
export function UniswapV3LPList({
  uniswapV3LPList,
  lpOnClick,
}: UniswapV3LPListProps) {
  return (
    <div>
      {uniswapV3LPList.map((uniswapV3LP) => {
        return (
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={3}>
              <AssetBanner assetTicket={uniswapV3LP.symbol} />
            </Grid>
            <Grid item xs={6}>
              -
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
