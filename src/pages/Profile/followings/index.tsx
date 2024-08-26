import { useEffect, useState } from "react"
import { getAllFollowings } from "../../../helpers/api"
import { IUser } from "../../../helpers/types"
import { BASE } from "../../../helpers/default"
import { Link } from "react-router-dom"

export const Followings = () => {
    const [users, setUsers] = useState<IUser[]>([])
    useEffect(() => {
        getAllFollowings()
            .then(res => {
                setUsers(res.payload as IUser[])
            })
    }, [])
    return <>
        <h1>Followings</h1>
        {
            users.map(user => {
                return <div key={user.id}>
                    <br />
                    <img
                        src={BASE + user.picture}
                        width='150px'
                        height='160px'
                    />
                    <p>{user.name} {user.surname} <Link to={'/profile/' + user.id}>account</Link> </p>
                </div>
            })

        }

    </>
}