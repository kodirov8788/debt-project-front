import Axios from '../../api/api'
import React, { useContext } from 'react'
import "./Form.css"
import { GlobalState } from '../../context/GlobalState'
function Forms() {
    const { isLoading, setIsLoading } = useContext(GlobalState)
    const sendForm = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        let name = e.target[0].value
        let qarz = e.target[1].value
        let info = e.target[2].value
        let number = e.target[3].value

        console.log(name)
        console.log(qarz)
        console.log(info)
        console.log(number)

        await Axios.post("/client/create", {
            name,
            qarz,
            info,
            number: Number(number),
            comments: [],
        }).then(res => console.log(res))
            .catch(() => console.log("error chiqdi"))
        setIsLoading(false)
    }

    return (
        <form className='form' action="" onSubmit={sendForm}>
            <div className="textm">
                <h3>Qarz qo'shish:</h3>
            </div>
            <div className="input">
                <input type="text" placeholder='Qarzdor ismi' required />
                <input type="number" placeholder='qancha qarz' required />
                <input type="text" placeholder='nima oldi?' />
                <input type="number" placeholder='tel raqam' />

            </div>
            <div className="btn">
                <button>Qo'shish</button>
            </div>
        </form>
    )
}

export default Forms