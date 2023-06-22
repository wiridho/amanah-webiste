import React from "react";
import { Link } from "react-router-dom";
import { BsBank } from "react-icons/bs";

const Deposit = () => {
  return (
    <div className="flex justify-center items-center  h-screen">
      <div class="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-md shadow ">
        <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 text-center">
          Mobile Banking
        </h5>
        <div class=" font-normal">
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-4 hover:bg-slate-100 px-4 py-2 rounded-md">
              <BsBank size={25} />
              <Link to={"intruksi"}>BCA</Link>
            </li>
            <li className="flex items-center gap-4 hover:bg-slate-100 px-4 py-2 rounded-md">
              <BsBank size={25} />
              <Link to={"intruksi"}>BRI</Link>
            </li>
            <li className="flex items-center gap-4 hover:bg-slate-100 px-4 py-2 rounded-md">
              <BsBank size={25} />
              <Link to={"intruksi"}>Mandiri</Link>
            </li>
            <li className="flex items-center gap-4 hover:bg-slate-100 px-4 py-2 rounded-md">
              <BsBank size={25} />
              <Link to={"intruksi"}> Permata Bank</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
