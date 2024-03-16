import React from 'react';
import { Typography } from '@mui/material';
import { Icon } from '../SvgIcon';

export interface AssetBannerProps {
  assetTicket: string;
  name: string;
  logoName: string;
}
export function AssetBanner({ name, logoName }: AssetBannerProps) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Icon name={logoName} style={{ maxWidth: "32px", marginRight: "8px" }} />
      
      <Typography noWrap component="span">{name}</Typography>
    </div>
  );
}
