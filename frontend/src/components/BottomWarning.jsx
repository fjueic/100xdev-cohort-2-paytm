import { Link } from 'react-router-dom'
function BottomWarning({ text, linkText, link }) {
    return (
        <div className="flex justify-center items-center w-full mt-2">
            <p>{text} <Link to={link} className="text-blue-500">{linkText}</Link></p>
        </div>


    )
}

export default BottomWarning
