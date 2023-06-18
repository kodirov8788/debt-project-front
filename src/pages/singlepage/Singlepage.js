import React, { useState, useEffect, useContext } from 'react'
import "./Singlepage.css"
import axios from 'axios'
import { useParams } from "react-router-dom"
import LoadingSpinner from '../../Components/loaderSpinner/LoaderSpinner'
import { UserContext } from '../../context/UserContext'
function Singlepage() {
    const { id } = useParams()
    const { isLoading, setIsLoading } = useContext(UserContext)
    const [ayiruvQiymat, setAyiruvQiymat] = useState(0)
    const [qoshuvQiymat, setQoshuvQiymat] = useState(0)
    console.log(id)
    console.log(ayiruvQiymat)

    const [user, setUser] = useState([])
    console.log(user)
    useEffect(() => {
        const getApi = async () => {
            await axios.get("http://localhost:5000/users/get")
                .then((res) => {
                    setUser(res.data.find(us => us._id === id))
                })
                .catch((error) => console.log("error bor"))
        }
        getApi()
    }, [])


    const ayirish = async () => {
        setIsLoading(true)
        await axios.put(`http://localhost:5000/users/minus/${id}`, {
            qarz: ayiruvQiymat
        })
            .then(res => console.log(res))
            .catch((error) => console.log("error bor", error))
        setIsLoading(false)
        window.location.reload()

    }

    const qoshish = async () => {
        setIsLoading(true)
        await axios.put(`http://localhost:5000/users/plus/${id}`, {
            qarz: qoshuvQiymat
        })
            .then(res => console.log(res))
            .catch((error) => console.log("error bor", error))
        setIsLoading(false)
        window.location.reload()
    }
    return (
        <div>
            <LoadingSpinner boolean={isLoading} />
            <div className="singlepage_top">
                <div className="singlepage_left">
                    <input onChange={(e) => setAyiruvQiymat(e.target.value)} type="number" placeholder='qarzdan yechish' />
                    <button onClick={ayirish}>Qarzni yechish</button>
                </div>
                <div className="singlepage_right">
                    <input onChange={(e) => setQoshuvQiymat(e.target.value)} type="number" placeholder='qarz qo`shish' />
                    <button onClick={qoshish}>Qarz qo`shish</button>
                </div>
            </div>

            <div className="singlepage_main">
                <div className="singlepage_title">
                    <h1>Ismi: {user.name}</h1>
                    <h1>Umumiy qarzdorlik: {user.qarz} so`m</h1>
                </div>

                <div className="singlepage_about">
                    <h2>Qoldiq qarzi: 200 000so`m</h2>
                    <p>Sabzi olgan</p>
                    <span>sana: 29.05.2023 </span>
                </div>
                <div className="singlepage_about">
                    <h2>Qoldiq qarzi: 100 000so`m</h2>
                    <p>Bodring olgan</p>
                    <span>sana: 25.05.2023 </span>
                </div>
            </div>
        </div>
    )
}

export default Singlepage