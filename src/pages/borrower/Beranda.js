import React from "react";
import { useSelector } from "react-redux";
import { ButtonIcon } from "../../components/molekul";

import { AiOutlineSchedule } from "react-icons/ai";
import { Badge, Button } from "../../components/atom";
import { IoPintOutline } from "react-icons/io5";
import { MdNotes } from "react-icons/md";
import {
  HiInformationCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";

const Beranda = () => {
  const { statusKYC, roles } = useSelector((state) => state.auth);
  return (
    <div className="grid grid-cols-6 gap-8">
      <div className="col-span-3">
        <article className="flex  flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="flex flex-col items-center ">
            <div>
              <span>Limit Tersedia</span>
            </div>
            <div>
              <span>Rp.10.000</span>
            </div>
            <div>
              <Button className={"bg-blue-900 text-white font-medium"}>
                Verfikasi Data
              </Button>
            </div>
          </div>
        </article>
      </div>
      <div className="col-span-3">
        <article className="flex  flex-col rounded-lg bg-white">
          <div className="border-b border-b-gray-200 p-5 flex items-center gap-3">
            <AiOutlineSchedule size={25} className="text-blue-900" />
            <span className="text-blue-900 font-medium">Jadwal Pembayaran</span>
          </div>
          <div className=" flex flex-col gap-3 p-5">
            <div className="flex justify-between">
              <span>
                <Badge className={"bg-red-100 text-red-500"}>
                  04 September 2023
                </Badge>
              </span>
              <span className="font-medium text-gray-700 font-mono">
                Rp10.000.000
              </span>
            </div>
            <div className="flex justify-between">
              <span>
                <Badge className={"bg-red-100 text-red-500"}>
                  18 September 2023
                </Badge>
              </span>
              <span className="font-medium text-gray-700 font-mono">
                Rp10.000.000
              </span>
            </div>
            <div className="flex justify-between">
              <span>
                <Badge className={"bg-red-100 text-red-500"}>
                  20 Desember 2023{" "}
                </Badge>
              </span>
              <span className="font-medium text-gray-700 font-mono">
                Rp10.000.000
              </span>
            </div>
          </div>
          <div className="p-5 border-t border-t-gray-200 mt-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-blue-900">
                <HiOutlineInformationCircle size={25} />
                <span className="font-medium">Keterangan</span>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-5 h-5 bg-red-100"></div>
                  <div>
                    <span className="font-medium text-gray-500 text-sm">
                      Belum dibayar
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-5 h-5 bg-green-100"></div>
                  <div>
                    <span className="font-medium text-gray-500 text-sm">
                      Sudah dibayar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Beranda;
