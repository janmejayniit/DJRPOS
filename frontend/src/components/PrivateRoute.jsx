import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = () => {
    const authUser = localStorage.getItem('access')
    return authUser ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateRoute;