import { Box, Modal } from "@mui/material";
import { SupplyForm } from "./SupplyForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { walletSlice } from "@/redux/wallet";
import { borrowLending } from "@/redux/borrowlending";
import { useEffect } from "react";

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


  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <SupplyForm
          availableAmount={balanceOfAddress}
          onSupply={onSupply}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </Box>
    </Modal>
  );
}
