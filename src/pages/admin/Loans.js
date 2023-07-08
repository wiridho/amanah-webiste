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

const LoanAdmin = () => {
    return (
        <>
            <div className="gap-8 max-w-7xl mx-auto">
                <span className="text-2xl flex gap-2 items-center font-semibold text-gray-700">
                    <MdDashboard size={32} />
                    Data Pinjaman
                </span>
                <div className="bg-white rounded-md  mt-6">
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
        </>
    );
};

export default LoanAdmin;
