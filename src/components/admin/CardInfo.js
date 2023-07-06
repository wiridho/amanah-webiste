import { BsDatabase } from 'react-icons/bs';
import { MdDashboard, MdStream } from 'react-icons/md';
import { RiExchangeFundsFill, RiFundsFill } from 'react-icons/ri';

const CardInfo = () => {
    return (
        <div>
            {/* LIST OF CARD */}
            <div className="mt-8 grid grid-cols-4 gap-8">
                <div className="flex items-center relative justify-between py-5 px-7 bg-indigo-100 font-medium text-indigo-800 rounded-md">
                    <div className="bg-indigo-200 z-10 right-0 absolute w-32 h-full rounded-s-full"></div>
                    <div className="flex flex-col z-20">
                        <span className="mb-2">Total Pinjaman</span>
                        <div className="flex items-center gap-2 text-4xl font-semibold">
                            <span>
                                120<span className="text-xl">x</span>
                            </span>
                        </div>
                    </div>
                    <div className="text-6xl z-20">
                        <BsDatabase />
                    </div>
                </div>
                <div className="flex items-center relative justify-between py-5 px-7 bg-fuchsia-100 font-medium text-fuchsia-800 rounded-md">
                    <div className="bg-fuchsia-200 z-10 right-0 absolute w-32 h-full rounded-s-full"></div>
                    <div className="flex flex-col z-20">
                        <span className="mb-2">Total Pendanaan</span>
                        <div className="flex items-center gap-2 text-4xl font-semibold">
                            <span>
                                120<span className="text-xl">x</span>
                            </span>
                        </div>
                    </div>
                    <div className="text-6xl z-20">
                        <RiFundsFill />
                    </div>
                </div>
                <div className="flex items-center relative justify-between py-5 px-7 bg-pink-100 font-medium text-pink-800 rounded-md">
                    <div className="bg-pink-200 z-10 right-0 absolute w-32 h-full rounded-s-full"></div>
                    <div className="flex flex-col z-20">
                        <span className="mb-2">Total Dana Tersalurkan</span>
                        <div className="flex items-center gap-2 text-4xl font-semibold">
                            <span>
                                120<span className="text-xl">juta rupiah</span>
                            </span>
                        </div>
                    </div>
                    <div className="text-6xl z-20">
                        <MdStream />
                    </div>
                </div>
                <div className="flex items-center relative justify-between py-5 px-7 bg-rose-100 font-medium text-rose-800 rounded-md">
                    <div className="bg-rose-200 z-10 right-0 absolute w-32 h-full rounded-s-full"></div>
                    <div className="flex flex-col z-20">
                        <span className="mb-2">Total Dana Dipinjam</span>
                        <div className="flex items-center gap-2 text-4xl font-semibold">
                            <span>
                                120<span className="text-xl">juta rupiah</span>
                            </span>
                        </div>
                    </div>
                    <div className="text-6xl z-20">
                        <RiExchangeFundsFill />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardInfo;
