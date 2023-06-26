import React, { useState } from "react";
import Logo from "../../../assets/img/logo/LogoAmana2.svg";
import { ButtonIcon, CustomLink } from "../../molekul";
// Import Icon
import {
  HiChartPie,
  HiOutlinePlus,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import { BiLogOut, BiHome, BiUser, BiMoneyWithdraw } from "react-icons/bi";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// End Icon

const Sidebar = () => {
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    navigate("/login");
    window.localStorage.removeItem("persist:root");
    dispatch({ type: "DESTROY_SESSION" });
  };

  return (
    <div className="flex h-screen sticky top-[0px]">
      <aside className="w-64 ">
        <div className="flex items-center h-16 border-b p-2 pl-4">
          <div className="">
            <Link to={"/beranda"} className="flex items-center">
              <img
                src={Logo}
                alt="Logo amanah"
                className="bg-[#002E5D] p-2  w-11 h-11 rounded-xl"
              />
              <span className="text-2xl pl-2">Amanah</span>
            </Link>
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
              <CustomLink to="/" icon={<BiHome className="text-xl" />}>
                Dashboard
              </CustomLink>
            </li>
            <li>
              <CustomLink
                to="portofolio"
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

            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Transaksi
                </div>
              </div>
            </li>
            <li>
              <CustomLink
                to="deposit"
                icon={<HiOutlinePlus className="text-xl" />}
              >
                Deposit
              </CustomLink>
            </li>
            <li>
              <CustomLink
                to="withdraw/listBank"
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
              <CustomLink to="profile" icon={<BiUser className="text-xl" />}>
                Profile
              </CustomLink>
            </li>

            <li>
              <div className="bg-red-500 hover:bg-red-700">
                <ButtonIcon
                  type={"button"}
                  className={
                    "rounded-none flex items-center text-white w-full "
                  }
                  onClick={logout}
                >
                  <BiLogOut className="text-xl" />
                  Logout
                </ButtonIcon>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      {/* <div className="h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
        <div className="flex flex-col w-64 bg-white h-full border-r">
          <div className="flex items-center h-16 border-b p-2 pl-4">
            <div className="">
              <Link to={"/beranda"} className="flex items-center">
                <img
                  src={Logo}
                  alt="Logo amanah"
                  className="bg-[#002E5D] p-2  w-11 h-11 rounded-xl"
                />
                <span className="text-2xl pl-2">Amanah</span>
              </Link>
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
                <CustomLink to="/" icon={<BiHome className="text-xl" />}>
                  Dashboard
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  to="portofolio"
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

              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Transaksi
                  </div>
                </div>
              </li>
              <li>
                <CustomLink
                  to="deposit"
                  icon={<HiOutlinePlus className="text-xl" />}
                >
                  Deposit
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  to="withdraw"
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
                <CustomLink to="profile" icon={<BiUser className="text-xl" />}>
                  Profile
                </CustomLink>
              </li>

              <li>
                <div className="bg-red-500 hover:bg-red-700">
                  <ButtonIcon
                    type={"button"}
                    className={
                      "rounded-none flex items-center text-white w-full "
                    }
                    onClick={logout}
                  >
                    <BiLogOut className="text-xl" />
                    Logout
                  </ButtonIcon>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
