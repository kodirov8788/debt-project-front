import React, { useContext, useEffect, useState } from 'react'
import "./Userslist.css"
import Axios from '../../api/api'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../loaderSpinner/LoaderSpinner'
import { UserContext } from '../../context/UserContext'

function Userslist() {
    const [data, setData] = useState([])
    const { isLoading, setIsLoading } = useContext(UserContext)



    console.log(data)
    useEffect(() => {
        const getApi = async () => {
            await Axios.get("/users/get")
                .then((res) => setData(res.data))
                .catch((error) => console.log("error bor"))
        }
        getApi()
    }, [isLoading])

    const deleteuser = async (id) => {
        setIsLoading(true)
        await Axios.delete(`/users/delete/${id}`)
            .then((res) => console.log(res))
            .catch((error) => console.log("error bor"))
        setIsLoading(false)
    }
    return (
        <ul>
            {
                data.map(user => (

                    <li key={user._id}>ismi: {user.name}, qolgan qarzi: <span style={{ color: "red" }}>{user.qarz}</span>

                        <div className=""> <Link to={`/qarzdor/${user._id}`}>Taxrirlash </Link> || <button onClick={() => deleteuser(user._id)}>delete</button></div> </li>


                ))
            }
        </ul>
    )
}

export default Userslist