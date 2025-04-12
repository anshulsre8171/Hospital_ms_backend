"use client";
import { swalFire } from "@/helpers/SwalFire";
import { userSession } from "@/helpers/userSession";
import { AdminWrap } from "@/HOC/AdminWrap";
import { adminAddDepartmentService, getDepartmentListData } from "@/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";


const schema = yup.object().shape({
  name: yup.string().required().min(3).max(35),
});

const AdminDepartment = () => {
  const router=useRouter()
  const {register,handleSubmit,formState: { errors }} = useForm({
    resolver: yupResolver(schema)});

  const UserData = userSession();
  const token = UserData?.jwtToken

  const submit = async (data: any) => {
     //console.log(data);
    const res = await adminAddDepartmentService(data,token) 
    if(res?.code==201){
      swalFire("Action",res?.message,"success")
    }else if(res?.code ==401){
      router.push('/login')
    }
    else{
      swalFire("Action",res?.message,"error")
    }
  };

  const [get,setGet]=useState([])
  
      const getDepartmentList=async ()=>{
        const res=await getDepartmentListData()
        //console.log(res.data,"ggggggaag");
        setGet(res?.data)
          }
    
    useEffect(()=>{
      getDepartmentList()
    },[getDepartmentList])

  return (
    <>
      <div className="row bg-light py-5" >
        <div className="col-sm-6 mx-auto mt-5 p-5 rounded-3 department">
        <h2 className="mb-3 text-center" style={{color:" #1A237E"}}>Department Management</h2>
     
            <form onSubmit={handleSubmit(submit)} className="d-flex align-items-end">
              <input {...register("name")} className="form-control me-2 "type="text" placeholder="Enter department Name" aria-label="Add"/>
              <button className="btn btnhover text-light " style={{background:" #1A237E"}} type="submit">
              Add Department
              </button>
              <br />
            </form>
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
      </div>
      <div className="row bg-light py-3">
          <div className="col-sm-6 p-3 department mx-auto ">
          <h2 className="my-3 text-center" style={{color:" #1A237E"}}> Department List</h2>
          <table className="table" >
            <thead className="thead">
          <tr >
            <th className="thead text-light">#</th>
            <th className="thead text-light">Department Name</th>
            <th className="thead text-light">Actions</th>
          </tr>
        </thead>
        <tbody >
          {
            get.map((item:any,index:any)=>{
              return(<>
            <tr>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>
              <button className="btn btn-outline-danger me-2">Del</button>
              <button className="btn btn-outline-info">Edit</button>
            </td>
          </tr>
              </>)
            })
          }
        </tbody>
      
          </table>
          </div>
        </div>
    </>
  );
};

export default AdminWrap(AdminDepartment);
