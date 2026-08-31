import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div role="dialog" aria-modal="true">
      <div>
        <button type="button" onClick={onClose}>
          X
        </button>

        {title && <h2>{title}</h2>}

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
