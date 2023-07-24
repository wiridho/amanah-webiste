import { Link } from "react-router-dom";

export const badgeVerified = (param) => {
  if (param === true) {
    return (
      <span className="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-700">
        Sudah verifikasi
      </span>
    );
  } else {
    return (
      <span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700">
        Belum verifikasi, silahkan verifikasi{" "}
        <Link to={"/funder/kyc"} className="underline">
          disini!
        </Link>
      </span>
    );
  }
};
