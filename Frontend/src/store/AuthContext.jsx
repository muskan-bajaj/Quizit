import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
const AuthContext = React.createContext({
  isLoggedIn: false,
  user: {
    name: "",
    email: "",
    rollno: "",
    access: "",
  },
  login: async () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const verifyLogIn = () => {
    axios
      .get("http://localhost:3000/auth/validate", { withCredentials: true })
      .then((response) => {
        if (response.status == 200) {
          setUser({
            name: response.data.name,
            email: response.data.email,
            rollNo: response.data.rollno,
            access: response.data.role,
          });
          setUserIsLoggedIn(true);
        }
      });
  };

  const loginHandler = (name, email, rollno, access) => {
    setUser({
      name: name,
      email: email,
      rollNo: rollno,
      access: access,
    });
    localStorage.setItem("isLoggedIn", true);
    setUserIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setUser({});
    setUserIsLoggedIn(false);
  };

  const contextValue = useMemo(
    () => ({
      isLoggedIn: userIsLoggedIn,
      user: user,
      login: loginHandler,
      logout: logoutHandler,
    }),
    [userIsLoggedIn, user]
  );

  useEffect(() => {
    verifyLogIn();
  }, []);
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
