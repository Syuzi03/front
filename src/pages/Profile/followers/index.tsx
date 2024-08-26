import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { getAllFollowers } from "../../../helpers/api"
import { BASE } from "../../../helpers/default"
import { Link } from "react-router-dom"

export const Followers = () => {
    const [follower, setFollower] = useState<IUser[]>([])
    useEffect(() => {
        getAllFollowers()
            .then(res => {
                setFollower(res.payload as IUser[])
            })
    }, [])
    return <>
        <h1>Followers</h1>
        {
            follower.map(f => {
                return <div key={f.id}>
                    <br />
                    <img
                        src={BASE + f.picture}
                        width='150px'
                        height='160px'
                    />
                    <p>{f.name} {f.surname} <Link to={'/profile/' + f.id}>account</Link> </p>
                </div>
            })


        }

    </>
}