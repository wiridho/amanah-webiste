import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../organism/sidebar/SidebarAdmin';

const DashboardAdmin = () => {
    return (
        <div className="flex ">
            <SidebarAdmin />
            <div className="grow p-10 bg-[#f2f5f8]">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardAdmin;
