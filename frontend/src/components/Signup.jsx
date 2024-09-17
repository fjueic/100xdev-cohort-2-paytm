import Heading from "./Heading.jsx"
import SubHeading from "./SubHeading.jsx"
import Input from "./Input.jsx"
import Button from "./Button.jsx"
import BottomWarning from "./BottomWarning.jsx"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

let Signup = () => {
    let [param, setParam] = useSearchParams();
    let [name, setName] = useState(param.get("name") || "");
    let [email, setEmail] = useState(param.get("email") || "");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    useEffect(() => {
        setParam({ name, email })
    }, [name, email, password, confirmPassword])



    return (
        <div className="flex justify-center items-center  flex-1 h-max w-auto bg-gray-200">
            <div className="flex flex-col items-center justify-start h-auto rounded-lg bg-white p-4 min-w-52 ">

                <Heading text="Sign up" />
                <SubHeading text="Enter your information to create a account" />
                <Input name="Name" placeHolder="Enter Your Name" onchange={(e) => { setName(e.target.value) }} value={name}
                />
                <Input name="Email" type="email" placeHolder="user@domain" onchange={(e) => { setEmail(e.target.value) }} value={email}
                />
                <Input name="Password" type="password" placeHolder="Password" onchange={(e) => { setPassword(e.target.value) }} value={password}
                />
                <Input name="Confirm Password" placeHolder="Re-type password" type="Password" onchange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword}
                />
                {password !== confirmPassword && confirmPassword !== "" ? <div className="text-red-500">Password does not match</div> : null}
                <Button action={(e) => {
                    e.preventDefault();
                    if (password !== confirmPassword) {
                        alert("Password does not match")
                        return
                    }
                    axios.post("http://localhost:3000/api/v1/signup", {
                        name, email, password
                    }).then((res) => {
                        console.log(res)
                        window.location.href = "/signin"
                    }).catch((err) => {
                        console.log(err)
                        if (err.response.status === 409) {
                            alert("Email already exists")
                        }
                    })
                }} text="Sign up" />
                <BottomWarning text="Already have an account?" linkText="Sign in" link="/signin" />


            </div>

        </div>
    )

}
export default Signup;
