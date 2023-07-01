import { Checkbox } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { MessageBoxModal, OTPModal } from "./Modal";
import WaitingLocker from "./WaitingLocker";
import { OTPStore } from "@/store/store";
import { validateEmail } from "@/types/utils";
interface MyObject {
    [key: string]: string | number;
}

export const queryBuilder = (data: MyObject) => Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&')
const genCode = () => {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return randomNumber.toString();
}
const SignUp = ({ openState: { open, setOpen }, setMsg }: { openState: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }, setMsg: React.Dispatch<React.SetStateAction<string>> }) => {
    const { otpState, dispatchOtpState } = useContext(OTPStore);
    const [checked, setChecked] = useState(false);
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatchOtpState({ type: 'CHANGE_FORMDATA', payload: { value: { ...otpState.formData, [name]: value } } })//({ ...prev, [name]: value })
    }

    //!  Validate
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validName, setValidName] = useState(true);
    const handleClick = async () => {
        const { email, name, password, given_name, family_name } = otpState.formData;
        setValidEmail(validateEmail(email));
        setValidPassword(password.trim() !== "");
        const nameCheck = [name,given_name,family_name].every(n=>n.trim()!=="");
        setValidName(nameCheck)
        if (!validateEmail(email)) return;
        if (password.trim() === "") return;        
        if (!nameCheck) return;
        if(email.endsWith("@gmail.com")){
            setMsg("Please use Google Sign above.");
            setOpen(true);
            return;
        }
        //!  Validate
        dispatchOtpState({ type: "SET_WAITING", payload: { value: true } })
        const { data } = await axios.get(`/api/users?email=${encodeURIComponent(email)}`);
        dispatchOtpState({ type: "SET_WAITING", payload: { value: false } })
        if (data.length > 0) {
            setMsg("Already registered user")
            setOpen(true);
        } else {
            const code = genCode()
            dispatchOtpState({ type: "SET_WAITING", payload: { value: true } })
            dispatchOtpState({ type: 'SET_OTPCODE', payload: { value: code } })
            const { data: { message: _msg } }: { data: { message: string | object } } = await axios.get(`/api/sendmail?${queryBuilder({ email: email, code: code })}`)

            dispatchOtpState({ type: "SET_WAITING", payload: { value: false } })
            if (typeof _msg === "string") {// && _msg.startsWith("250")
                dispatchOtpState({ type: "SET_WAITING", payload: { value: false } })
                dispatchOtpState({ type: "SHOW_OTPCODE", payload: { value: true } });
            } else {
                setMsg("Error occured while processing information")
                setOpen(true);
            }
        }
    }
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col">
                <div className="flex gap-0 justify-center items-center pl-10 text-[#888888] bg-[#f2f2f6] rounded-tr-md rounded-br-md overflow-hidden relative">
                    <svg className='w-4 h-4 absolute left-[14px] top-3 align-baseline inline-block stroke-current fill-none '><use href="#mail"></use></svg>
                    <input name='email' type="email" onChange={handleChange} className="w-[220px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal" placeholder="yours@example.com" />
                </div>
                {!validEmail && <h4 className="text-[12px] text-red-600">*Invalid email type. Please fill in correct type.</h4>}
            </div>
            <div className="flex flex-col">
                <div className="flex gap-0 justify-center items-center pl-10 text-[#888888] bg-[#f2f2f6] rounded-tr-md rounded-br-md overflow-hidden relative">
                    <svg className='w-4 h-4 absolute left-[14px] top-3 align-baseline inline-block stroke-current fill-none '><use href="#user"></use></svg>
                    <input name='name' onChange={handleChange} className="w-[220px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal" placeholder="your username" />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex gap-0 justify-center items-center pl-10 text-[#888888] bg-[#f2f2f6] rounded-tr-md rounded-br-md overflow-hidden relative">
                    <svg className='w-4 h-4 absolute left-[14px] top-3 align-baseline inline-block stroke-current fill-none '><use href="#lock"></use></svg>
                    <input name='password' onChange={handleChange} type="password" className="w-[220px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal" placeholder="Password" />
                </div>
                {!validPassword && <h4 className="text-[12px] text-red-600">*Please enter your password correctly.</h4>}
            </div>
            <div className="flex flex-col">
                <input name='given_name' onChange={handleChange} className="w-[260px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal" placeholder="Enter your Given name" />
            </div>
            <div className="flex flex-col">
                <input name='family_name' onChange={handleChange} className="w-[260px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal" placeholder="Enter your Family name" />
                {!validName && <h4 className="text-[12px] text-red-600">*Your name information is not valid.</h4>}
            </div>
            <div className="flex items-start">
                <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} size="small" />
                <span className="text-[12px] leading-4 text-[#888888]">I agree to IP Australia&apos;s privacy notice and terms and conditions.</span>
            </div>

            <button onClick={handleClick} disabled={!checked} className="flex transition-all ease-in-out disabled:bg-[#9b9b9b] justify-center items-center rounded-md w-[300px] bg-[#5d2067] uppercase text-white leading-[42px]">Register</button>

        </div>
    )
}
export default SignUp;