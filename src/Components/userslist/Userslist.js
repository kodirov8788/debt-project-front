import React, { useContext, useEffect, useState } from 'react'
import "./Userslist.css"
import Axios from '../../api/api'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

function Userslist() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setIsLoading: setContextIsLoading } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await Axios.get('/users/get');
                setData(response.data);
            } catch (error) {
                console.error(error);
                console.log('Error occurred while fetching data');
            }
            setIsLoading(false);
        };

        fetchData();
    }, [isLoading]);

    const deleteUser = async (id) => {
        setContextIsLoading(true);
        try {
            const response = await Axios.delete(`/users/delete/${id}`);
            console.log(response.data); // Assuming the server sends a response with the deleted user information
        } catch (error) {
            console.error(error);
            console.log('Error occurred while deleting user');
        }
        setContextIsLoading(false);
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
                            <button onClick={() => deleteUser(user._id)}>delete</button>
                        </div>


                    </li>


                ))
            }
        </ul>
    )
}

export default Userslist