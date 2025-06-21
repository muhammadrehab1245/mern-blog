import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const PrivateRoutes = () => {
    const { token } = useAuth();
    console.log("token", token);
    return token ? <Outlet /> : <Navigate to="/login" />;
  };
  export default PrivateRoutes;