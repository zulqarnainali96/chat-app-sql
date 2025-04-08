import { createContext, ReactNode, useContext, useState } from "react";
import SuccessToaster from "../Components/SuccessToast";

type ToasterProps = {
  showToaster: (message: string, type: "success" | "error") => void;
  hideToaster: () => void;
};
export const ToasterContext = createContext<ToasterProps | null>(null);

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
};

const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"success" | "error" | "">("");

  const showToaster = (msg: string, type: "success" | "error") => {
    setShow(true);
    setMessage(msg);
    setType(type);
  };

  const hideToaster = () => {
    setShow(false);
    setMessage("");
  };

  return (
    <ToasterContext.Provider value={{ showToaster, hideToaster }}>
      {children}
      {show && (
        <SuccessToaster message={message} onClick={hideToaster} type={type} />
      )}
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;
