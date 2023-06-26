import React from "react";
import { SideBar } from "../organism";
import { Outlet } from "react-router-dom";

const DashboardLender = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="grow p-10 bg-[#f2f5f8]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLender;
