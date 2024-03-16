import * as React from "react";
import { Box, styled } from "@mui/material";
import InputNumber from "react-input-number";
import { AssetBanner } from "../Asset/AssetBanner";
import { AssetProp } from "@/config";

const AssetTicker = styled("div")({
  display: "flex",
  alignItems: "center",
});
export interface AssetInputProps {
  num: number | null;
  onChange: (num: number | null) => void;
  asset: AssetProp;
}
export function AssetInput({ num, onChange, asset }: AssetInputProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        width: "100%",
        height: "40px",
      }}
    >
      <InputNumber
        min={0.01}
        max={1000}
        step={0.01}
        value={num}
        onChange={onChange}
        style={{
          width: "100%",
          height: "40px",
          border: "0px",
          textAlign: "center",
          fontSize: "2rem",
        }}
      />
      <AssetBanner name={asset.symbol} logoName={asset.logoName} />
    </Box>
  );
}
