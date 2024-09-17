function Button({ action, text }) {
    return (
        <button onClick={action} type="button" className="bg-gray-900 flex justify-center text-center w-full text-white rounded px-5 py-2.5 mt-2 mb-2 ">{text}</button>
    )
}

export default Button
