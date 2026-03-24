import { useState, useEffect, useCallback, cloneElement, createContext, useContext, ReactNode, ReactElement } from "react";
import { X, Sprout, AlertTriangle, Info, Scissors } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getVariantConfig = (variant: string) => {
  switch (variant) {
    case "success":
      return { bg: "bg-[#bcedd7]", iconColor: "text-[#0b3d2e]", Icon: Sprout };
    case "warning":
      return { bg: "bg-[#e6e5b9]", iconColor: "text-[#414121]", Icon: Scissors };
    case "destructive":
      return { bg: "bg-[#ffdad9]", iconColor: "text-[#7b5455]", Icon: AlertTriangle };
    case "info":
    case "default":
    default:
      return { bg: "bg-[#eae8e4]", iconColor: "text-[#00261b]", Icon: Info };
  }
};

interface ToastProps {
  id?: string;
  title?: string;
  description?: ReactNode;
  variant?: "default" | "success" | "destructive" | "warning" | "info";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  duration?: number;
  onClose?: () => void;
  action?: ReactNode;
}

const Toast = ({
  id,
  title,
  description,
  variant = "default",
  duration = 3000,
  onClose,
  action
}: ToastProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const wrappedAction = action ? cloneElement(action as ReactElement, {
    onClick: (e: any) => {
      e.stopPropagation();
      const originalOnClick = (action as ReactElement).props.onClick;
      if (originalOnClick) originalOnClick(e);
      handleClose();
    }
  }) : null;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHovering && duration > 0) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [duration, isHovering, handleClose]);

  const { bg, iconColor, Icon } = getVariantConfig(variant);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.8, x: 50, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      drag="x"
      dragConstraints={{ left: 0, right: 300 }}
      dragElastic={0.2}
      onDragEnd={(e, info) => {
        if (info.offset.x > 80 || info.velocity.x > 500) {
          handleClose();
        }
      }}
      role="alert"
      aria-live="polite"
      className="pointer-events-auto w-full max-w-[420px] bg-white/70 backdrop-blur-xl border border-white/50 p-5 rounded-[2rem] shadow-[0_20px_40px_rgba(0,38,27,0.06)] flex items-start gap-4 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${bg} ${iconColor}`}>
        <Icon className="w-5 h-5 fill-current" strokeWidth={2} />
      </div>

      <div className="flex-1 pt-0.5">
        {title && <h3 className="font-newsreader font-bold text-xl text-[#00261b] leading-tight">{title}</h3>}
        {description && <div className="font-manrope text-[#414944] text-[14px] mt-1 leading-relaxed">{description}</div>}
        {wrappedAction && <div className="mt-3 flex gap-4 items-center">{wrappedAction}</div>}
      </div>

      <button
        onClick={handleClose}
        className="text-[#c0c8c3] hover:text-[#00261b] transition-colors p-1 -mr-1 -mt-1"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

interface ToastContextType {
  toast: (props: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((current) => [...current, { ...props, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed z-[150] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 pointer-events-none flex flex-col gap-4 items-center sm:items-end">
        <AnimatePresence mode="popLayout">
          {toasts.map((toastProps) => (
            <Toast
              key={toastProps.id}
              {...toastProps}
              onClose={() => removeToast(toastProps.id!)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default Toast;
