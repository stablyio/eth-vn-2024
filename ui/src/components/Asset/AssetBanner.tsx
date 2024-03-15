import React from 'react';
// import Icon from "cryptocurrency-icons";
// import Icon from "react-crypto-icons";

export interface AssetBannerProps {
  assetTicket: string;
}
export function AssetBanner({ assetTicket }: AssetBannerProps) {
  return (
    <span>
      {/* <Icon name={assetTicket} size={25} /> */}
      
      {assetTicket}
    </span>
  );
}
