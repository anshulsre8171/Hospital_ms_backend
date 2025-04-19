import axios from "axios";
const BASEURL = `http://localhost:9001`


export const userAuthRegister = async (payload: any) => {
    console.log(payload,"jjjjjjjjjjjj");
    
    const response = await axios.post(`${BASEURL}/api/register`, payload, { headers: {
'Content-Type': 'multipart/form-data',
      }});
    return response?.data
}

export const userAuthLogin = async (payload: any) => {
    const response = await axios.post(`${BASEURL}/api/login`, payload);
    return response?.data
}
export const forgetPasswordMail=async (payload:any)=>{
    const response=await axios.post(`${BASEURL}/api/forget-password`,payload);
    return response?.data
}

export const userRestPassService=async (payload:any)=>{
    const response=await axios.post(`${BASEURL}/api/forget-password`,payload);
    return response?.data
}

export const adminAddDepartmentService = async (payload: any,token:any) => {
    const response = await axios.post(`${BASEURL}/api/admin-add-department`, payload,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response?.data
}

export const getDepartmentListData =async()=>{
    const response=await axios.get(`${BASEURL}/api/admin-get-department`)
    return response?.data
} 

export const getdoctByDepartmentIDService = async (id:any,token:any) => {
    const response = await axios.get(`${BASEURL}/api/get-doctor-by-departmentId?departmentId=${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response?.data
}

export const BookAppointmentController=async(data:any,token:any)=>{
    const response= await axios.post(`${BASEURL}/api/doctor-appointment-book`,data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response?.data
}

export const AppointmentBookingGen=async(data:any,token:any)=>{
    const response= await axios.post(`${BASEURL}/api/doctor-appointment-bookGen`,data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response?.data
}

export const getdocdaytimeBydocIdService = async (id:any,token:any) => {
    const response = await axios.get(`${BASEURL}/api/get-doctordaytime-by-doctortId?doctorId=${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });    
    return response?.data
}