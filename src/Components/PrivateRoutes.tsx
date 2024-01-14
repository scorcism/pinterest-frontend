import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let auth_token = Cookies.get("AUTH_TOKEN");

  return auth_token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
