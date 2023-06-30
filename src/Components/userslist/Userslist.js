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



    return (
        <ul className='userlist'>
            <h1>User lists</h1>
            {data.length === 0 ? (
                <h1>loading...</h1>
            ) : (
                data.map((user) => (
                    <li key={user._id}>
                        <div className='list_left'>
                            <span>
                                ismi: <b>{user.name}</b>
                            </span>
                            <span>
                                qolgan qarzi: <b style={{ color: 'red' }}>{user.qarz}</b>
                            </span>
                        </div>

                        <div className='list_right'>
                            <Link className='link' to={`/debt/${user._id}`}>
                                Taxrirlash
                            </Link>

                            <a href={`tel:${user.number}`}>tel: {user.number}</a>

                        </div>
                    </li>
                ))
            )}
        </ul>
    );
}

export default Userslist;
