import SubHeading from './SubHeading.jsx'
import Input from './Input.jsx'
import Button from './Button.jsx'
import Heading from './Heading.jsx'
import BottomWarning from './BottomWarning.jsx'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
let Signin = () => {
    let [param, setParam] = useSearchParams();
    let [email, setEmail] = useState(param.get("email") || "");
    let [password, setPassword] = useState("");
    useEffect(() => {
        setParam({ email })
    }, [email])
    return (
        <div className="flex justify-center items-center  flex-1 h-max w-auto bg-gray-200">
            <div className="flex flex-col items-center justify-start h-auto rounded-lg bg-white p-4 min-w-52 ">

                <Heading text="Sign in" />
                <SubHeading text="Credentials" />
                <Input value={email} onchange={(e) => { setEmail(e.target.value) }} name="Email" type="email" placeHolder="user@domain" />
                <Input onchange={(e) => { setPassword(e.target.value) }} name="Password" type="password" placeHolder="Password" />
                <Button action={(e) => {
                    e.preventDefault();
                    console.log(email, password)
                    axios.post("http://localhost:3000/api/v1/signin", {
                        email, password
                    }).then((res) => {
                        console.log(res)
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("email", email);
                        window.location.href = "/"
                    }).catch((err) => {
                        console.log(err)
                        if (err.response.status === 401) {
                            alert("Invalid email or password")
                        }
                    })
                }} text="Sign in" />
                <BottomWarning text="Don't have an account?" linkText="Sign up" link="/signup" />
            </div>
        </div>
    )
}
export default Signin;
