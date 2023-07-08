import React from "react";
import { useSelector } from "react-redux";

const RiwayatPinjamanBerjalan = () => {
  const { loanHistory } = useSelector((state) => state.borrower);

  // const activeLoan = loanHistory?.active

  const activeLoan = {
    active: {
      loanId: "640410c5465ed9af9ccb8912",
      date: "2021-01-01",
      totalFunding: 1000000,
      amount: 1000000,
      yieldReturn: 50000,
      tenor: 5,
      paymentSchema: "Pelunasan Cicilan",
      borrowingCategory: "Pendidikan",
      loanPurpose: "Bayar kuliah",
      contract: "https://www.google.com.pdf",
    },
    history: [
      {
        loanId: "640410c5465ed9af9ccb8912",
        date: "2021-01-01",
        amount: 1000000,
        yieldReturn: 1000000,
        tenor: 4,
        borrowingCategory: "Pendidikan",
      },
    ],
  };

  return (
    <div>
      <div className="relative max-h-[460px] !overflow-y-auto shadow sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Jumlah Pinjaman</th>
              <th className="px-6 py-3">Status Transaksi</th>
              <th className="px-6 py-3">Jenis Transaksi</th>
            </tr>
          </thead>
          {/* <tbody>
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
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default RiwayatPinjamanBerjalan;
