import { Navigate, Outlet } from "react-router-dom";
import useStore from "@/store/useStore";

const ProtectedRoute = () => {
    const { user } = useStore();
    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
