import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { RiMoneyCnyBoxFill } from "react-icons/ri";
import CardInfo from "../../components/admin/CardInfo";
import {
  getMostCategoryBorrowed,
  getMostLoansFundings,
  getTotalCounts,
} from "../../service/admin/adminService";
import { useDispatch, useSelector } from "react-redux";
import { FormatMataUang } from "../../utils/FormatMataUang";

const HomeAdmin = () => {
  const [load, setLoad] = useState(true);
  const { accessToken } = useSelector((state) => state.auth);
  const [totalCounts, setTotalCounts] = useState(false);
  const [loansFunding, setLoansFunding] = useState(false);
  const [mostCategoryBorrowed, setMostCategoryBorrowed] = useState(false);

  const dispatch = useDispatch();

  const handleGetTotalCounts = async () => {
    setTotalCounts(await getTotalCounts({ accessToken }));
  };

  const handleGetFundingsLoans = async () => {
    setLoansFunding(await getMostLoansFundings({ accessToken }));
  };

  const handleGetMostCategory = async () => {
    setMostCategoryBorrowed(await getMostCategoryBorrowed({ accessToken }));
  };

  useEffect(() => {
    if (load) {
      handleGetTotalCounts();
      handleGetFundingsLoans();
      handleGetMostCategory();
      setLoad(false);
    }
  }, [totalCounts, mostCategoryBorrowed, loansFunding]);

  return (
    <>
      <div className="gap-8 max-w-7xl mx-auto">
        <span className="text-2xl flex gap-2 items-center font-semibold text-gray-700">
          <MdDashboard size={32} />
          ADMIN DASHBOARD
        </span>
        <CardInfo totalCounts={totalCounts} />
        <div className="grid grid-cols-3 mt-8 gap-8 ">
          <div className="col-span-2">
            <div className="bg-white rounded-md">
              <div className="p-4 rounded-t-md">
                <span className="font-semibold text-lg text-rose-800 flex gap-2 items-center ">
                  <span className="text-3xl">
                    <RiMoneyCnyBoxFill />{" "}
                  </span>
                  Lender Terbanyak Pendanaan
                </span>
              </div>
              <hr />
              <div className="overflow-x-auto p-4">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                        Nama Lengkap
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                        Email
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                        Total Pendanaan
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {loansFunding
                      ? loansFunding.lender.map((item) => {
                          return (
                            <tr>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {item.name}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {item.email}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                <span className="font-bold px-2 py-1 bg-rose-100 text-rose-800 rounded-lg">
                                  {FormatMataUang(item.totalAmount)}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      : "loading..."}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white rounded-md  mt-6">
              <div className="p-4 rounded-t-md">
                <span className="font-semibold text-lg text-indigo-800 flex gap-2 items-center ">
                  <span className="text-3xl">
                    <RiMoneyCnyBoxFill />{" "}
                  </span>
                  Borrower Terbanyak Pinjam
                </span>
              </div>
              <hr />
              <div className="overflow-x-auto p-4">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                        Nama Lengkap
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                        Email
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                        Total Dana Pinjaman
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {loansFunding
                      ? loansFunding.lender.map((item) => {
                          return (
                            <tr>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {item.name}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {item.email}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                <span className="font-bold px-2 py-1 bg-rose-100 text-rose-800 rounded-lg">
                                  {FormatMataUang(item.totalAmount)}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      : "loading..."}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white rounded-md p-4">
              <span className="font-semibold text-lg text-gray-700">
                Kategori Pinjaman Terbanyak
              </span>
              <hr className="mt-4 border-indigo-100" />
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  {/* <thead className="ltr:text-left rtl:text-right">
                                        <tr>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                Categori
                                            </th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                Total
                                            </th>
                                        </tr>
                                    </thead> */}

                  <tbody className="divide-y divide-gray-200 ">
                    {mostCategoryBorrowed
                      ? mostCategoryBorrowed.map((item, index) => {
                          return (
                            <tr>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                                <span className="font-bold text-gray-700">
                                  {" "}
                                  #{index + 1}{" "}
                                </span>
                                <span
                                  className="px-2 py-1 bg-pink-100 rounded-lg text-pink-800
                                                "
                                >
                                  {item.borrowingCategory}
                                </span>
                              </td>
                              <td className="whitespace-nowrap text-end px-4 py-2">
                                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-xl font-medium">
                                  {item.total}x
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      : "loading..."}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
