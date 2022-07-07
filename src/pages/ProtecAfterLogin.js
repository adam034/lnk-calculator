import { Outlet } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
const ProtectAfterLogin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return !token ? <Outlet /> : <Navigate to="/calculator" replace />;
};
export default ProtectAfterLogin;
