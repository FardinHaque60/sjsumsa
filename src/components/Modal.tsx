interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

// Modal component
const Modal: React.FC<ModalProps> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        {children}
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
    </div>
  );
};
 
export default Modal;