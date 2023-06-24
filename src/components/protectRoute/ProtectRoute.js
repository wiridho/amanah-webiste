import { Navigate } from "react-router-dom";

const ProtectRoute = ({ valid, children, to }) => {
  return valid ? <>{children}</> : <Navigate to={to} replace={true} />;
};

export default ProtectRoute;
ProtectRoute.defaultProps = {
  to: "/",
};
