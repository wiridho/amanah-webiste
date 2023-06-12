import React, { useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { Button, Input } from "../../components/atom";
import { useSelector } from "react-redux";
import { getAvailableLoan } from "../../service/loans/loan";
import { useForm } from "react-hook-form";

const Pendanaan = () => {
  const { accessToken } = useSelector((state) => state.auth);
  // Calling useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const data = await getAvailableLoan({ accessToken });
      console.log("Available Loan", data);
    })();
  }, [accessToken]);

  // Handle Submit
  const onSubmit = (data) => {
    console.log("search", data);
  };

  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="">
          <h1 className="text-2xl font-semibold">Pendanaan</h1>
          <span>Total 5 Aktif, 5 Penuh, 100 Berhasil</span>
        </div>
        <div className="">
          <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none">
                <HiOutlineSearch className="w-5 h-5 text-green-500 dark:text-gray-400" />
              </div>

              <Input
                placeholder={"Cari"}
                className={
                  "mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2"
                }
                type={"text"}
                register={{
                  ...register("search"),
                }}
                errors={errors.search}
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
      {/* Main Content */}
      <div className="grid grid-cols-[auto_1fr]">
        {/* Filter */}
        <div className="space-y-4 w-[300px] mr-10">
          <details
            className="group [&_summary::-webkit-details-marker]:hidden bg-white rounded-md shadow-sm"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg p-4  text-gray-900">
              <h2 className="font-medium">Tingkat Risiko</h2>

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

            <p className=" px-4 leading-relaxed text-gray-700">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
              veritatis molestias culpa in, recusandae laboriosam neque aliquid
              libero nesciunt voluptate dicta quo officiis explicabo
              consequuntur distinctio corporis earum similique!
            </p>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
              <h2 className="font-medium">Imbal Hasil</h2>

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
              libero nesciunt voluptate dicta quo officiis explicabo
              consequuntur distinctio corporis earum similique!
            </p>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
              <h2 className="font-medium">Durasi Pengembalian</h2>

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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
          </details>
        </div>
        {/* Card */}
        <div>
          <a
            class="relative flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
            href="#"
          >
            <div class="pt-4 text-gray-500">
              <svg
                class="h-8 w-8 sm:h-10 sm:w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                ></path>
              </svg>

              <h3 class="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                Science of Chemistry
              </h3>

              <p class="mt-2 hidden text-sm sm:block">
                You can manage phone, email and chat conversations all from a
                single mailbox.
              </p>
            </div>

            <span class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
              4.3
            </span>
          </a>
          <a
            class="relative flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
            href="#"
          >
            <div class="pt-4 text-gray-500">
              <svg
                class="h-8 w-8 sm:h-10 sm:w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                ></path>
              </svg>

              <h3 class="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                Science of Chemistry
              </h3>

              <p class="mt-2 hidden text-sm sm:block">
                You can manage phone, email and chat conversations all from a
                single mailbox.
              </p>
            </div>

            <span class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
              4.3
            </span>
          </a>
          <a
            class="relative flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
            href="#"
          >
            <div class="pt-4 text-gray-500">
              <svg
                class="h-8 w-8 sm:h-10 sm:w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                ></path>
              </svg>

              <h3 class="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                Science of Chemistry
              </h3>

              <p class="mt-2 hidden text-sm sm:block">
                You can manage phone, email and chat conversations all from a
                single mailbox.
              </p>
            </div>

            <span class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
              4.3
            </span>
          </a>
          <a
            class="relative flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
            href="#"
          >
            <div class="pt-4 text-gray-500">
              <svg
                class="h-8 w-8 sm:h-10 sm:w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                ></path>
              </svg>

              <h3 class="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                Science of Chemistry
              </h3>

              <p class="mt-2 hidden text-sm sm:block">
                You can manage phone, email and chat conversations all from a
                single mailbox.
              </p>
            </div>

            <span class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
              4.3
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pendanaan;
