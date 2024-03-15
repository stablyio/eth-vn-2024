import * as React from "react";
import { Box } from "@mui/material";
import InputNumber from "react-input-number";

export function AssetInput() {
  const [num, setNum] = React.useState<number | null>(null);
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
        onChange={setNum}
      />
    </Box>
  );
}
