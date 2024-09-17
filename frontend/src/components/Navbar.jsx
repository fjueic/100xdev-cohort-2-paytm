import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button"
function Navbar() {
    let [user, setUser] = useState(null)
    useEffect(() => {
        let token = localStorage.getItem("token");
        let email = localStorage.getItem("email");
        if (token === null) {
            Location.href = "/signin";
            return;
        }
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${email}`, {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then((res) => {
            setUser(res.data.user[0])
        }).catch((err) => {
            console.log(err)
        })

    }, [])
    return (
        <div className="bg-blue-100 h-12 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-500 ml-4">E-Wallet</div>
            <div className="flex justify-evenly items-center p-4">
                {user ? <>
                    <div className="font-bold  mr-4 text-lg 

                        ">
                        Hi, {user.name}
                    </div>
                    <div className="font-bold  mr-4 text-lg hover:text-blue-500" onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("email");
                        window.location.href = "/signin"
                    }}
                    >
                        Sign out
                    </div>
                </>

                    : <>
                        <a href="/signup" className="text-blue-500">Sign up</a>
                        <a href="/signin" className="text-blue-500">Sign in</a>
                    </>}
            </div>

        </div>

    )
}

export default Navbar
