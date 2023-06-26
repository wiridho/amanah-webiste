import React from "react";
import { Outlet } from "react-router-dom";
import SidebarBorrower from "../organism/sidebar/SidebarBorrower";

const DashboardBorrower = () => {
  return (
    <div className="flex ">
      <SidebarBorrower />
      <div className="grow p-10 bg-[#f2f5f8]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardBorrower;
