import React from "react";
import { SideBar } from "../organism";
import { Outlet } from "react-router-dom";

const DashboardLender = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="grow p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLender;
