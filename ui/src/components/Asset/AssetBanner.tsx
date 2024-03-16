import { Typography } from '@mui/material';
import React from 'react';
// import Icon from "cryptocurrency-icons";
// import Icon from "react-crypto-icons";

export interface AssetBannerProps {
  assetTicket: string;
  name: string;
}
export function AssetBanner({ assetTicket, name }: AssetBannerProps) {
  return (
    <span>
      {/* <Icon name={assetTicket} size={25} /> */}
      
      <Typography noWrap>{name}</Typography>
    </span>
  );
}
