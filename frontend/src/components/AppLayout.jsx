import { Outlet } from 'react-router-dom'
import Navbar from "./Navbar.jsx"
const AppLayout = () => {
    return (
        <div className="h-screen bg-red-50 w-screen flex flex-col">
            <Navbar />
            <Outlet />
        </div>


    )

}
export default AppLayout;
