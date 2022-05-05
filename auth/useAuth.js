import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (data) => {
    setUser(data.value ? data.value : data.user);
    authStorage.storeToken(data.token);
  };

  const withOutLog = () => {
    setUser({ userType: "Employee", name: "Usigned" });
  }

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut, withOutLog };
};
