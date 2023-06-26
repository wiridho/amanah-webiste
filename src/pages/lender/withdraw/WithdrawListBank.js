import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { RiAddLine, RiHome6Fill } from "react-icons/ri";
import { Button } from "../../../components/atom";

const Withdraw = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center font-nunito-sans">
      <div className="max-w-sm w-full rounded-md overflow-hidden shadow bg-white">
        <div className="p-5">
          <div className="text-lg mb-1 text-center font-semibold">
            Tambah Akun Bank
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between  border px-3 py-2 rounded-md text-sm">
              <span className="text-gray-500 ">Pilih akun</span>
              <div className="flex items-center text-blue-500 hover:text-blue-700 ">
                <RiAddLine />
                <Link to={"/funder/withdraw/tambah/bank"} className=" ">
                  Tambah akun
                </Link>
              </div>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 rounded-md">
                <thead className="text-xs text-gray-700 bg-white border-b">
                  <tr className="">
                    <th scope="col" className="py-3 ">
                      Nomor Rekening
                    </th>
                    <th scope="col" className=" py-3">
                      Bank
                    </th>
                    <th scope="col" className="py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <div className="m-2"></div>
                <tbody>
                  <tr className="bg-white odd:bg-slate-50">
                    <td
                      scope="row"
                      className="py-2 font-medium whitespace-nowrap"
                    >
                      1218293231
                    </td>
                    <td className="py-2">BRI</td>
                    <td className="py-2">
                      <RiHome6Fill />
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="bg-white ">
                    <td
                      scope="row"
                      className="py-2 font-medium whitespace-nowrap"
                    >
                      1218293019
                    </td>
                    <td className="py-2">BCA</td>
                    <td className="py-2">
                      <RiHome6Fill />
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="bg-white odd:bg-slate-50 ">
                    <td
                      scope="row"
                      className="py-2 font-medium whitespace-nowrap"
                    >
                      2432123112
                    </td>
                    <td className="py-2">Mandiri</td>
                    <td className="py-2">
                      <RiHome6Fill />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button className="bg-indigo-500 hover:bg-indigo-700 text-white w-full px-4 py-2 rounded font-semibold">
              Lanjut
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
