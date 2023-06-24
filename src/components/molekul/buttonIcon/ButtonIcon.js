import React from "react";
import { Button } from "../../atom";

const ButtonIcon = ({ icon, children, className, type, onClick }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`${className} flex items-center gap-4`}
    >
      {icon}
      {children}
    </Button>
  );
};

export default ButtonIcon;
