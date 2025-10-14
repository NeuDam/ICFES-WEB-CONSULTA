import { HiX, HiExclamationCircle, HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { useEffect } from "react";

const Toast = ({ type = "info", message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <HiCheckCircle className="toast-icon" />,
    error: <HiExclamationCircle className="toast-icon" />,
    warning: <HiExclamationCircle className="toast-icon" />,
    info: <HiInformationCircle className="toast-icon" />
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        {icons[type]}
        <p className="toast-message">{message}</p>
      </div>
      <button onClick={onClose} className="toast-close">
        <HiX />
      </button>
    </div>
  );
};

export default Toast;
