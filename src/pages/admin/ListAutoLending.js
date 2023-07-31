import React, { useEffect, useState } from "react";
import { getAllAutoLend } from "../../service/admin/adminService";
import { useSelector } from "react-redux";
import { HiOutlineSearch } from "react-icons/hi";
import DataTable from "react-data-table-component";
import _ from "lodash";
import { FormatMataUang } from "../../utils/FormatMataUang";

const ListAutoLending = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { accessToken } = useSelector((state) => state.auth);

  const getAutoLend = async () => {
    const response = await getAllAutoLend({ accessToken });
    setData(response);
  };

  useEffect(() => {
    (async () => {
      await getAutoLend();
    })();
  }, []);

  const columns = [
    {
      name: "#",
      selector: (_, index) => index + 1,
      width: "5%",
    },
    {
      name: "Name",
      selector: (row) => row?.user?.name,
      sortable: true,
      width: "15%",
    },
    {
      name: "Email",
      selector: (row) => row?.user?.email,
      sortable: true,
      width: "20%",
    },
    {
      name: "Kategori Pinjaman",
      selector: (row) => row?.borrowingCategory.join(","),
      sortable: true,
      width: "15%",
    },
    {
      name: "Nominal Pendanaan",
      selector: (row) => FormatMataUang(row?.amountToLend),
      sortable: true,
      width: "15%",
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      width: "10%",
    },
    {
      name: "Periode Tenor",
      selector: (row) =>
        `${row?.tenorLength?.start} - ${row?.tenorLength?.end} Bulan`,
      width: "15%",
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item?.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3 font-nunito-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">List User Auto Lend</h1>
        <div className="relative  w-1/4 flex items-center">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm  focus:outline-none focus:ring-1 focus:border-indigo-500"
            placeholder="Cari berdasarkan nama..."
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
  );
};

export default ListAutoLending;
