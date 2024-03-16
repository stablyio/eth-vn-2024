import React from "react";
import { Alert, Stack } from "@mui/material";
import { AssetInput } from "../AssetInput/AssetInput";
import LoadingButton from "@mui/lab/LoadingButton";
import { supplyButtonStyle } from "../SupplyMarket/styles";
import { AssetProp } from "@/config";

export interface RedeemFormProps {
  isLoading: boolean;
  errorMessage: string;
  availableAmount: string;
  onRedeem: (amount: number) => void;
  asset: AssetProp;
}
export function RedeemForm({
  isLoading,
  errorMessage,
  availableAmount,
  asset,
  onRedeem,
}: RedeemFormProps) {
  const [value, setValue] = React.useState<number | null>(null);

  return (
    <Stack>
      <AssetInput num={value} onChange={setValue} asset={asset} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: "1rem" }}
      >
        <span>Withdrawable amount</span>
        <span>{availableAmount ?? "0"}</span>
      </Stack>
      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: "10px" }}>
          {errorMessage}
        </Alert>
      )}
      <LoadingButton
        variant="contained"
        loading={isLoading}
        // sx={supplyButtonStyle}
        onClick={() => {
          onRedeem && onRedeem(value);
        }}
        style={{
          marginTop: "1rem",
        }}
      >
        WITHDRAW
      </LoadingButton>
    </Stack>
  );
}
