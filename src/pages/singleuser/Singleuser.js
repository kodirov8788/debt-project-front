import React from 'react'
import "./Singleuser.css"
import Switch from '../../components/Switch/Switch'
import { Link } from 'react-router-dom'

function Singleuser() {
    return (
        <div>
            <div className="adminlink">
                <Link to={"/admin"}>Ortga qaytish</Link>
            </div>
            <h1>Adminni tahrirlash</h1>
            <div className="">
                <form action="">
                    <label htmlFor="">Adminlik huquqini berish</label>
                    <Switch />
                </form>
            </div>
        </div>
    )
}

export default Singleuser