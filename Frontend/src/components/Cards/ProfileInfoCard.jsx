import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        navigate('/');
    }
  return (
    <div className="">
        <img 
            src= {user.profileImage}
            alt=""
            className=""
        />
    </div>
  )
}

export default ProfileInfoCard