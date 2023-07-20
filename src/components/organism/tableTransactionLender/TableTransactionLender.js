import React, { useState } from "react";
import moment from "moment";
import { FormatMataUang } from "../../../utils/FormatMataUang";
import Button from "../../atom/button/Button";

const TableTransactionLender = ({ list, onSelect, onClick, params }) => {
  return (
    <div className="">
      <div className="mb-4">
        <div className="flex justify-between gap-5">
          <div className="flex flex-col justify-start">
            <span className="text-2xl font-semibold">Riwayat Transaksi</span>
            <span>
              Tabel riwayat transaksi yang mencatat semua aktivitas transaksi
              terkini
            </span>
          </div>
          <div className="flex items-center gap-5">
            <div>
              <select
                value={params?.status}
                onChange={onSelect}
                name="status"
                id="status"
                className="px-4 py-2 pr-7 rounded-lg border border-gray-200  text-sm focus:ring-1  focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={""}>Pilih Status Transaksi</option>
                <option value={"done"}>Done</option>
                <option value={"pending"}>Pending</option>
              </select>
            </div>
            <div>
              <select
                value={params?.type}
                onChange={onSelect}
                name="type"
                id="type"
                className=" px-4 py-2 pr-7 rounded-lg border border-gray-200  text-sm focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={""}>Pilih Jenis Transaksi</option>
                <option value={"Deposit"}>Deposit</option>
                <option value={"Withdraw"}>Withdraw</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-h-[460px] !overflow-y-auto ">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Jumlah</th>
              <th className="px-6 py-3">Status Transaksi</th>
              <th className="px-6 py-3">Jenis Transaksi</th>
            </tr>
          </thead>
          <tbody>
            {list !== null &&
              list.map((item, index) => {
                return (
                  <tr
                    className="bg-white border-b hover:bg-gray-50 "
                    key={index}
                  >
                    <td className="px-5 py-2.5 font-medium text-gray-900 whitespace-nowrap ">
                      {index + 1}
                    </td>
                    <td className="px-5 py-2.5 font-medium text-gray-900 whitespace-nowrap ">
                      {moment(item?.createdDate).format("DD MMM YYYY")}
                    </td>
                    <td className="px-5 py-2.5 font-medium text-gray-900 whitespace-nowrap ">
                      {FormatMataUang(item?.amount)}
                    </td>
                    <td className="px-5 py-2.5 font-medium text-gray-900 whitespace-nowrap ">
                      {item?.status}
                    </td>
                    <td className="px-5 py-2.5 font-medium text-gray-900 whitespace-nowrap ">
                      {item?.type}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Button
        type={"button"}
        className={`px-4 py-2 my-2  bg-blue-500 text-white `}
        onClick={onClick}
      >
        Lihat lebih
      </Button>
    </div>
  );
};

export default TableTransactionLender;
