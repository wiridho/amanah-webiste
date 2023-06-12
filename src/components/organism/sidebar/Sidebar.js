import React from "react";
import Logo from "../../../assets/img/logo/LogoAmana2.svg";
// Import Icon
import {
  HiChartPie,
  HiOutlinePlus,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import { BiLogOut, BiHome, BiUser, BiMoneyWithdraw } from "react-icons/bi";
import { TbBellRinging } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

import { CustomLink } from "../../molekul";
// End Icon

const Sidebar = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
        <div className="flex flex-col w-64 bg-white h-full border-r">
          <div className="flex items-center h-16 border-b p-2 pl-4">
            <div className="flex items-center">
              <img
                src={Logo}
                alt="Logo amanah"
                className="bg-[#002E5D] p-2  w-11 h-11 rounded-xl"
              />
              <span className="text-2xl pl-2">Amanah</span>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Menu
                  </div>
                </div>
              </li>
              <li>
                <CustomLink to="beranda" icon={<BiHome className="text-xl" />}>
                  Dashboard
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  to="beranda"
                  icon={<HiChartPie className="text-xl" />}
                >
                  Portofolio
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  to="pendanaan"
                  icon={<HiOutlineCurrencyDollar className="text-xl" />}
                >
                  Pendanaan
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  to="beranda"
                  icon={<TbBellRinging className="text-xl" />}
                >
                  Notifikasi
                </CustomLink>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Transaksi
                  </div>
                </div>
              </li>
              <li>
                <CustomLink
                  to="beranda"
                  icon={<HiOutlinePlus className="text-xl" />}
                >
                  Deposit
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  to="beranda"
                  icon={<BiMoneyWithdraw className="text-xl" />}
                >
                  Withdraw
                </CustomLink>
              </li>

              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Pengaturan
                  </div>
                </div>
              </li>
              <li>
                <CustomLink to="beranda" icon={<BiUser className="text-xl" />}>
                  Profile
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  to="beranda"
                  icon={<IoSettingsOutline className="text-xl" />}
                >
                  Settings
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  to="beranda"
                  icon={<BiLogOut className="text-xl" />}
                >
                  Logout
                </CustomLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        classname="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span>
          <GiHamburger />
        </span>
        <span classname="sr-only">Open sidebar</span>
      </button> */}
    </div>
  );
};

export default Sidebar;
