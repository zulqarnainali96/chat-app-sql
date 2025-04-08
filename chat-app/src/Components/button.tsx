
type ButtonProps = {
  text: string;
  style? : {},
  onClick? : () => void
  position? : "left" | "right" | "center",
  icon? : JSX.Element,
};

const Button = (props: ButtonProps) => {
  const { text, onClick, position, icon, } = props;

  const center = "w-60 rounded-full focus:shadow-xl border-none text-md text-white"
  const left = "mt-4 h-14 w-60 space-x-1 rounded-r-full text-md text-white  focus:shadow-xl focus:border-2"
  const right = "mt-4 h-14 w-36 space-x-1 focus:shadow-xl focus:border-2 rounded-l-full text-md text-white flex justify-center items-center"

  return (
    <button
      className={`mt-4 h-14 space-x-1 buttonGradient font-bold ${position === "center" ? center : position === "left" ? left : position === "right" ? right : "" }`} 
      type="button"
      aria-hidden={position==="left" && "true"}
      onClick={onClick}
    >
      {icon ?? text}
    </button>
  );
};
export default Button;

// position === "center" ? "" : position === "" : position === "right" ? "" : ""