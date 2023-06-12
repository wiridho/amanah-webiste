import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { Button } from "../../components/atom";

const Pendanaan = () => {
  return (
    <div>
      <div className="flex items-center justify-between bg-red-500">
        <div className="bg-red-500">
          <h1 className="text-2xl">Pendanaan</h1>
          <span>Total 5 Aktif, 5 Penuh, 100 Berhasil</span>
        </div>
        <div className="bg-red-500">
          <form className="flex items-center ">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <HiOutlineSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Search"
                required
              />
            </div>
            <Button
              type="submit"
              className="px-4 py-3 ml-2 text-sm font-medium text-white bg-indigo-500 rounded-lg border  hover:bg-indigo-600 focus:ring-2 focus:outline-none focus:ring-indigo-300"
            >
              <HiOutlineSearch className="w-4 h-4 " />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pendanaan;
