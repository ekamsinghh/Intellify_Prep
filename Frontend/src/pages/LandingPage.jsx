import { useState } from 'react';

import model from "../assets/model.png"
import { APP_FEATURES } from "../utils/data.js";
import { useNavigate } from 'react-router-dom';
import {LuSparkles} from "react-icons/lu"
import { FaInstagram , FaGithub , FaLinkedin } from "react-icons/fa";

import Modal from '../components/Modal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';

const LandingPage = () => {
  const navigate= useNavigate();
  const [authModal, setAuthModal] = useState(false);
  const [currentPage,setCurrentPage]= useState("login");

  const handle = () => {

  };
  return (
    <>
      <div className="w-full min-h-full bg-[radial-gradient(circle,_#FFFCEF_0%,_#FFFCEF_100%)] -mb-45">
        <div className="min-w-full min-h-[50%] bg-linear-[#faf3da] bg-linear-to-r from-[#fff8d0] to-[#fff4ce]">
          <div className="container mx-auto px-2 py-6 pb-[200px] relative z-10">
            <header className="flex justify-between items-center">
              <div className="text-3xl font-bold  relative top-0 left-0">Intellify Prep</div>
              <button
              className="py-2.25 text-lg login bg-linear-to-r from-[#f07a03] to-[#f0861c] font-semibold text-white px-7 rounded-full border border-white cursor-pointer"
              onClick={()=> setAuthModal(true)}
              >Login</button>
            </header>
            <br/>
            <br/>
            <br/>
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
                <div className="flex items-center mb-2">
                  <div className="flex items-center gap-2 text-[13px] text-amber-600 font-bold bg-[#ffefb4] px-3 py-1 rounded-full border border-amber-300">
                    <LuSparkles/>AI Powered
                  </div>
                </div>
                <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                  Ace Interviews with <br/>
                  <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[lenght:200%_200%] font-semibold">
                    AI-Powered
                  </span>{" "}
                  Learning
                </h1>
              </div>

              <div className="w:full md:w-1/2">
                <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6 ">
                  Get unlimited access to personalized insights, role-specific questions, and organize everything your way to excel in your interviews.
                </p>
                <button className="effect bg-black text-md font-semibold text-white py-2 px-4 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                onClick={handle}
                >Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10" >
        <div>
          <section className="flex items-center justify-center -mt-30">
            <img
            src={model}
            alt="Demo_Image"
            className="w-[80vw] rounded-lg border border-amber-500"
            />
          </section>
        </div>
      </div>

      <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <section className="mt-5">
            <h2 className="text-3xl font-bold text-center mb-12 ">
              Features That Make You Shine
            </h2>
            <div className="flex flex-col items-center gap-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {APP_FEATURES.slice(0).map((feature)=> (
                  <div
                  key={feature.id}
                  className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="w-full min-h-full py-8">
        <section className="flex justify-center w-full min-h-full mb-8">
          <h2 className="text-2xl font-semibold">
            Connect With Us
          </h2>
        </section>
        <div className="icons flex justify-center items-center gap-8 mb-8">
          <a className="cursor-pointer" href="https://www.instagram.com/ekam._singh._?igsh=MWRmN3M1Mzkxc2x0YQ==" target="_blank"><FaInstagram className=""/></a>
          <a className="cursor-pointer" href="https://www.github.com/ekamsinghh" target="_blank"><FaGithub/></a>
          <a className="cursor-pointer" href="https://www.linkedin.com/in/ekamsinghh/" target="_blank"><FaLinkedin/></a>
        </div>
      </div>

      <Modal
        isOpen={authModal}
        onClose={()=> setAuthModal(false)}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  )
}

export default LandingPage