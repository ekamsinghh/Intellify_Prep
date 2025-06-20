import React, { useState } from 'react'

import { FaRegEye , FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({value,onChange,label,placeholder,type}) => {

    const [showPassword,setShowPassword]= useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

  return (
    <div className="flex flex-col mb-[15px]">
        <label className="text-[15px] text-slate-800  pb-[10px]">{label}</label>

        <div className="input-box">
            <input
            className="w-full bg-transparent outline-none"
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
            type={type== "password"? (showPassword ? "text" : "password"): type}
            />

            {type==="password" && (
                <>
                    {showPassword ? (
                        <FaRegEye
                        size={22}
                        className="text-[#fb9734] cursor-pointer"
                        onClick={() => togglePassword()}
                        />
                    ) : (
                        <FaRegEyeSlash
                        size={22}
                        className="text-black cursor-pointer"
                        onClick={() => togglePassword()}
                        />
                    )}
                </>
            )}
        </div>
    </div>
  )
}

export default Input