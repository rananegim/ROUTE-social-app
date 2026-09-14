import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userToken, setuserToken] = useState(null);
  const [userData, setuserData] = useState(null);

  async function getuserdata() {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/profile-data",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setuserData(data.data.user);
     // console.log(data.data.user);
     
      

    } catch (error) {
      console.log(
        "Profile Error:",
        error.response?.status,
        error.response?.data || error.message
      );
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setuserToken(token);
      getuserdata();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setuserToken,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}