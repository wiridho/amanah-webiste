import React from "react";
import { Link } from "react-router-dom";
import ButtonIcon from "../../molekul/button-icon/ButtonIcon";
import Logo from "../../../assets/img/logo/LogoAmana2.svg";
// Icon
import {
  HiChartPie,
  HiOutlinePlus,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import { BiLogOut, BiHome, BiUser, BiMoneyWithdraw } from "react-icons/bi";
import { TbBellRinging } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { Badge } from "../../atom";
import CustomLink from "../../molekul/custom-link/CustomLink";
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
                <Link
                  to="beranda"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <ButtonIcon
                    icon={<BiHome className="text-xl" />}
                    className="text-sm tracking-wide truncate"
                  >
                    Dashboard
                  </ButtonIcon>
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <ButtonIcon
                    icon={<HiChartPie className="text-xl" />}
                    className="text-sm tracking-wide truncate"
                  >
                    Portofolio
                  </ButtonIcon>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <ButtonIcon
                    icon={<HiOutlineCurrencyDollar className="text-xl" />}
                    className="text-sm tracking-wide truncate"
                  >
                    Pendanaan
                  </ButtonIcon>
                  <Badge className={"text-indigo-500 bg-indigo-50"}>New</Badge>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <ButtonIcon
                    icon={<TbBellRinging className="text-lg" />}
                    className="text-sm tracking-wide truncate"
                  >
                    Notifikasi
                  </ButtonIcon>
                  <Badge className={"text-green-500 bg-green-50"}>15</Badge>
                </Link>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Transaksi
                  </div>
                </div>
              </li>
              <li>
                <Link
                  to="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <ButtonIcon
                    className="text-sm tracking-wide truncate"
                    icon={<HiOutlinePlus className="text-lg" />}
                  >
                    Deposit
                  </ButtonIcon>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <ButtonIcon
                    className="text-sm tracking-wide truncate"
                    icon={<BiMoneyWithdraw className="text-lg" />}
                  >
                    Withdraw
                  </ButtonIcon>
                </Link>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Pengaturan
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <ButtonIcon
                    className="text-sm tracking-wide truncate"
                    icon={<BiUser className="text-lg " />}
                  >
                    Profile
                  </ButtonIcon>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  {" "}
                  <ButtonIcon
                    className="text-sm tracking-wide truncate"
                    icon={<IoSettingsOutline className="text-lg" />}
                  >
                    Settings
                  </ButtonIcon>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <ButtonIcon
                    className="text-sm tracking-wide truncate"
                    icon={<BiLogOut className="text-lg" />}
                  >
                    Logout
                  </ButtonIcon>
                </Link>
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
      {/* <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full px-3 py-4 bg-[#fafafa]">
          <div className="overflow-y-auto">
            <Link to="#">
              <div className="flex items-center pl-2.5">
                <div className=" px-2 py-2 rounded-md inline-block bg-[#002E5D]">
                  <img src={Logo} className="w-10" alt="Logo Amanah" />
                </div>
                <span className=" self-center pl-[2px] text-3xl font-normal whitespace-nowrap">
                  manah
                </span>
              </div>
            </Link>
            <div className="mt-10">
              <ul className="space-y-4 text-base">
                <li>
                  <Link
                    to="#"
                    className="flex items-center rounded font-medium hover:bg-gray-200 text-[#002E5D] text-lg "
                  >
                    <ButtonIcon icon={<HiHome className="text-[#5BC0EB]" />}>
                      Dashboard
                    </ButtonIcon>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center  rounded-lg hover:bg-gray-200 text-lg font-medium text-[#002E5D]"
                  >
                    <ButtonIcon
                      icon={<HiChartPie className="text-lightBlue" />}
                    >
                      Portofolio
                    </ButtonIcon>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center  rounded-lg hover:bg-gray-200 text-lg font-medium text-[#002E5D] "
                  >
                    <ButtonIcon
                      icon={<HiCurrencyDollar className="text-lightBlue" />}
                    >
                      Pendanaan
                    </ButtonIcon>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center rounded-lg hover:bg-gray-200 text-lg font-medium text-[#002E5D]"
                  >
                    <ButtonIcon
                      icon={<HiInformationCircle className="text-lightBlue" />}
                    >
                      Bantuan
                    </ButtonIcon>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <ButtonIcon
              className={" hover:bg-gray-200 w-full text-[#002E5D] font-medium"}
              icon={<BiLogOut className="text-primary" />}
            >
              Logout
            </ButtonIcon>
          </div>
        </div>
      </aside> */}
    </div>
  );
};

export default Sidebar;
