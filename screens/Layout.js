import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../core/features/user";

const Layout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser()); 
  }, [dispatch]);

  return <>{props.children}</>;
};

export default Layout;
