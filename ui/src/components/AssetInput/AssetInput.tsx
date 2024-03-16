import * as React from "react";
import { Box, styled } from "@mui/material";
import { AssetProp } from "@/config";

const AssetTicker = styled("div")({
  display: "flex",
  alignItems: "center",
});

const InputNumber = styled("input")`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  &[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

export interface AssetInputProps {
  num: number | null;
  onChange: (num: number | null) => void;
  asset: AssetProp;
}
export function AssetInput({ num, onChange, asset }: AssetInputProps) {
  const handleOnChange = (event) => {
    const value = event.target.value.replace(/\+|-/gi, "");
    onChange(value);
  };
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
        type="number"
        value={num}
        onChange={handleOnChange}
        style={{
          width: "100%",
          height: "40px",
          border: "0px",
          textAlign: "center",
          fontSize: "2rem",
        }}
        autoFocus
      />
      {/* <AssetBanner name={asset.symbol} logoName={asset.logoName} /> */}
    </Box>
  );
}
