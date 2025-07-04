import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (image) => {
    const formData = new FormData();

    //Adding image to the form data
    formData.append("image", image);
    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    }
    catch(err){
        console.error('Error Uploading the image: ', err);
        throw err;//* throwing error for handling
    }
};

export default uploadImage;