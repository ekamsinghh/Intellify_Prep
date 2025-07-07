import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import momemt from 'moment';
import {AnimatePresence, motion } from 'framer-motion'
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import RoleInfoHeader from './components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';
import AIResponsePreview from './components/AIResponsePreview';
import Drawer from '../../components/Drawer';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';

const InterviewPrep = () => {
  const session_req = useParams();//this hook helps to access url params
  const sessionId = session_req.id;

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try{
      const response= await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

      if(response.data && response.data.data){
        setSessionData(response.data.data);
      }
    }
    catch(err){
      console.error("Error: ",err);
    }
  }

  const generateConceptExplanation = async (question) => {
    try{
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION,{question});

      if(response.data.data){
        setExplanation(response.data.data);
      }
    }
    catch(error){
      setExplanation(null);
      setErrorMsg("Failed to generate explanation, try again later!!");
    }
    finally{
      setIsLoading(false);
    }
  }

  const togglePin = async (questionId) => {
    try{
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
      
      console.log(response);
      if(response.data && response.data.data){
        // toast.success("Question Pinned");
        fetchSessionDetailsById();
      }
    }
    catch(error){
      console.error("Error: ",error);
    }
  }

  const uploadMoreQuestions = async () => {
    try{
      setIsUpdateLoader(true);

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
        role: sessionData?.role,
        experience: sessionData?.experience,
        topics: sessionData?.topics,
        numberOfQuestions: 10
      });

      if(response.data.data){

        const response_session_upload = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION,{
          sessionId: sessionId,
          questions: response.data.data,
        });

        
        if(response_session_upload.data.data){
          toast.success("Added More Questions!!");
          fetchSessionDetailsById();
        }
      }

    }
    catch(error){
      if(error.response && error.response.data.message){
        toast.error(error.response.data.message);
        setErrorMsg(error.response.data.message);
      }
      else{
        toast.error("Something went wrong");
      }
    }
    finally{
      setIsUpdateLoader(false);
    }
  }

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    //it will execute on unmounting
    return () => {};// if you return a function from the useEffect hook, it is called CLEANUP FUNCTION
  },[]);
  return (
    <DashboardLayout>
      <RoleInfoHeader
      role={sessionData?.role || ""}
      topics={sessionData?.topics || ""}
      experience={sessionData?.experience || "-"}
      questions={sessionData?.questions?.length || "-"}
      description={sessionData?.description || ""}
      lastUpdated={
        sessionData?.updatedAt
        ? momemt(sessionData.updatedAt).format("Do MMMM YYYY") : ""
      }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold color-back">Interview Questions</h2>

        <div className="grid grid-cols-12 ga-4 mt-5 mb-10">
          <div 
          className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7": "md-col-span-8"}`}>
            <AnimatePresence>
              {sessionData?.questions?.map((data,index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{opacity: 0, y: -20}}
                    animate={{ opacity: 1, y: 0}}
                    exit={{ opacity: 0, scale:0.95 }}
                    transition={{
                      duration: 0.4,
                      type:"spring",
                      stiffness: 100,
                      delay: index*0.1,
                      damping: 15
                    }}
                    layout// this is the key prop that animates position changes
                    layoutId={`question-${data._id || index}`}
                  >
                    <>
                      <QuestionCard
                      question={data.question}
                      answer={data.answer}
                      onLearnMore={() => generateConceptExplanation(data.question)}
                      isPinned={data?.isPinned}
                      onTogglePin={() => togglePin(data._id)}
                      />
                    

                    {!isLoading && sessionData?.questions?.length == index +1 && (
                      <div className="flex justify-center items-center mt-5">
                        {isUpdateLoader ? (
                          <button 
                          className=" w-38 h-11 relative flex items-cenyter gap-3 text-base text-white bg-black font-medium px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                          disabled={isLoading || isUpdateLoader}
                          onClick={uploadMoreQuestions}
                          >
                            <SpinnerLoader />
                          </button>
                        ):(
                          <button 
                          className="w-38 h-11 relative flex items-cenyter gap-3 text-lg text-white bg-black font-medium px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                          disabled={isLoading || isUpdateLoader}
                          onClick={uploadMoreQuestions}
                          >
                            <LuListCollapse className="scale-120 mt-1" />
                            Load More
                          </button>
                        ) }
                      </div>
                    )}
                    </>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="" />
                {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader/>}
            {!isLoading && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep;