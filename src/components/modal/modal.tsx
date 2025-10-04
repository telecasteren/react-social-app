import React, { useCallback, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, handleClose]);

  return (
    <>
      {isOpen && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          onClick={handleOutsideClick}
        >
          <div className="modal-content">
            <span className="close-modal" onClick={handleClose}>
              &times;
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;

// Use like:
// const [modalOpen, setModalOpen] = useState(false);
// <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
//   <div>modal content here</div>
// </Modal>
