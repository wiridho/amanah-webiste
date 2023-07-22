import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getAllUsers } from "../../service/admin/adminService";
import { useSelector } from "react-redux";
import { HiOutlineSearch } from "react-icons/hi";

const ListUser = () => {
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
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
      width: "15%",
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
      width: "20%",
    },
    {
      name: "Phone Number",
      selector: (row) => row?.phoneNumber,
      sortable: true,
      width: "15%",
    },
    {
      name: "Gender",
      selector: (row) => row?.gender,
      sortable: true,
      width: "10%",
    },
    {
      name: "ID Card Number",
      selector: (row) => row?.idCardNumber,
      width: "15%",
    },
    {
      name: "ID Card Image",
      selector: (row) => (
        <a href={row?.idCardImage} target="_blank">
          Link KTP
        </a>
      ),
      width: "10%",
    },
    {
      name: "Face Image",
      selector: (row) => (
        <a href={row?.faceImage} target="_blank">
          Link Face Image
        </a>
      ),
      width: "10%",
    },
  ];

  const getUser = async () => {
    const response = await getAllUsers({ accessToken });
    setData(response);
  };

  useEffect(() => {
    (async () => {
      await getUser();
    })();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3 font-nunito-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">List data user</h1>
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

export default ListUser;
