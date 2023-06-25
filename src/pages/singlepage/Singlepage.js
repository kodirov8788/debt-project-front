import React, { useState, useEffect, useContext } from 'react'
import "./Singlepage.css"
import Axios from '../../api/api'
import { useParams } from "react-router-dom"
import LoadingSpinner from '../../components/loaderSpinner/LoaderSpinner'
import { AuthContext } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'
function Singlepage() {
    const { id } = useParams()
    const { isLoading, setIsLoading } = useContext(AuthContext)
    const { user } = useAuthContext()
    const [ayiruvQiymat, setAyiruvQiymat] = useState({
        qarz: 0,
        info: ""
    })
    const [qoshuvQiymat, setQoshuvQiymat] = useState({
        qarz: 0,
        info: ""
    })

    const [userData, setUserData] = useState([])
    console.log(userData)
    useEffect(() => {
        const getApi = async () => {
            await Axios.get("/client/get", {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })
                .then((res) => {
                    setUserData(res.data.find(us => us._id === id))
                })
                .catch((error) => console.log("error bor"))
        }
        getApi()
    }, [user])


    const ayirish = async () => {
        setIsLoading(true)
        await Axios.put(`/client/minus/${id}`, ayiruvQiymat, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => console.log(res))
            .catch((error) => console.log("error bor", error))
        setIsLoading(false)
        window.location.reload()

    }

    const qoshish = async () => {
        setIsLoading(true)
        await Axios.put(`/client/plus/${id}`, qoshuvQiymat, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
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
                <div className="singlepage_topCover">
                    <input onChange={(e) => setAyiruvQiymat({ ...ayiruvQiymat, qarz: Number(e.target.value) })} type="number" placeholder='qarzdan yechish' />
                    <input type="text" placeholder='nima oldi?' onChange={(e) => setAyiruvQiymat({ ...ayiruvQiymat, info: e.target.value })} />
                    <button onClick={ayirish}>Qarzni yechish</button>
                </div>
                <div className="singlepage_topCover">
                    <input onChange={(e) => setQoshuvQiymat({ ...qoshuvQiymat, qarz: Number(e.target.value) })} type="number" placeholder='qarzga qo`shish' />
                    <input type="text" placeholder='nima oldi?' onChange={(e) => setQoshuvQiymat({ ...qoshuvQiymat, info: e.target.value })} />
                    <button onClick={qoshish}>Qarz qo`shish</button>
                </div>
            </div>

            <div className="singlepage_main">
                <div className="singlepage_title">
                    <h1>Ismi: {userData.name}</h1>
                    <h1>Umumiy qarzdorlik: {userData.qarz} so`m</h1>
                </div>
                <div className="single_container">
                    {
                        userData.comments?.map(comment => (
                            <div key={comment._id}>
                                {comment.operation === "plus" ?
                                    <div className="singlepage_plus">
                                        <h2>Qo`shilgan miqdor:{comment.amount}so`m</h2>

                                        <p>{comment.info}</p>
                                        <span>{(new Date((comment.updatedAt)).toDateString()) + " " + (new Date((comment.updatedAt)).toLocaleTimeString())}</span>
                                    </div>
                                    :
                                    <div className="singlepage_minus">
                                        <h2>ayirilgan miqdor:{comment.amount}so`m</h2>

                                        <p>{comment.info}</p>
                                        <span>{(new Date((comment.updatedAt)).toDateString()) + " " + (new Date((comment.updatedAt)).toLocaleTimeString())}</span>
                                    </div>
                                }


                            </div>))

                    }
                </div>

            </div>
        </div>
    )
}

export default Singlepage