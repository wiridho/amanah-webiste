import React, { useEffect } from "react";
import apiConfig from "../../../api/apiConfig";
import { BsFillPersonFill } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";
import { Button } from "../../atom";
import ButtonIcon from "../../molekul/button-icon/ButtonIcon";
import axios from "axios";
import Data from "./Data.json";
import { useSelector } from "react-redux";

const CardList = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const getAvailableLoan = async () => {
    try {
      const response = await axios.get(`${apiConfig.baseUrl}/loans/available`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAvailableLoan();
  }, [accessToken]);

  return (
    <div>
      {/* <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <img
          alt="Office"
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          className="h-56 w-full object-cover"
        />

        <div className="bg-white p-4 sm:p-6">
          <time datetime="2022-10-10" className="block text-xs text-gray-500">
            10th Oct 2022
          </time>

          <a href="#">
            <h3 className="mt-0.5 text-lg text-gray-900">
              How to position your furniture for positivity
            </h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            dolores, possimus pariatur animi temporibus nesciunt praesentium
            dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque
            minus soluta, voluptates neque explicabo tempora nisi culpa eius
            atque dignissimos. Molestias explicabo corporis voluptatem?
          </p>
        </div>
      </article> */}
      <div className="space-y-4">
        <details
          className="group [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
            <h2 className="font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing?
            </h2>

            <svg
              className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 leading-relaxed text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
            veritatis molestias culpa in, recusandae laboriosam neque aliquid
            libero nesciunt voluptate dicta quo officiis explicabo consequuntur
            distinctio corporis earum similique!
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
            <h2 className="font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing?
            </h2>

            <svg
              className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 leading-relaxed text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
            veritatis molestias culpa in, recusandae laboriosam neque aliquid
            libero nesciunt voluptate dicta quo officiis explicabo consequuntur
            distinctio corporis earum similique!
          </p>
        </details>
      </div>
    </div>
    // <div className="grid grid-cols-3 gap-3">
    //   {Data.map((item, index) => {
    //     let progress = (item.totalFunding / item.amount) * 100;
    //     return (
    //       <div
    //         key={index}
    //         className="w-full flex-col bg-white border border-gray-200 rounded-lg shadow-lg p-4"
    //       >
    //         <div className="flex">
    //           <BsFillPersonFill className="text-lg" />
    //           <p className="text-lg">{item.name}</p>
    //         </div>
    //         <div className="flex justify-between">
    //           <div className="">
    //             <p className="text-sm">Terisi</p>
    //             <p className="text-lg">Rp{item.totalFunding}</p>
    //           </div>
    //           <div className="">
    //             <p className="text-sm">Total Pinjaman</p>
    //             <p className="text-lg">Rp{item.amount}</p>
    //           </div>
    //         </div>
    //         <div className="w-full bg-neutral-200 ">
    //           <div
    //             className={`bg-green-500 p-0.5 text-center text-xs font-medium text-white leading-none`}
    //             style={{ width: `${progress}%` }}
    //           >
    //             {progress}%
    //           </div>
    //         </div>
    //         <div className="flex justify-between">
    //           <div className="">
    //             <p className="text-sm">Tenor</p>
    //             <p className="text-lg">{item.tenor} bulan</p>
    //           </div>
    //           <div className="">
    //             <p className="text-sm">Kategori</p>
    //             <p className="text-lg">{item.borrowingCategory}</p>
    //           </div>
    //         </div>
    //         <div className="flex justify-between">
    //           <div className="">
    //             <p className="text-sm">Imbal Hasil</p>
    //             <p className="text-lg">Rp{item.yieldReturn}</p>
    //           </div>
    //         </div>
    //         <div className="w-full bg-green-500">
    //           <ButtonIcon className={"!gap-1"} icon={<BiDollar />}>
    //             Danai
    //           </ButtonIcon>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default CardList;
