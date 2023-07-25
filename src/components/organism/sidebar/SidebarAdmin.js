import React, { useState } from "react";
import Logo from "../../../assets/img/logo/LogoAmana2.svg";
import { ButtonIcon, CustomLink } from "../../molekul";
// Import Icon
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiLogOut, BiHome } from "react-icons/bi";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdHistory, MdVerified } from "react-icons/md";
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
              <CustomLink to="/admin" icon={<BiHome className="text-xl" />}>
                Beranda
              </CustomLink>
            </li>
            <li>
              <CustomLink to="kyc" icon={<MdVerified className="text-xl" />}>
                Verifikasi E-KYC
              </CustomLink>
            </li>
            <li>
              <CustomLink
                to="users"
                icon={<HiOutlineUserGroup className="text-xl" />}
              >
                Users
              </CustomLink>
            </li>
            <li>
              <CustomLink to="loan" icon={<MdHistory className="text-xl" />}>
                Pinjaman
              </CustomLink>
            </li>
            <li>
              <CustomLink to="funding" icon={<MdHistory className="text-xl" />}>
                Pendanaan
              </CustomLink>
            </li>
            <li>
              <CustomLink
                to="auto-lend"
                icon={<MdHistory className="text-xl" />}
              >
                Auto Lend
              </CustomLink>
            </li>

            <li>
              <div className=" bg-red-50  hover:bg-red-100 hover:text-red-50">
                <ButtonIcon
                  type={"button"}
                  className={
                    "rounded-none flex items-center text-red-700 font-medium  w-full "
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
    </div>
  );
};

export default Sidebar;
