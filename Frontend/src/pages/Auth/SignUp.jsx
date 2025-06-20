import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';

const SignUp= ({setCurrentPage}) => {

    const[profilePic,setProfilePic]=useState(null);
    const[fullName,setFullName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [error,setError]= useState(null);

    const navigate= useNavigate();

    //handling Signup event
    const handle = async (e) => {
        e.preventDefault();

        let profileImageUrl="";

        if(!fullName || !email || !password){
            setError("All fields are required");
            return;
        }
        
        if(!validateEmail(email)){
            setError("Please enter a valid email address");
            return;
        }

        setError(null);

        //API Handling
        try{

        }
        catch(err){
            if(err.response && err.response.data.message){
                setError(err.response.data.message);
            }
            else{
                setError("Something went wrong. PLease try again.")
            }
        }
    };

    return(
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-black">Create an Account</h3>
            <p className="text-md text-slate-700 mt-[5px] mb-6">
                join us today by entering your details below.
            </p>

            
            <form onSubmit={handle}>

                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                    <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    label="Full Name"
                    placeholder="John Doe"
                    type="text"
                    />

                    <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email Address"
                    placeholder="emily@example.com"
                    type="email"
                    />

                    <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    placeholder="Min 8 characters"
                    type="password"
                    />
                </div>

                {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                
                <button type="submit" className="btn-primary">SIGN UP</button>

                <p className="text-[15px] text-slate-800 mt-3">
                    Already have an account?{" "}
                    <span className="text-[#f07a03] cursor-pointer underline" onClick={() => setCurrentPage("login")}>Login</span>
                </p>
            </form>

        </div>
    )
}

export default SignUp