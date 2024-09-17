function InputText({ onchange, value, reference, step, type, name, placeHolder }) {
    return (
        <div className="w-full">
            {
                name ?
                    <div className="font-medium text-left px-1 py-2">
                        {name}
                    </div> : <></>
            }
            <input
                ref={reference}
                step={step ? step : 1}
                className="w-full px-2 py-1 border rounded border-slate-200"
                type={type ? type : "text"}
                placeholder={placeHolder ? placeHolder : ""}
                value={value}
                onChange={onchange}
            ></input>


        </div>
    )

}

export default InputText;
