import React, { useState } from "react";
import FeatureOne from "../../assets/img/landing/feature-1.png";
import FeatureTwo from "../../assets/img/landing/feature-2.png";
import Hero from "../../assets/img/landing/hero.png";

import LogoAmana from "../../assets/img/logo/LogoAmana2.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileLender } from "../../service/lender/profile";
import { getProfileBorrower } from "../../service/Borrower/profile";
import Swal from "sweetalert2";

const Lending = () => {
  const { is_auth, roles, accessToken } = useSelector((state) => state.auth);
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileLender = useSelector((state) => state.lender?.profile?.name);
  const profileBorrower = useSelector((state) => state.borrower?.profile?.name);

  useEffect(() => {
    if (roles === "lender") {
      dispatch(getProfileLender({ accessToken }));
    } else if (roles === "borrower") {
      dispatch(getProfileBorrower({ accessToken }));
    }
  }, []);

  const logout = () => {
    Swal.fire({
      icon: "warning",
      title: "Logout",
      text: "Apakah anda ingin keluar?",
      showCancelButton: true,
      cancelButtonText: "Tidak",
      confirmButtonText: "Ya, Keluar",
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

  return (
    <div className="font-nunito-sans">
      <header className="fixed w-full">
        <nav className="bg-white border-gray-200 py-2.5 ">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <a href="#" className="flex items-center">
              <img
                src={LogoAmana}
                className="h-10 mr-3 sm:h-9 !bg-darkBlue !p-3 !text-darkBlue"
                alt="Landwind Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap ">
                Amanah
              </span>
            </a>

            {/* Dropdown */}

            <div className="flex items-center lg:order-2">
              {is_auth && (
                <div className="relative">
                  <div
                    className="inline-flex items-center overflow-hidden rounded-md border bg-white"
                    onClick={() => setDropDown(!dropDown)}
                  >
                    <span className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                      {roles === "lender"
                        ? profileLender
                        : roles === "borrower"
                        ? profileBorrower
                        : "Admin"}
                    </span>
                    <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                      <span className="sr-only">Menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {dropDown && (
                    <div
                      className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                      role="menu"
                    >
                      <div className="p-2">
                        <Link
                          to={roles === "lender" ? "/funder" : "/borrower"}
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          role="menuitem"
                        >
                          Dashboard
                        </Link>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={logout}
                          type="submit"
                          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!is_auth && (
                <div className="flex items-center">
                  <div className="mt-2 mr-4 sm:inline-block">
                    <Link className="" to="register-init">
                      Register
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="login"
                      className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 "
                    >
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div
              className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#home"
                    className="block py-2 pl-3 pr-4  bg-blue-700 rounded lg:bg-transparent text-blue-700 lg:p-0"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#platform"
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  lg:p-0"
                  >
                    Platform
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0 "
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 "
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {/* Start block */}
      <section className="bg-white" id="home">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl ">
              Wujudkan Pribadi Finansial Islami bersama Amanah P2P Syariah
              {/* products &amp; brands. */}
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
              Pinjaman Dana Syariah tanpa Riba, Mudah, Aman, dan Tanpa Jaminan
              dengan Sistem Pendanaan P2P Syariah. Lender dan Borrower dapat
              bertransaksi dengan aman dan nyaman.{" "}
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              {roles ? (
                <Link
                  to={roles === "lender" ? "/funder" : "/borrower"}
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-bold text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
                >
                  Dashboard Saya
                </Link>
              ) : (
                <a
                  href="register-init"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-bold text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
                >
                  Daftar Akun Sekarang
                </a>
              )}
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={Hero} alt="hero image" />
          </div>
        </div>
      </section>
      {/* End block */}
      {/* Start block */}
      <section className="bg-white ">
        <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
          <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 sm:grid-cols-3 lg:grid-cols-6 "></div>
        </div>
      </section>
      {/* End block */}
      {/* Start block */}
      <section className="bg-gray-50 dark:bg-gray-800" id="platform">
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
          {/* Row */}
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <div className="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Bekerja dengan baik pada website
              </h2>
              <p className="mb-8 font-light lg:text-xl">
                Amanah P2P Lending Syariah menawarkan solusi berbasis website
                untuk memudahkan anda dalam bertransaksi. Dengan menggunakan
                website, anda dapat mengakses Amanah P2P Lending Syariah
                dimanapun dan kapanpun.
              </p>
              {/* List */}
              <ul className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                <li className="flex space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Lakukan peminjaman dengan mudah dimanapun dan kapanpun
                  </span>
                </li>
                <li className="flex space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Melakukan pendanaan pada berbagai macam produk yang tersedia
                  </span>
                </li>
                <li className="flex space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Melakukan credit score dengan teknologi AI
                  </span>
                </li>
              </ul>
              {/* <p className="mb-8 font-light lg:text-xl">
                                Deliver great service experiences fast - without
                                the complexity of traditional ITSM solutions.
                            </p> */}
            </div>
            <img
              className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
              src={FeatureOne}
              alt="dashboard"
            />
          </div>
          {/* Row */}
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <div className="flex justify-center">
              <img
                className="hidden  w-[50%] mb-4 rounded-lg lg:mb-0 lg:flex"
                src={FeatureTwo}
                alt="img"
              />
            </div>
            <div className="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Bekerja dengan baik pada aplikasi android
              </h2>
              <p className="mb-8 font-light lg:text-xl">
                Aplikasi Amanah sudah support pada android untuk memudahkan anda
                dalam bertransaksi. Dengan menggunakan aplikasi, anda dapat
                mengakses Amanah P2P Lending Syariah dimanapun dan kapanpun.
              </p>
              {/* List */}
              <ul className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                <li className="flex space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Lakukan peminjaman dengan mudah dimanapun dan kapanpun
                  </span>
                </li>
                <li className="flex space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Melakukan pendanaan pada berbagai macam produk yang tersedia
                  </span>
                </li>
                <li className="flex space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Melakukan credit score dengan teknologi AI
                  </span>
                </li>
              </ul>
              {/* <p className="font-light lg:text-xl">
                                Deliver great service experiences fast - without
                                the complexity of traditional ITSM solutions.
                            </p> */}
            </div>
          </div>
        </div>
      </section>
      {/* End block */}
      {/* Start block */}
      <section className="bg-white dark:bg-gray-900" id="features">
        <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
          <div className="col-span-2 mb-8">
            <p className="text-lg font-medium text-purple-600 dark:text-purple-500">
              Lending Syariah
            </p>
            <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
              Di support oleh teknologi Artificial Intelligence Credit Scoring
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Amanah P2P Lending Syariah menggunakan teknologi AI untuk
              menentukan credit score pinjaman anda
            </p>
            <div className="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                AI Credit Score
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Penentuan credit score menggunakan teknologi AI
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Peminjaman
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Proses peminjaman yang mudah dan cepat
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Auto Lending
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Tidak perlu khawatir kebahabisan pinjaman
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Pendanaan
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Proses pendanaan yang mudah dan cepat
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End block */}
      {/* Start block */}
      <section className="bg-gray-50 dark:bg-gray-800" id="faq">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
                "Advantages of helping people include you being a good example
                for your children, family, and friends, and you having a direct
                impact on the trajectory of the lives of a lot of people."
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img
                className="w-6 h-6 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-gray-900 dark:text-white">
                  Rafael Bettencourt
                </div>
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  Decoding Happiness
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      {/* End block */}

      {/* Start block */}
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 pt-8 pb-8 mx-auto lg:pb-24 lg:px-6 ">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            <details
              className="group [&_summary::-webkit-details-marker]:hidden"
              open
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                <h2 className="font-medium">
                  Apa itu Amanah P2P Lending Syariah?
                </h2>
                <svg
                  className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 px-4 leading-relaxed text-white">
                Amanah P2P Lending Syariah adalah platform yang mempertemukan
                antara peminjam dan pendana dengan menggunakan teknologi AI
                Credit Scoring.
              </p>
            </details>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                <h2 className="font-medium">Apa itu Lender?</h2>
                <svg
                  className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 px-4 leading-relaxed text-white">
                Dalam P2P Lending, Lender merupakan pihak yang memberikan
                pinjaman kepada peminjam. Lender akan mendapatkan keuntungan
                dari keuntungan pinjaman yang diberikan kepada peminjam.
              </p>
            </details>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                <h2 className="font-medium">Apa itu Borrower?</h2>
                <svg
                  className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 px-4 leading-relaxed text-white">
                Dalam P2P Lending, Borrower merupakan pihak yang meminjam uang
                kepada Lender. Borrower akan membayar kembali pinjaman beserta
                keuntungan yang telah diberikan.
              </p>
            </details>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                <h2 className="font-medium">Apa itu fitur Autolend?</h2>
                <svg
                  className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 px-4 leading-relaxed text-white">
                Dalam aplikasi Amanah P2P Lending Syariah, Fitur Autolend
                merupakan fitur yang dapat digunakan oleh Lender untuk melakukan
                pendanaan secara otomatis. Dengan menggunakan fitur ini, Lender
                tidak perlu melakukan pendanaan secara manual.
              </p>
            </details>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                <h2 className="font-medium">
                  Akad apa yang digunakan dalam Amanah P2P Lending Syariah?
                </h2>
                <svg
                  className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 px-4 leading-relaxed text-white">
                Akad yang digunakan oleh Amanah P2P Lending Syariah yaitu akad
                Jual Beli. Akad Jual Beli merupakan akad yang digunakan dalam
                transaksi jual beli barang atau jasa. Dalam akad ini, pihak yang
                menjual barang atau jasa disebut sebagai penjual (muqridh) dan
                pihak yang membeli barang atau jasa disebut sebagai pembeli
                (musta’min).
              </p>
            </details>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                <h2 className="font-medium">
                  Platform apa saja yang dapat digunakan untuk mengakses Amanah
                  P2P Lending Syariah?
                </h2>
                <svg
                  className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 px-4 leading-relaxed text-white">
                Amanah P2P Lending Syariah dapat diakses melalui website dan
                aplikasi android.
              </p>
            </details>
          </div>
        </div>
      </section>
      {/* End block */}

      <footer className="bg-gray-100">
        <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
            <a
              className="inline-block rounded-full bg-darkBlue   p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4"
              href="#home"
            >
              <span className="sr-only">Back to top</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <img
                  className="p-2  w-11 h-11  bg-darkBlue rounded-full flex justify-center items-end"
                  src={LogoAmana}
                  alt="Rounded avatar"
                />
                <span className="text-darkBlue text-2xl font-nunito-sans font-semibold">
                  Amanah
                </span>
              </div>

              <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
                Amanah P2P Lending Syariah adalah platform yang mempertemukan
                antara peminjam dan pendana dengan menggunakan teknologi AI
                Credit Scoring.
              </p>
            </div>
          </div>
          <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
            Copyright &copy; 2023. All rights reserved.
          </p>
        </div>
      </footer>
      {/* <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script> */}
    </div>
  );
};

export default Lending;
