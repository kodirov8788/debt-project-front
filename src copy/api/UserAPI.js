import { useState, useEffect } from "react";
import Axios from "../api/api";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState([]);
  console.log(userEmail)
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await Axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setUserEmail(res.data);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);



  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    userEmail: [userEmail, setUserEmail]
  };
}

export default UserAPI;
