import React, { useEffect, useState } from "react";
import Logo from "../../../assets/img/logo/LogoAmana2.svg";
import { ButtonIcon, CustomLink } from "../../molekul";
// Import Icon
import {
  HiChartPie,
  HiOutlinePlus,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import { BiLogOut, BiHome, BiUser, BiMoneyWithdraw } from "react-icons/bi";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdHistory } from "react-icons/md";
import Swal from "sweetalert2";
import { setMessage } from "../../../store/reducer/AuthReducer";
import { lenderActions } from "../../../store/reducer/Lender/LenderFundingReducer";
// End Icon

const Sidebar = () => {
  const { statusKYC } = useSelector((state) => state.auth);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    Swal.fire({
      title: "Logout",
      icon: "warning",
      text: "Apakah anda ingin keluar?",
      // showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: "Tidak",
      confirmButtonText: "Ya, Keluar",
      // denyButtonText: `Tidak`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Logout Berhasil", "", "success").then(() => {
          navigate("/login");
          window.localStorage.removeItem("persist:root");
          dispatch({ type: "DESTROY_SESSION" });
        });
      }
    });
  };

  const location = useLocation();
  useEffect(() => {
    dispatch(setMessage(null));
    dispatch(lenderActions.setMessage(null));
  }, [location.pathname]);

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
              <CustomLink to="/funder" icon={<BiHome className="text-xl" />}>
                Beranda
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

            {statusKYC === "verified" && (
              <>
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
                <li>
                  <CustomLink
                    to="riwayat-transaksi"
                    icon={<MdHistory className="text-xl" />}
                  >
                    Riwayat Transaksi
                  </CustomLink>
                </li>
              </>
            )}

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
              <div className="bg-red-50  hover:bg-red-100 hover:text-red-50">
                <ButtonIcon
                  type={"button"}
                  className={
                    "rounded-none flex items-center text-red-700 w-full "
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
