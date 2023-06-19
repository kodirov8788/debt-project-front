import React, { useContext, useEffect, useState } from 'react'
import "./Userslist.css"
import Axios from '../../api/api'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

function Userslist() {
    const [data, setData] = useState([])
    const { isLoading, setIsLoading } = useContext(UserContext)



    console.log(isLoading)
    useEffect(() => {
        const getApi = async () => {
            await Axios.get("/users/get")
                .then((res) => setData(res.data))
                .catch((error) => console.log("error bor"))
        }
        getApi()
    }, [isLoading])

    const deleteuser = async (id) => {
        setIsLoading(true);
        try {
            const response = await Axios.delete(`/users/delete/${id}`);
            console.log(response.data); // Assuming the server sends a response with the deleted user information
        } catch (error) {
            console.error(error);
            console.log("Error occurred while deleting user");
        }
        setIsLoading(false);
    };
    return (
        <ul className='userlist'>
            {
                data.map(user => (

                    <li key={user._id}>
                        <div className="list_left">
                            <span>ismi: <b>{user.name}</b></span>
                            <span >qolgan qarzi: <b style={{ color: "red" }}> {user.qarz}</b></span>

                        </div>

                        <div className="list_right">
                            <Link className='link' to={`/qarzdor/${user._id}`}>Taxrirlash </Link>
                            <a href={`tel:${user.number}`}>tel: {user.number}</a>
                            <button onClick={() => deleteuser(user._id)}>delete</button>
                        </div>


                    </li>


                ))
            }
        </ul>
    )
}

export default Userslist