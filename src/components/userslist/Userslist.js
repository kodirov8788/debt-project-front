import React, { useContext, useEffect, useState } from 'react';
import './Userslist.css';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';

function Userslist() {
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const { setIsLoading: setContextIsLoading, sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();

    console.log(data);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await Axios.get('/client/get', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            setData(response.data);
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [user, sensor]);

    const deleteUser = async (id) => {
        setContextIsLoading(true);
        setSensor(false)
        try {
            const response = await Axios.delete(`/client/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log(response.data); // Assuming the server sends a response with the deleted user information
        } catch (error) {
            console.error(error);
            console.log('Error occurred while deleting user');
        }
        setContextIsLoading(false);
        setSensor(true)

    };

    return (
        <ul className='userlist'>
            <h1 className='usertext'>Qarzdorlar ro'yhati:</h1>
            {data.length === 0 ? (
                <h1>loading...</h1>
            ) : (
                data.map((user) => (
                    <li key={user._id}>
                        <div className='list_left'>
                            <span>
                                Qarzdor ismi: <b style={{ fontStyle: "italic" }}>{user.name}</b>
                            </span>
                            <span>
                                Qolgan qarzi: <b style={{ color: "red", fontStyle: "italic" }}>{user.qarz}</b>
                            </span>
                            <span>Nima olgan: <b>{user.info}</b></span>
                            <span className=''>
                                <a href={`tel:${user.number}`} style={{ color: "black", textDecoration: "none" }}>Telefon raqami: <b className='tel' style={{ fontStyle: "italic" }}>{user.number}</b></a>
                            </span>
                        </div>

                        <div className='list_right'>
                            <Link className='link' to={`/debt/${user._id}`}>
                                Taxrirlash
                            </Link>

                            {/* <button onClick={() => deleteUser(user._id)}>delete</button> */}
                        </div>
                    </li>
                ))
            )}
        </ul>
    );
}

export default Userslist;
