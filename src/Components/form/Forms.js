import Axios from '../../api/api'
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

function Forms() {
    const { isLoading, setIsLoading } = useContext(UserContext)
    const sendForm = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        let name = e.target[0].value
        let qarz = e.target[1].value

        console.log(name)
        console.log(qarz)

        await Axios.post("/users/create", {
            name,
            qarz
        }).then(res => console.log(res))
            .catch(() => console.log("error chiqdi"))
        setIsLoading(false)
    }

    return (
        <form action="" onSubmit={sendForm}>
            <div className="textm">
                <h3>Qarz qo'shish:</h3>
            </div>
            <div className="input">
                <input type="text" placeholder='Qarzdor ismi' />
                <input type="number" placeholder='qancha qarz' />
            </div>
            <div className="btn">
                <button>Qo'shish</button>
            </div>
        </form>
    )
}

export default Forms