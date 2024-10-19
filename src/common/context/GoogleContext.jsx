import { createContext, useReducer } from "react";

const GoogleContext = createContext();

const googleReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const GoogleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(googleReducer, {
    user: null,
    isAuthenticated: false,
  });

  return (
    <GoogleContext.Provider value={{ state, dispatch }}>
      {children}
    </GoogleContext.Provider>
  );
};

export default GoogleContext;
