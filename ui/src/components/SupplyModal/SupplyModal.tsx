import { Box, Modal, Stack, Tab, Tabs } from "@mui/material";
import { SupplyForm } from "./SupplyForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { walletSlice } from "@/redux/wallet";
import { borrowLending } from "@/redux/borrowlending";
import { useState } from "react";
import { CustomTabPanel } from "../Tab/TabGroup";
import { UniswapV3LP } from "@/config";
import { AssetBanner } from "../Asset";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "black",
  padding: "0px",
};

export interface SupplyModalProps {
  isOpen: boolean;
  handleClose: () => void;
  uniswapV3LP: UniswapV3LP;
  handleSupply: (uniswapV3LP: UniswapV3LP, amount: number) => void;
}

export function SupplyModal({
  isOpen,
  handleClose,
  uniswapV3LP,
  handleSupply,
}: SupplyModalProps) {
  const [tabValue, setTabValue] = useState(0);

  const dispatch = useAppDispatch();
  // Get the ERC20 balance of the connected wallet
  const balanceOfAddress = useAppSelector((state) =>
    walletSlice.selectors.getReadableBalance(state, uniswapV3LP?.address)
  );
  const isLoading = useAppSelector((state) =>
    borrowLending.selectors.getLoading(state)
  );
  const errorMessage = useAppSelector((state) =>
    borrowLending.selectors.getErrorMessage(state)
  );

  const onSupply = (amount: number) => {
    handleSupply && handleSupply(uniswapV3LP, amount);
  };

  const changeTabValue = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  console.log('balanceOfAddress', balanceOfAddress)

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack alignItems="center" sx={{ margin: "12px" }}>
          {uniswapV3LP && (
            <AssetBanner
              name={uniswapV3LP.name}
              logoName={uniswapV3LP.logoName}
            />
          )}
        </Stack>
        <Tabs
          value={tabValue}
          onChange={changeTabValue}
          aria-label="basic tabs example"
        >
          <Tab value={0} label="Supply" />
          <Tab value={1} label="Withdraw" />
        </Tabs>
        <CustomTabPanel value={tabValue} index={0}>
          <SupplyForm
            availableAmount={balanceOfAddress}
            onSupply={onSupply}
            isLoading={isLoading}
            errorMessage={errorMessage}
            asset={uniswapV3LP}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          Withdraw
        </CustomTabPanel>
      </Box>
    </Modal>
  );
}
