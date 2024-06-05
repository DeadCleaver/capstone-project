import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {

  const [userToken, setUserToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, [userToken]);

  const fetchUserData = async () => {
    if (userToken) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}user/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${userToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Erroe nel recupero delle informazioni utente");
          setUserData(null);
        }
      } catch (error) {
        console.error("Errore nel recupero delle informazioni utente:", error);
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  };

  const value = {
    userToken,
    setUserToken,
    userData, 
    setUserData,
    fetchUserData
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}