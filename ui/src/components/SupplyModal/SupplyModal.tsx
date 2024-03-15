import { Box, Modal } from "@mui/material";
import { SupplyForm } from "./SupplyForm";

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
}

export function SupplyModal({ isOpen, handleClose }: SupplyModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <SupplyForm />
      </Box>
    </Modal>
  );
}
