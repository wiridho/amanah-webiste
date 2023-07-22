import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectRoute = ({ valid, children, to }) => {
  const { roles } = useSelector((state) => state.auth);

  const toRedirect = () => {
    if (roles === "lender") {
      return "/funder";
    } else if (roles === "borrower") {
      return "/borrower";
    } else if (roles === "admin") {
      return "/admin";
    } else {
      return "/";
    }
  };

  return valid ? (
    <>{children}</>
  ) : (
    <Navigate to={toRedirect()} replace={true} />
  );
};

export default ProtectRoute;
ProtectRoute.defaultProps = {
  to: "/",
};
