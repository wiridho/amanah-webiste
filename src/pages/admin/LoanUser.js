import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllLoan } from "../../service/admin/adminService";
import { HiOutlineSearch } from "react-icons/hi";
import DataTable from "react-data-table-component";
import { FormatMataUang } from "../../utils/FormatMataUang";

const LoanUser = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { accessToken } = useSelector((state) => state.auth);

  const getLoan = async () => {
    const response = await getAllLoan({ accessToken });
    setData(response);
  };

  const columns = [
    {
      name: "#",
      selector: (_, index) => index + 1,
      width: "5%",
    },
    {
      name: "Nominal Pinjaman",
      selector: (row) => FormatMataUang(row?.amount),
      sortable: true,
      width: "15%",
    },
    {
      name: "Tenor",
      selector: (row) => `${row?.tenor} Bulan`,
      sortable: true,
      width: "10%",
    },
    {
      name: "Kategori Pinjaman",
      selector: (row) => row?.borrowingCategory,
      sortable: true,
      width: "15%",
    },
    {
      name: "Imbal Hasil",
      selector: (row) => FormatMataUang(row?.yieldReturn),
      sortable: true,
      width: "10%",
    },
    {
      name: "Skema Pembayaran",
      selector: (row) => row?.paymentSchema,
      width: "15%",
    },
    {
      name: "Total Funding",
      selector: (row) => FormatMataUang(row?.totalFunding),
      width: "10%",
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      width: "10%",
    },
  ];

  useEffect(() => {
    (async () => {
      await getLoan();
    })();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.amount.toString().includes(searchTerm.toString())
  );
  return (
    <div>
      <div className="flex flex-col gap-3 font-nunito-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">List data pinjaman</h1>
          <div className="relative w-1/4 flex items-center">
            <input
              type="number"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm  focus:outline-none focus:ring-1 focus:border-indigo-500"
              placeholder="Cari berdasarkan nominal pinjaman..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <HiOutlineSearch className="absolute right-3 z-10" />
          </div>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={filteredData}
            fixedHeader
            pagination
          />
        </div>
      </div>
    </div>
  );
};

export default LoanUser;
