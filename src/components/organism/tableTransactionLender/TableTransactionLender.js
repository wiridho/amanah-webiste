import React, { useState } from "react";
import moment from "moment";
import { FormatMataUang } from "../../../utils/FormatMataUang";

const TableTransactionLender = ({ list, onSelect }) => {
  return (
    <div>
      <div>
        <div className="flex gap-5">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-900"
            >
              Status Transaksi
            </label>
            <select
              onClick={onSelect}
              name="status"
              id="status"
              className="mt-1.5border-gray-300 text-gray-700 sm:text-sm"
            >
              <option value={""}>Please Select</option>
              <option value={"done"}>Done</option>
              <option value={"pending"}>Pending</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-900"
            >
              Tipe Transaksi
            </label>

            <select
              onClick={onSelect}
              name="type"
              id="type"
              className="mt-1.5border-gray-300 text-gray-700 sm:text-sm"
            >
              <option value={""}>Please Select</option>
              <option value={"Deposit"}>Deposit</option>
              <option value={"Withdraw"}>Withdraw</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <table className="w-full">
          <thead className="text-left">
            <tr>
              <th>Tanggal</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {list !== null &&
              list.map((item, index) => {
                return (
                  <tr key={index}>
                    <td> {moment(item?.createdDate).format("DD MMM YYYY")}</td>
                    <td>{FormatMataUang(item?.amount)}</td>
                    <td>{item?.status}</td>
                    <td>{item?.type}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTransactionLender;
