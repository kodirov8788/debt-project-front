import Axios from '../../api/api'
import React, { useContext } from 'react'
import "./Form.css"
import { AuthContext } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'
function Forms() {
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext)

    const { user } = useAuthContext()
    console.log(isLoading)
    const sendForm = async (e) => {
        e.preventDefault()
        setSensor(false)
        setIsLoading(true)
        let name = e.target[0].value
        let qarz = e.target[1].value
        let info = e.target[2].value
        let number = e.target[3].value
        await Axios.post("/client/create", {
            name,
            qarz,
            info,
            number: Number(number),
            comments: [],
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(res => console.log(res))
            .catch(() => console.log("error chiqdi"))
        setIsLoading(false)
        setSensor(true)

        e.target[0].value = ''
        e.target[1].value = ''
        e.target[2].value = ''
        e.target[3].value = ''
    }

    return (
        <form className='form' action="" onSubmit={sendForm}>
            <div className="textm">
                <h3>Qarz qo'shish:</h3>
            </div>
            <div className="inputs">
                <input type="text" placeholder='Qarzdor ismi' required />
                <input type="number" placeholder='Qancha qarzi bor' required />
                <input type="text" placeholder='Nima oldi?' />
                <input type="number" placeholder='Telefon raqami' />

            </div>
            <div className="btn">
                <button>Qo'shish</button>
            </div>
        </form>
    )
}

export default Forms