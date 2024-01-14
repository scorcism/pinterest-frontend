import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const AuthWrapper = () => {
  let auth_token = Cookies.get("AUTH_TOKEN");

  return auth_token ? <Navigate to="/login" /> : <Outlet />;
};

export default AuthWrapper;
