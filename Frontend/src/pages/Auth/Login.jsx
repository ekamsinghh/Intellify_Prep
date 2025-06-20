import React from 'react'
import{useState} from 'react'
import{useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';

const Login = ({ setCurrentPage }) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    //Handling Login Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address");
            return;
        }

        if(!password){
            setError("Please enter a password");
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
    }
    return(
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-black">
                Welcome Back
            </h3>
            <p className="text-md text-slate-700 mt-[5px] mb-6">
                Please enter your details to log in
            </p>

            <form onSubmit={handleSubmit}>
                <Input
                  value={email}
                  type="text"
                  placeholder="emily@example.com"
                  label="Email Address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if(error) setError(null);
                }}
                />

                <Input
                  value={password}
                  type="password"
                  placeholder="Min 8 characters"
                  label="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if(error) setError(null);
                }}
                />

                {error && <p className="text-red-600 text-xs pb-2.5">{error}</p>}

                <button type="submit" className="btn-primary ">LOGIN</button>

                <p className="text-[15px] text-slate-800 mt-3">
                    Don't have an account?{" "}
                    <span
                    className="text-[#f07a03] cursor-pointer underline"
                    onClick={() => setCurrentPage("signup")}
                    >
                    Sign Up
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Login