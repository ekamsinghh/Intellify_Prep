import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topics: "",
        description: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (key,value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value
        }));
    };

    const handleCreateSession = async (e) => {
        e.preventDefault();

        const  { role, experience, topics, description } = formData;

        if(!role || !experience || !topics || !description){
            setError("Please fill all the required fields.");
            return;
        }

        setError("");
        setIsLoading(true);
        try{
            const response = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
                role,
                experience,
                topics,
                numberOfQuestions: 10,
            });

            const questions = response.data.data;

            const session_response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {...formData, questions});
            if(session_response.data.data._id){
                navigate(`/interviewprep/${session_response.data.data._id}`);
            }
        }
        catch(err){
            if (error.response && error.response.data.message){
                setError(error.response.data.message);
            }
            else{
                setError("Something went wrong");
            }
        }
        finally{
            setIsLoading(false);
        }
    }
  return (
    <div className="w-[90vw] md:w-[40vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-bold text-black">
            Build Up Your Session and dig deep into the Concepts
        </h3>
        <p className="text-sm text-slate-700 mt-[5px] mb-3">
            Fill out the required details to get your questions ready!
        </p>

        <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
            <Input 
            value={formData.role}
            onChange={({target}) => handleChange("role", target.value)}
            placeholder="e.g. Frontend Developer, UI/UX Designer, etc."
            label="Target Role"
            type="text"
            />

            <Input 
            value={formData.experience}
            onChange={({target}) => handleChange("experience", target.value)}
            placeholder="e.g. 1, 2, 3 etc."
            label="Years of Experience"
            type="text"
            />

            <Input 
            value={formData.topics}
            onChange={({target}) => handleChange("topics", target.value)}
            placeholder="e.g. HTML, CSS, JavaScript, etc."
            label="Topics to Focus On"
            type="text"
            />

            <Input 
            value={formData.description}
            onChange={({target}) => handleChange("description", target.value)}
            placeholder="e.g. HTML, CSS, JavaScript, etc."
            label="Description of the Role"
            type="text"
            />

            {error && <p className="text-sm text-red-600 pb-2.5">{error}</p>}
            
            <button
            type="submit"
            className="group btn-primary w-full mt-2 relative h-12"
            disabled={isLoading}
            >
              {isLoading ? <SpinnerLoader />: "Create Session"} 
            </button>
        </form>
    </div>
  )
}

export default CreateSessionForm