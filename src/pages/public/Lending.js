import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/atom";

const Lending = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <span className="text-3xl font-bold text-center">Lending Page</span>
      <div className="flex gap-2 mt-2">
        <Button className={"bg-indigo-500 text-white"}>
          <Link to={"/login"}>Login</Link>
        </Button>
        <Button className={"bg-indigo-500 text-white "}>
          <Link to={"/register-init"}>Register</Link>
        </Button>
      </div>
    </div>
  );
};

export default Lending;
