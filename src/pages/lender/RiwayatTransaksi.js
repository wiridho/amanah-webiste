import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBalanceTransactionDeposit,
  getBalanceTransactionHistory,
  getBalanceTransactionWithdraw,
} from "../../service/balance/balance";
import TableTransactionLender from "../../components/organism/tableTransactionLender/TableTransactionLender";

const RiwayatTransaksi = () => {
  const [params, setParams] = useState({ type: "", status: "" });
  const { accessToken } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.balance_transaction);

  const dispatch = useDispatch();

  const onSelect = (e) => {
    let value = {
      ...params,
      ...{ [e.target.name]: e.target.value },
    };
    setParams(value);
    getTransaction(value);
  };

  const getTransaction = (params) => {
    dispatch(getBalanceTransactionHistory({ accessToken, params }));
  };

  useEffect(() => {
    getTransaction(params);
  }, []);

  return (
    <div className="font-nunito-sans bg-white p-4 rounded-md">
      <div className="mb-4">
        <span className="text-xl font-semibold">Riwayat Transaksi</span>
      </div>
      <div>
        <TableTransactionLender list={data} onSelect={onSelect} />
      </div>
    </div>
  );
};

export default RiwayatTransaksi;
