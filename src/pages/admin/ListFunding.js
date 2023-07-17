import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { HiOutlineSearch } from "react-icons/hi";
import { useSelector } from "react-redux";
import { getAllFunding } from "../../service/admin/adminService";
import { useEffect } from "react";

const ListFunding = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { accessToken } = useSelector((state) => state.auth);

  const columns = [
    {
      name: "#",
      selector: (_, index) => index + 1,
      width: "5%",
    },
    {
      name: "User Id",
      selector: (row) => row?.userId,
      sortable: true,
      width: "15%",
    },
    {
      name: "Lender Id",
      selector: (row) => row?.lenderId,
      sortable: true,
      width: "20%",
    },
    {
      name: "Loan Id",
      selector: (row) => row?.loanId,
      sortable: true,
      width: "15%",
    },
    {
      name: "Funding Id",
      selector: (row) => row?.fundingId,
      width: "15%",
    },
    {
      name: "Pendanaan",
      selector: (row) => row?.amount,
      sortable: true,
      width: "10%",
    },
    {
      name: "Imbal hasil",
      selector: (row) => row?.yield,
      width: "15%",
    },
  ];

  const getFunding = async () => {
    const response = await getAllFunding({ accessToken });
    setData(response);
  };

  useEffect(() => {
    (async () => {
      await getFunding();
    })();
  }, []);

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const filteredData = data.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="flex flex-col gap-3 font-nunito-sans">
      <h1 className="text-xl font-semibold">List Pendanaan</h1>
      {/* <div className="relative  w-1/4 flex items-center">
        <input
          type="text"
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm  focus:outline-none focus:ring-1 focus:border-indigo-500"
          placeholder="Cari berdasarkan nama..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <HiOutlineSearch className="absolute right-3 z-10" />
      </div> */}
      <div>
        <DataTable columns={columns} data={data} fixedHeader pagination />
      </div>
    </div>
  );
};

export default ListFunding;
