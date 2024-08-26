import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { getAllRequests, handleAcceptFollow, handleDeclineFollow } from "../../../helpers/api"
import { BASE } from "../../../helpers/default"
import { Link, useNavigate } from "react-router-dom"



export const Request = () => {
    const [request, setRequest] = useState<IUser[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        getAllRequests()
            .then(response => {
                setRequest(response.payload as IUser[])
            })
    }, [])

    const handleAccept = (reqId: number) => {

        handleAcceptFollow(reqId)
            .then((res) => {

                console.log(res)
            })
        navigate('/profile/followers')
    }
    const handleDecline = (reqId: number) => {
        handleDeclineFollow(reqId)
            .then(() => {
                setRequest(prevReq => prevReq.filter(req => req.id !== reqId))
            })
    }
    return <div className="container">
        <h1>Requests</h1>
        {
            request.map(request => {
                return <div key={request.id}>
                    <br />
                    <img
                        src={BASE + request.user?.picture}
                        width='150px'
                        height='160px'
                    />
                    <p>{request.user?.name} {request.user?.surname} <Link to={'/profile/' + request.user?.id}>account</Link> </p>
                    <button onClick={() => handleAccept(request.id as number)} className="btn btn-primary btn-sm btn-accept">accept</button>
                    <button onClick={() => handleDecline(request.id as number)} className="btn btn-primary btn-sm btn-decline">decline</button>

                </div>
            })


        }



    </div>
}