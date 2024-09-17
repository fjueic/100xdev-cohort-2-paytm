import { useState, useEffect } from 'react';
import axios from 'axios';
function getContrastYIQ(hexColor) {
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);
    let yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#FFFFFF';
}
function charToHue(char) {
    return char.charCodeAt(0) % 256;
}
function Icon({ userId }) {
    let [name, setName] = useState("");
    let range = 256 * 256 * 256;
    let color = charToHue(userId[0]) * 256 * 256;
    let hexColor = `#${color}`;

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token === null) {
            Location.href = "/signin";
            return;
        }
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${userId}`, {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then((res) => {
            if (res.data.user.length !== 1) {
                Location.href = "/dashboard";
                return;
            }
            setName(res.data.user[0].name)
        }).catch((err) => {
            console.log(err)
        })

    }, [userId])

    let contrastColor = getContrastYIQ(hexColor);
    return (
        <div className="flex w-full font-medium text-left px-1 py-2 ">
            <div style={{
                backgroundColor: hexColor,
                color: contrastColor,
                borderRadius: "50%",
                aspectRatio: "1",
            }
            } className="bg-red-800 flex justify-center text-center rounded p-2 items-center">
                {(name ? name[0] : userId[0]).toUpperCase()}
            </div>
            <div className="px-2 py-1 font-bold ">
                {name}
            </div>

        </div>

    )
}


export default Icon;
