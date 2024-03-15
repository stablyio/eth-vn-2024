import React from "react";
import { Button, Stack } from "@mui/material";
import { AssetInput } from "../AssetInput/AssetInput";

export interface SupplyFormProps {
  availableAmount: string;
}
export function SupplyForm({ availableAmount }: SupplyFormProps) {
  const [value, setValue] = React.useState<number | null>(null);

  return (
    <Stack>
      <AssetInput />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <p>Supplyable amount</p>
        <p>{availableAmount}</p>
      </Stack>
      <Button color="primary">SUPPLY</Button>
    </Stack>
  );
}
