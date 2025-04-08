import { Spinner } from "flowbite-react";
import LayoutWrapper from "./LayoutWrapper";
import "../index.css";

const Loader = ({ xxl, style }: { xxl: boolean, style? : {} }) => {
  return (
    <>
      {xxl ? (
        <LayoutWrapper>
          <Spinner
            className="spinner-style"
            id="spinner-style"
            color={"success"}
            size={"xl"}
            aria-label="Default status example"
          />
        </LayoutWrapper>
      ) : (
        <Spinner
          color={"success"}
          style={style && style}
          size={"xl"}
          aria-label="Default status example"
        />
      )}
    </>
  );
};

export default Loader;
