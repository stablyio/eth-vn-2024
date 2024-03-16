import React from "react";
import { Alert, Stack } from "@mui/material";
import { AssetInput } from "../AssetInput/AssetInput";
import LoadingButton from "@mui/lab/LoadingButton";

export interface BorrowFormProps {
  isLoading: boolean;
  errorMessage: string;
  availableAmount: string;
  onBorrow: (amount: number) => void;
}
export function BorrowForm({
  isLoading,
  errorMessage,
  availableAmount,
  onBorrow,
}: BorrowFormProps) {
  const [value, setValue] = React.useState<number | null>(null);

  return (
    <Stack>
      <AssetInput num={value} onChange={setValue} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <p>Available amount</p>
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
          onBorrow && onBorrow(value);
        }}
      >
        BORROW
      </LoadingButton>
    </Stack>
  );
}
