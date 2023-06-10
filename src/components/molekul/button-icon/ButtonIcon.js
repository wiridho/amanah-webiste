import React from "react";
import { Button } from "../../atom";

const ButtonIcon = ({ icon, children, className }) => {
  return (
    <Button className={`flex gap-4 items-center ${className}`}>
      <span className="text-2xl">{icon}</span> {children}
    </Button>
  );
};

export default ButtonIcon;
