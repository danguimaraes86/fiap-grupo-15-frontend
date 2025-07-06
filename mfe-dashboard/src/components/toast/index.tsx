import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  duration?: number; // opcional: tempo de exibição em ms
  show?: boolean;
};

export function ToastMessage({ message, type, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  if (!visible) return null;

  const bgColor = type === "success" ? "bg-success" : "bg-danger";

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <div className={`toast show text-white ${bgColor}`}>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}
