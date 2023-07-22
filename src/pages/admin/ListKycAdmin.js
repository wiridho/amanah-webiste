import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BsDatabase } from "react-icons/bs";
import {
  MdDashboard,
  MdMoneyOffCsred,
  MdStream,
  MdSummarize,
} from "react-icons/md";
import { RiFundsFill, RiMoneyCnyBoxFill, RiNumber2 } from "react-icons/ri";
import CardInfo from "../../components/admin/CardInfo";
import {
  getAllKycRequest,
  postKycRequest,
} from "../../service/admin/adminService";
import DataTable from "react-data-table-component";
import { TbEdit } from "react-icons/tb";
import { Button } from "../../components/atom";
import { useForm } from "react-hook-form";
import { AiOutlineStop } from "react-icons/ai";
import { InputLabel } from "../../components/molekul";

const ListKycAdmin = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [dataSelected, setDataSelected] = useState("");
  const { accessToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const columns = [
    {
      name: "#",
      selector: (_, index) => index + 1,
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "ID Card Number",
      selector: (row) => row?.idCardNumber,
    },
    {
      name: "ID Card Image",
      selector: (row) => (
        <a href={row?.idCardImage} target="_blank" className="underline">
          Link KTP
        </a>
      ),
    },
    {
      name: "Face Image",
      selector: (row) => (
        <a href={row?.faceImage} target="_blank" className="underline">
          Link Face Image
        </a>
      ),
    },
    {
      name: "Roles",
      selector: (row) => row?.roles,
    },

    {
      name: "Work Position",
      selector: (row) => row?.work?.position,
    },
    {
      name: "Salary",
      selector: (row) => row?.work?.salary,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleClick(row)}
            className="bg-blue-500 px-4 py-2 text-white rounded-md"
          >
            <TbEdit />
          </button>
          <button
            onClick={() => handleClickReject(row)}
            className="bg-red-500 px-4 py-2 text-white rounded-md"
          >
            <AiOutlineStop />
          </button>
        </div>
      ),
    },
  ];

  const handleClickReject = (row) => {
    setDataSelected(row);
    setShowReject(true);
  };

  const handleClick = (row) => {
    setDataSelected(row);
    setShow(true);
  };

  const getAllKyc = async () => {
    const response = await getAllKycRequest({ accessToken });
    setData(response);
  };

  useEffect(() => {
    (async () => {
      await getAllKyc();
    })();
  }, []);

  const handleClose = () => {
    setShow(false);
    setShowReject(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log(dataSelected);

  const onSubmitReject = (data) => {
    data["userId"] = dataSelected?.userId;
    data["status"] = "reject";
    data["loanLimit"] = 0;
    const response = postKycRequest({ data, accessToken });
  };
  const onSubmitAccept = (data) => {
    data["userId"] = dataSelected?.userId;
    data["status"] = "approved";

    const response = postKycRequest({ data, accessToken });
  };

  return (
    <div className=" font-nunito-sans p-10 !overflow-x-clip">
      <div className="">
        {showReject && (
          <div className="fixed inset-0 z-10 overflow-y-auto font-nunito-sans">
            <div className="fixed inset-0 w-full h- full bg-black opacity-40"></div>
            <div className="flex items-center min-h-screen">
              <div className="relative w-full max-w-lg mx-auto bg-white rounded-md p-6">
                <div className="flex flex-col">
                  <form onSubmit={handleSubmit(onSubmitReject)}>
                    <InputLabel
                      placeholder={"Alasan Penolakan"}
                      type={"text"}
                      name={"message"}
                      register={{
                        ...register("message", {
                          required: true,
                        }),
                      }}
                      errors={errors.email}
                    >
                      Alasan Penolakan
                    </InputLabel>
                    <button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
                      Submit
                    </button>
                  </form>

                  <div className="">
                    <Button
                      type={"button"}
                      onClick={handleClose}
                      className=" text-red-500 hover:text-red-600 w-full "
                    >
                      Tutup
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {show && (
          <div className="fixed inset-0 z-10 overflow-y-auto font-nunito-sans">
            <div className="fixed inset-0 w-full h- full bg-black opacity-40"></div>
            <div className="flex items-center min-h-screen">
              <div className="relative w-full max-w-lg mx-auto bg-white rounded-md p-6">
                <div className="flex flex-col">
                  <div className="">
                    <form onSubmit={handleSubmit(onSubmitAccept)}>
                      <InputLabel
                        placeholder={"Masukkan Loan Limit"}
                        type={"number"}
                        name={"message"}
                        register={{
                          ...register("loanLimit", {
                            required: true,
                          }),
                        }}
                        errors={errors.loanLimit}
                      >
                        Limit Loan
                      </InputLabel>
                      <button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
                        Submit
                      </button>
                    </form>
                    <Button
                      type={"button"}
                      onClick={handleClose}
                      className=" text-red-500 hover:text-red-600 w-full "
                    >
                      Tutup
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {data && (
          <DataTable
            columns={columns}
            data={data}
            fixedHeader
            pagination
            responsive={true}
          />
        )}
      </div>
    </div>
  );
};

export default ListKycAdmin;
