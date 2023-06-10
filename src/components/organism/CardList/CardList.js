import React, { useEffect } from "react";
import apiConfig from "../../../api/apiConfig";
import { BsFillPersonFill } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";
import { Button } from "../../atom";
import ButtonIcon from "../../molekul/button-icon/ButtonIcon";
import axios from "axios";
import Data from "./Data.json";

const CardList = () => {
  // const getAvailableLoan = async () => {
  //   try {
  //     const response = await axios.get(`${apiConfig.baseUrl}/loans/available`);
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getAvailableLoan();
  // }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {Data.map((item, index) => {
        let progress = (item.totalFunding / item.amount) * 100;
        return (
          <div
            key={index}
            className="w-full flex-col bg-white border border-gray-200 rounded-lg shadow-md p-4"
          >
            <div className="flex">
              <BsFillPersonFill className="text-lg" />
              <p className="text-lg">{item.name}</p>
            </div>
            <div className="flex justify-between">
              <div className="">
                <p className="text-sm">Terisi</p>
                <p className="text-lg">Rp{item.totalFunding}</p>
              </div>
              <div className="">
                <p className="text-sm">Total Pinjaman</p>
                <p className="text-lg">Rp{item.amount}</p>
              </div>
            </div>
            <div className="w-full bg-neutral-200 ">
              <div
                className={`bg-green-500 p-0.5 text-center text-xs font-medium text-white leading-none`}
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
            <div className="flex justify-between">
              <div className="">
                <p className="text-sm">Tenor</p>
                <p className="text-lg">{item.tenor} bulan</p>
              </div>
              <div className="">
                <p className="text-sm">Kategori</p>
                <p className="text-lg">{item.borrowingCategory}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="">
                <p className="text-sm">Imbal Hasil</p>
                <p className="text-lg">Rp{item.yieldReturn}</p>
              </div>
            </div>
            <div className="w-full bg-green-500">
              <ButtonIcon className={"!gap-1"} icon={<BiDollar />}>
                Danai
              </ButtonIcon>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
