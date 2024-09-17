import { startTransition, useState, useRef, useEffect } from "react"
import Button from "./Button"
import Input from "./Input"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
let Users = () => {
    let [params, setParams] = useSearchParams();
    let [filterValue, setFilterValue] = useState(params.get("filter") || "")
    let inputEle = useRef(null);
    let [isLoading, setIsLoading] = useState(false)
    let [debounce, setDebounce] = useState(null)
    let onchange = (e) => {
        setFilterValue(e.target.value)
    }
    useEffect(() => {
        if (debounce) {
            clearTimeout(debounce)
        }
        setDebounce(setTimeout(() => {
            setParams({ filter: filterValue })
            startTransition(() => {
                setIsLoading(true)
                let token = localStorage.getItem("token")
                axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filterValue}`, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json",
                        "Accept": "application/json",

                    }
                }).then((res) => {
                    console.log(res.data.user)
                    setUsers(res.data.user)
                }).finally(() => {
                    setIsLoading(false)
                }).catch((err) => {
                    console.log(err)
                })

            }
            )
        }, 1000))
    }, [filterValue])

    let [users, setUsers] = useState([])

    return (
        <div className="flex flex-col justify-evenly m-8 p-8">
            <Input reference={inputEle}
                placeHolder="Filter Users"
                type="text"
                value={filterValue}
                onchange={onchange}
            />
            {
                isLoading ?
                    <div className="flex justify-center items-center p-12">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                    : <>
                        {users.map((user) => {
                            if (user.email === localStorage.getItem("email")) {
                                return <></>
                            }
                            return <div key={user._id} className="flex justify-evenly m-2 p-4 even:bg-blue-50">
                                <div className="flex w-full justify-between items-center">
                                    <h1>{user.name}</h1>
                                    <div>
                                        <Link to={`/send?to=${user.email}`}>
                                            <Button text="Send Money" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        })}
                    </>
            }
        </div >



    )

}


export default Users
