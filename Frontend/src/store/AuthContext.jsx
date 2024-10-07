import React, { useState, useMemo } from "react";

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

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
