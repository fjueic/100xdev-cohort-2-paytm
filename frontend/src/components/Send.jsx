import Heading from "./Heading";
import axios from "axios"
import Icon from "./Icon"
import Input from "./Input";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
let Send = () => {
    let [params, setParams] = useSearchParams();
    let [to, setTo] = useState(params.get("to") || "")
    let [amount, setAmount] = useState(parseFloat(params.get("amount") || "") / 100)
    let ref = useRef(null)
    let onchange = (e) => {
        if (e.target.value >= 0) setAmount(e.target.value)
    }
    useEffect(() => {
        let intAmount = parseInt(amount * 100);
        setParams({ to: to, amount: intAmount })
    }, [amount])

    return (
        <div className="flex justify-center items-center  flex-1 h-max w-auto bg-gray-200">
            <div className="flex flex-col items-center justify-start h-auto rounded-lg bg-white p-4 min-w-52 ">
                <Heading text="Send Money" />
                <Icon userId={to} />
                <Input
                    onchange={onchange}
                    reference={ref}
                    step={0.01}
                    name="Amount in Rs"
                    placeHolder="Enter Amount"
                    value={amount}
                    type="Number" />
                <Button action={(e) => {
                    e.preventDefault();
                    let token = localStorage.getItem("token");
                    axios.post("http://localhost:3000/api/v1/account/sendmoney", {
                        email: to,
                        amount: amount
                    }, {
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    }).then((res) => {
                        console.log(res.data)
                        alert("Money Sent")
                        window.location.href = "/dashboard"
                    }
                    ).catch((err) => {
                        console.log(err)
                    })

                }} text="Send" />
            </div>
        </div>


    )

}
export default Send;
