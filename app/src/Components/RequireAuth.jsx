import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  return (
    <>
      <Outlet />
    </>
  );
  // return token && refreshToken ? (
  //   <>
  //     <Outlet />
  //   </>
  // ) : (
  //   <Navigate to="/auth" state={{ from: location }} replace />
  // );
};

export default RequireAuth;
