// src/components/ui/Toast.tsx

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

export const Toast = ({
  message,
  onClose,
  duration = 4000
}: ToastProps) => {

  useEffect(() => {

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);

  }, [duration, onClose]);

  return (
    <div className="min-w-[320px] max-w-100 rounded-md bg-red-500 px-4 py-3 text-white shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm">{message}</p>

        <button
          type="button"
          onClick={onClose}
          className="text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};