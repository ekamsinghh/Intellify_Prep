import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="h-18 bg-black border border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between gap-5">
            <Link to="/dashboard">
                <h2 className="  text-2xl md:text-3xl font-bold text-white leading-5 h-[22px]">
                    Intellify Prep
                </h2>
            </Link>

            <ProfileInfoCard
            cls="text-orange-500"
            logout_class="text-white" 
            />
        </div>
    </div>
  )
}

export default Navbar