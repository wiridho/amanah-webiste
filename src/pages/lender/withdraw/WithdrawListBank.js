import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { RiAddLine } from "react-icons/ri";
import { Button } from "../../../components/atom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBalanceAccountBank } from "../../../service/balance/balance";
import { setBankSelected } from "../../../store/reducer/Balance/BalanceTransactionReducer";
import _ from "lodash";

const Withdraw = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [listBank, setListBank] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let diasbleButton = _.every(listBank, { isChecked: false });

  const getListBank = async () => {
    const response = await getBalanceAccountBank({ accessToken });
    setListBank(response);
  };

  useEffect(() => {
    (async () => {
      await getListBank();
    })();
  }, []);

  const chooseBank = (item) => {
    let list = listBank.map((data) => {
      return {
        ...data,
        ...{ isChecked: data._id === item._id ? true : false },
      };
    });
    setListBank(list);
  };

  const nextToWithdraw = () => {
    let data = _.find(listBank, { isChecked: true });
    dispatch(setBankSelected(data));
    navigate("/funder/withdraw");
  };

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
              <table className="w-full text-sm text-left rounded-md">
                <thead className="text-xs text-gray-700 bg-white border-b">
                  <tr className="">
                    <th scope="col" className="py-3 ">
                      Nomor Rekening
                    </th>
                    <th scope="col" className=" py-3">
                      Bank
                    </th>
                  </tr>
                </thead>
                <div className="m-2"></div>
                <tbody>
                  {listBank &&
                    listBank.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`${
                            item.isChecked ? "bg-blue-400 text-white" : ""
                          }bg-white`}
                          onClick={() => chooseBank(item)}
                        >
                          <td
                            scope="row"
                            className="py-2 font-medium whitespace-nowrap"
                          >
                            {item.accountNumber}
                          </td>
                          <td className="py-2">{item.bankName}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <Button
              disabled={diasbleButton}
              onClick={() => nextToWithdraw()}
              className={`w-full px-4 py-2 rounded font-semibold ${
                diasbleButton
                  ? "bg-gray-500 text-gray-900 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-700 text-white"
              }`}
            >
              Lanjut
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
