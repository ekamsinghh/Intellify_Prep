import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

import profile from "../../utils/profile.png";
const ProfileInfoCard = ({
    cls,
    logout_class
}) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        navigate('/');
    }
  return (
    user &&(<div className="flex items-center">
        <img 
            src= {user.profileImage || profile}
            alt=""
            className="w-11 h-11 bg-gray-300 rounded-full mr-3"
        />
        <div>
            <div className={`text-[15px]  font-bold leading-3 ${cls? cls:"text-black"}`}>
                {user.name|| ""}
            </div>
            <button
            className={`${logout_class? logout_class:"text-amber-600"} text-sm font-semibold cursor-pointer hover:underline`}

            onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    </div>)
    )
}

export default ProfileInfoCard;