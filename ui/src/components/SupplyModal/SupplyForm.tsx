import React from "react";
import { Alert, Stack } from "@mui/material";
import { AssetInput } from "../AssetInput/AssetInput";
import LoadingButton from "@mui/lab/LoadingButton";
import { supplyButtonStyle } from "../SupplyMarket/styles";
import { AssetProp } from "@/config";

export interface SupplyFormProps {
  isLoading: boolean;
  errorMessage: string;
  availableAmount: string;
  onSupply: (amount: number) => void;
  asset: AssetProp;
}
export function SupplyForm({
  isLoading,
  errorMessage,
  availableAmount,
  asset,
  onSupply,
}: SupplyFormProps) {
  const [value, setValue] = React.useState<number | null>(null);

  return (
    <Stack>
      <AssetInput num={value} onChange={setValue} asset={asset} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <p>Supplyable amount</p>
        <p>{availableAmount}</p>
      </Stack>
      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: "10px" }}>
          {errorMessage}
        </Alert>
      )}
      <LoadingButton
        variant="outlined"
        loading={isLoading}
        sx={supplyButtonStyle}
        onClick={() => {
          onSupply && onSupply(value);
        }}
      >
        SUPPLY
      </LoadingButton>
    </Stack>
  );
}
