import { Box, Modal } from "@mui/material";
import { BorrowForm } from "./BorrowForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { borrowLending } from "@/redux/borrowlending";

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

export interface BorrowModalProps {
  isOpen: boolean;
  handleClose: () => void;
  contractAddress: string;
  handleBorrow: (contractAddress: string, amount: number) => void;
}

export function BorrowModal({
  isOpen,
  handleClose,
  contractAddress,
  handleBorrow,
}: BorrowModalProps) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) =>
    borrowLending.selectors.getLoading(state)
  );
  const errorMessage = useAppSelector((state) =>
    borrowLending.selectors.getErrorMessage(state)
  );

  const onBorrow = (amount: number) => {
    handleBorrow && handleBorrow(contractAddress, amount);
  };


  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <BorrowForm
          availableAmount={''}
          symbol="USDC"
          onBorrow={onBorrow}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </Box>
    </Modal>
  );
}
