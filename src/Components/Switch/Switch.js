import React, { useContext } from 'react';
import './Switch.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import userlist from '../userslist/Userslist';

const Switch = () => {
    const { setIsLoading, setSensor } = useContext(AuthContext)

    const inputFunction = async (e) => {
        setSensor(false)
        setIsLoading(true)
        console.log(e.target.checked)
        let checked = e.target.checked
        await axios.put(`/user/updateuser/${userlist._id}`, { isAllowed: checked })
            .then(res => console.log(res))
            .catch((error) => console.log("error bor", error))
        setIsLoading(false)
        setSensor(true)

    }
    return (
        <div className="">
            <input
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
                onChange={inputFunction}
            />
            <label
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className={`react-switch-button`} />
            </label>
        </div>
    );
};

export default Switch;