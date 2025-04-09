import axios from "axios";
const BASEURL = `http://localhost:9001`


export const userAuthRegister = async (payload: any) => {
    const response = await axios.post(`${BASEURL}/api/register`, payload);
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