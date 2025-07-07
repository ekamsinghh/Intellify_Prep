import React, { useState, useEffect } from 'react'
import { LuPlus, LuSparkles } from 'react-icons/lu'
import { CARD_BG } from '../../utils/data';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from "moment";
import SummaryCard from '../../components/Cards/SummaryCard';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../components/DeleteAlertContent';

const Dashboard= () => {

    const navigate = useNavigate();

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        open:false,
        data: null
    });

    const fetchAllSessiions = async () => {
        try{
            const response= await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
            setSessions(response.data.data);
        }
        catch(err){
            console.error("Error fetching sessions: ", err);
        }
        
    };

    const deleteSession = async (sessionData) => {
        try{
            await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData._id));
            toast.success("Session Deleted Successfully");
            setOpenDeleteAlert({
                open:false,
                data: null
            });
            fetchAllSessiions();
        }
        catch(error){
            console.error("Error deleting the session data: ",error);
        }
    };

    useEffect(()=>{
        fetchAllSessiions();
    },[]);
    return(
        <DashboardLayout>
            <div className="h-[15vh] flex flex-col justify-center items-center">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                    <LuSparkles className="w-6 h-6 text-indigo-500 animate-bounce" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
                    Your Sessions
                    </span>
                </h2>
                <p className="text-base text-gray-500 mt-1">Review your journey and keep improving 🚀</p>
            </div>
            <div className="container mx-auto pt-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-15 pt-1 pb-6 px-4 md:px-0">
                    {sessions.map((data,index)=>{
                        return <SummaryCard
                        key={data?._id}// it is a react string attribute that helps react to identify each element and to log about which value has been updated or modified while traversing a list type element
                        colors={CARD_BG[index%CARD_BG.length]}
                        role={data?.role || ""}
                        experience={data?.experience || "-"}
                        topics={data?.topics || ""}
                        description={data?.description}
                        questions={data?.questions || "-"}
                        lastUpdated={
                            data?.updatedAt?
                            // moment is a library for working with date and time
                            moment(data.updatedAt).format("Do MMM YYYY"): ""// "Do" means date with ordinal like 1st,2nd etc. "MMM" means shorthand for month name and "YYYY" means full year
                        }
                        onSelect={() => navigate(`/interviewprep/${data?._id}`)}
                        onDelete={()=>setOpenDeleteAlert({
                            open: true,
                            data: data
                        })}
                        >
                        </SummaryCard>
                    })}
                </div>

                <button
                className="cursor-pointer h-12 md:h-12 flex items-center justify:center rounded-full gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 hover:bg-black hover-text-white transition-colors cursor-poiter hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right:20"
                onClick={()=>setOpenCreateModal(true)}
                >
                    <LuPlus className="text-2xl text-white"/>
                    Add New
                </button>
            </div>

            <Modal
            isOpen={openCreateModal}
            onClose={()=>setOpenCreateModal(false)}
            title="Create Session"
            hideHeader
            >
                <div>
                    <CreateSessionForm/>
                </div>
            </Modal>

            <Modal
            isOpen={openDeleteAlert.open}
            onClose={()=>setOpenDeleteAlert({
                open: false,
                data: null
            })}
            title= "Delete Alert"
            cls="border-2 border-red-500"
            >
                <div className="w-[30vw]">
                    <DeleteAlertContent
                    content="Are you sure you want to delete this session?"
                    onDelete={() => deleteSession(openDeleteAlert.data)}
                    />
                </div>
            </Modal>
        </DashboardLayout>
    )
}

export default Dashboard;