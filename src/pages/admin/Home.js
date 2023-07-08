import React, { useEffect, useState } from 'react';
import {} from 'react-icons';
import { BsDatabase } from 'react-icons/bs';
import {
    MdDashboard,
    MdMoneyOffCsred,
    MdStream,
    MdSummarize,
} from 'react-icons/md';
import { RiFundsFill, RiMoneyCnyBoxFill, RiNumber2 } from 'react-icons/ri';
import CardInfo from '../../components/admin/CardInfo';

const HomeAdmin = () => {
    return (
        <>
            <div className="gap-8 max-w-7xl mx-auto">
                <span className="text-2xl flex gap-2 items-center font-semibold text-gray-700">
                    <MdDashboard size={32} />
                    ADMIN DASHBOARD
                </span>
                <CardInfo />
                <div className="grid grid-cols-3 mt-8 gap-8 ">
                    <div className="col-span-2">
                        <div className="bg-white rounded-md">
                            <div className="p-4 rounded-t-md">
                                <span className="font-semibold text-lg text-rose-800 flex gap-2 items-center ">
                                    <span className="text-3xl">
                                        <RiMoneyCnyBoxFill />{' '}
                                    </span>
                                    Lender Terbanyak Pendanaan
                                </span>
                            </div>
                            <hr />
                            <div class="overflow-x-auto p-4">
                                <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    <thead class="ltr:text-left rtl:text-right">
                                        <tr>
                                            <th class="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                                                Nama Lengkap
                                            </th>
                                            <th class="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                                                Email
                                            </th>
                                            <th class="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                                                Total Pendanaan
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody class="divide-y divide-gray-200">
                                        <tr>
                                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                John Doe
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                                                john@mail.com
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <span className="font-bold px-2 py-1 bg-rose-100 text-rose-800 rounded-lg">
                                                    Rp. 10.000.000
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-white rounded-md  mt-6">
                            <div className="p-4 rounded-t-md">
                                <span className="font-semibold text-lg text-indigo-800 flex gap-2 items-center ">
                                    <span className="text-3xl">
                                        <RiMoneyCnyBoxFill />{' '}
                                    </span>
                                    Borrower Terbanyak Pinjam
                                </span>
                            </div>
                            <hr />
                            <div class="overflow-x-auto p-4">
                                <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    <thead class="ltr:text-left rtl:text-right">
                                        <tr>
                                            <th class="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                                                Nama Lengkap
                                            </th>
                                            <th class="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                                                Email
                                            </th>
                                            <th class="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
                                                Total Dana Pinjaman
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody class="divide-y divide-gray-200">
                                        <tr>
                                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                John Doe
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                                                john@mail.com
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <span className="font-bold px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg">
                                                    Rp. 10.000.000
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="bg-white rounded-md p-4">
                            <span className="font-semibold text-lg text-gray-700">
                                Kategori Pinjaman Terbanyak
                            </span>
                            <hr className="mt-4 border-indigo-100" />
                            <div class="overflow-x-auto mt-4">
                                <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    {/* <thead class="ltr:text-left rtl:text-right">
                                        <tr>
                                            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                Categori
                                            </th>
                                            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                Total
                                            </th>
                                        </tr>
                                    </thead> */}

                                    <tbody class="divide-y divide-gray-200 ">
                                        <tr>
                                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                                                <span className="font-bold text-gray-700">
                                                    {' '}
                                                    #1{' '}
                                                </span>
                                                <span
                                                    className="px-2 py-1 bg-pink-100 rounded-lg text-pink-800
                                                "
                                                >
                                                    Hiburan
                                                </span>
                                            </td>
                                            <td class="whitespace-nowrap text-end px-4 py-2">
                                                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-xl font-medium">
                                                    10x
                                                </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                                                <span className="font-bold text-gray-700">
                                                    {' '}
                                                    #2{' '}
                                                </span>
                                                <span
                                                    className="px-2 py-1 bg-rose-100 rounded-lg text-rose-800
                                                "
                                                >
                                                    Pendidikan
                                                </span>
                                            </td>
                                            <td class="whitespace-nowrap text-end px-4 py-2">
                                                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-xl font-medium">
                                                    10x
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                                                <span className="font-bold text-gray-700">
                                                    {' '}
                                                    #3{' '}
                                                </span>
                                                <span
                                                    className="px-2 py-1 bg-fuchsia-100 rounded-lg text-fuchsia-800
                                                "
                                                >
                                                    Lalalala
                                                </span>
                                            </td>
                                            <td class="whitespace-nowrap text-end px-4 py-2">
                                                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-xl font-medium">
                                                    10x
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeAdmin;
