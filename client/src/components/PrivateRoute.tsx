import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";


const PrivateRoute = () => {
    const { currentUser } = useAppSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute
