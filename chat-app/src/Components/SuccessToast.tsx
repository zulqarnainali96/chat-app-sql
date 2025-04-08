import { Toast } from "flowbite-react";
import { useEffect } from "react";
import { HiCheck } from "react-icons/hi";
import { HiX } from "react-icons/hi";

export default function SuccessToaster({
  message,
  onClick,
  type,
}: {
  message: string;
  onClick: () => void;
  type: "error" | "success" | "";
}) {
  useEffect(() => {
    const time = setTimeout(() => {
      onClick();
    }, 20000);

    return () => clearInterval(time);
  }, [onClick]);

  return (
    <>
      {type === "success" && (
        <div className="absolute bottom-10 right-10 z-10 flex flex-col gap-3 transition-all duration-500 w-[400px]">
          <Toast onClick={onClick} className="gap-12 h-[100px] max-w-96">
            <div className="text-green-500 dark:text-green-200 inline-flex h-12 w-24 shrink-0 items-center justify-center rounded-lg bg-green-500 dark:bg-green-800">
              <HiCheck className="h-6 w-6" />
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
      {type === "error" && (
        <div className="absolute bottom-10 right-10 z-10 flex flex-col gap-3 transition-all duration-500 w-[400px]">
          <Toast onClick={onClick} className="gap-12 h-[100px] max-w-96">
            <div className="text-red-500 dark:text-red-200 inline-flex h-12 w-24 shrink-0 items-center justify-center rounded-lg bg-red-500 dark:bg-red-800">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
    </>
  );
}
