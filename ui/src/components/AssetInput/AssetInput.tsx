import * as React from "react";
import { Box } from "@mui/material";
import InputNumber from "react-input-number";

export interface AssetInputProps {
  num: number | null;
  onChange: (num: number | null) => void;
}
export function AssetInput({num, onChange}: AssetInputProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <InputNumber
        min={0.01}
        max={1000}
        step={0.01}
        value={num}
        onChange={onChange}
      />
    </Box>
  );
}
