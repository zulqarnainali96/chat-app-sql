import React from "react";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(180deg,#373B65_21%,#4E5172_44%,#777A9A_74%)]">
      {children}
    </div>
  );
};

export default LayoutWrapper;
