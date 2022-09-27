import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { logout } from "../redux/reducer/user";

export default function AuthRequired({ children }) {
  let [redirect, setRedirect] = useState(false);
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.isAuthenticated) {
      dispatch(logout());
      setRedirect(true);
    }
  }, [user]);

  return redirect ? <Navigate to="/login" /> : children;
}
