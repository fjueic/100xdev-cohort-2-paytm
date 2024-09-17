import { useAtom } from 'jotai';
import counter from './state/counter.js';
import { Routes, Route } from "react-router-dom"
import AppLayout from './components/AppLayout.jsx'
import Signin from './components/Signin.jsx'
import Signup from './components/Signup.jsx'
import Send from './components/Send.jsx'
import Dashboard from './components/Dashboard.jsx'
import Home from './components/Home.jsx'


function App() {
    let [cnt, setcnt] = useAtom(counter)

    return (
        <>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home/>} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="send" element={<Send />} />
                    <Route path="*" element={<div>no page</div>} />
                </Route>
            </Routes>
        </>
    )
}

export default App
