import { Box, Modal, Tab, Tabs } from "@mui/material";
import { SupplyForm } from "./SupplyForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { walletSlice } from "@/redux/wallet";
import { borrowLending } from "@/redux/borrowlending";
import { useState } from "react";
import { CustomTabPanel } from "../Tab/TabGroup";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface SupplyModalProps {
  isOpen: boolean;
  handleClose: () => void;
  contractAddress: string;
  handleSupply: (contractAddress: string, amount: number) => void;
}

export function SupplyModal({
  isOpen,
  handleClose,
  contractAddress,
  handleSupply,
}: SupplyModalProps) {
  const [tabValue, setTabValue] = useState(0);

  const dispatch = useAppDispatch();
  // Get the ERC20 balance of the connected wallet
  const balanceOfAddress = useAppSelector((state) =>
    walletSlice.selectors.getReadableBalance(state, contractAddress)
  );
  const isLoading = useAppSelector((state) =>
    borrowLending.selectors.getLoading(state)
  );
  const errorMessage = useAppSelector((state) =>
    borrowLending.selectors.getErrorMessage(state)
  );

  const onSupply = (amount: number) => {
    handleSupply && handleSupply(contractAddress, amount);
  };

  const changeTabValue = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          Withdraw
        </CustomTabPanel>
      </Box>
    </Modal>
  );
}
