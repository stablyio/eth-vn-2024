import React from "react";
import { Alert, Stack } from "@mui/material";
import { AssetInput } from "../AssetInput/AssetInput";
import LoadingButton from "@mui/lab/LoadingButton";

export interface SupplyFormProps {
  isLoading: boolean;
  errorMessage: string;
  availableAmount: string;
  onSupply: (amount: number) => void;
}
export function SupplyForm({
  isLoading,
  errorMessage,
  availableAmount,
  onSupply,
}: SupplyFormProps) {
  const [value, setValue] = React.useState<number | null>(null);

  return (
    <Stack>
      <AssetInput num={value} onChange={setValue} symbol="USDC" />
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
        variant="contained"
        color="primary"
        loading={isLoading}
        onClick={() => {
          onSupply && onSupply(value);
        }}
      >
        SUPPLY
      </LoadingButton>
    </Stack>
  );
}
