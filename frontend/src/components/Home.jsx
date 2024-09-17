import React, { useState, useEffect } from 'react'
import axios from "axios"
function Home() {
    let [balance, setBalance] = useState(0);
    let token = localStorage.getItem("token");
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((res) => {
            setBalance(res.data.balance)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className="flex justify-center items-center h-auto w-full bg-gray-200 py-10">

            <div className="flex flex-col items-center justify-start h-auto rounded-lg bg-white shadow-lg p-8 min-w-[200px] max-w-[400px]">

                <h1 className="font-bold text-4xl text-gray-800 pt-6">
                    Easy Money Transfer
                </h1>

                <h2 className="font-bold text-4xl text-gray-800 pt-4">
                    Your Balance is {balance}
                </h2>

                <button onClick={() => window.location.href = "/dashboard"}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 mt-6 rounded-lg transition ease-in-out duration-300">
                    Got to Dashboard
                </button>

            </div>

        </div>

    )

}


export default Home
