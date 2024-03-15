import { Box, Modal } from "@mui/material";
import { SupplyForm } from "./SupplyForm";
import { useAppSelector } from "@/store";
import { walletSlice } from "@/redux/wallet";

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
}

export function SupplyModal({
  isOpen,
  handleClose,
  contractAddress,
}: SupplyModalProps) {
  // Get the ERC20 balance of the connected wallet
  const balanceOfAddress = useAppSelector((state) =>
    walletSlice.selectors.getReadableBalance(state, contractAddress)
  );

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <SupplyForm availableAmount={balanceOfAddress} />
      </Box>
    </Modal>
  );
}
