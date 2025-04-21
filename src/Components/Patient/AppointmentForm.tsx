"use client";
import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { swalFire } from "@/helpers/SwalFire";
import { PatientWrap } from "@/HOC/PatientWrap";
import { AppointmentBookingGen, getDepartmentListData, getdocdaytimeBydocIdService, getdoctByDepartmentIDService, getDoctorShedule } from "@/services";
import { useRouter } from "next/navigation";
import { userSession } from "@/helpers/userSession";

const schema = yup
  .object({
    patientId: yup.string().required(),
    gender:yup.string().required(),
    contact:yup.string().required(),
    departmentId: yup.string().required(),
    doctorId: yup.string().required(),
    disease: yup.string().required(),
    payment: yup.string().required(),
    fees: yup.string().required(),
    day:yup.string().required("day is required"),
    time:yup.string().required("time slot is required"),
  })

  const AppointmentForm = () => {

  const router = useRouter()
  const userData = userSession();
  //console.log(userData);

  const [departmentarr, setDepartmentArr] = useState([]);
  const [docterArr, setDoctorArr] = useState([])
  const [selectedDay, setSelectedDay] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedayTime, setSelectedayTime] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
 //console.log(selectedDay);

  const [slecteddepId, setSelectedDepartmentId] = useState(null)
  const [slecteddocId, setSelectedDoctortId] = useState(null)

  const { register, handleSubmit,watch, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  const fetchDept = async () => {
    const res = await getDepartmentListData();
    setDepartmentArr(res?.data)
  }

  const fetchDoctorByDeptId = async () => {
    const res = await getdoctByDepartmentIDService(slecteddepId, userData?.jwtToken)
    if(res.error==true){
      router.push('/login')
    }else{
    setDoctorArr(res?.data)}
  }   
   
  const fetchDoctorDayTimeByDocId =async()=>{
    const res=await getdocdaytimeBydocIdService(slecteddocId,userData?.jwtToken)
    //console.log(res.data,"doctorss");
    //console.log(res?.data[0].fees,"fessssss");
    setSelectedDay(res?.data[0]?.availableDays)
    setSelectedTime(res?.data[0]?.availableTimes)
    setSelectedFees(res?.data[0]?.fees) 
  }

  useEffect(() => {
 // setValue('patientId', userData?.id)
    setValue('gender', userData?.gender)
    setValue('contact', userData?.contact)
    fetchDept()
  }, [])

  useEffect(() => {
    if (slecteddepId) {
      fetchDoctorByDeptId()
    }
  }, [slecteddepId])

  useEffect(()=>{
    if(slecteddocId){
      fetchDoctorDayTimeByDocId()
      checkDoctorShedule()
   }
  },[slecteddocId])

const [values, setBookedTimes] = useState<string[]>([]);
const Days:any = watch("day"); // assuming you're using react-hook-form

const checkDoctorShedule=async()=>{
  const res=await getDoctorShedule(slecteddocId,userData?.jwtToken)
  setSelectedayTime(res?.data)
} 

useEffect(() => {
  if (Days && selectedayTime?.length) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of day

    const times = selectedayTime.filter((item: any) =>{
      const appointmentDate = new Date(item.appointment_createdAt);
      //console.log(item.appointment_createdAt);
       appointmentDate.setHours(0, 0, 0, 0);
      return (
        item.appointment_day === Days &&
        appointmentDate >= today // only future or today’s bookings
      );
      })
      .map((item: any) => item.appointment_time);
    setBookedTimes(times); // only times booked for the selected day   
  }
}, [Days, selectedayTime]);

   const handleDepDropChange = (e: any) => {
    setSelectedDepartmentId(e?.target?.value)
    setValue('doctorId', '');
    setValue('day', '');
    setValue('time', '');
  }
  const handleDocDropChange = (e: any) => {
    setSelectedDoctortId(e?.target?.value)
    setValue('day', '');
    setValue('time', '');
  }

  const AppointmentFunction = async (da: any) => {  
    const res: any = await AppointmentBookingGen(da, userData?.jwtToken)
   // console.log(res);
   await alert("Your Appointment is Temprory Booked, Booking complete After pay bill")
    if (res?.code == 201) {
      swalFire("Appointment ", res.message, "success")
    
    } else if (res.code == 401) {
      swalFire("Appointment ", res.message, "error")
      router.push('/login')
    }
    else {
      swalFire("Appointment", res.message, "error")
    }
  }
  return (
      <div className="container-fluid p-4" style={{ background: "#1e1e1e", minHeight: "100vh", color: "white" }}>
        <div className="row">
          {/* Left Section */}
          <div className="col-md-8">
            <h1 className="text-center mt-2 mb-3">Appointment form</h1>
            <form onSubmit={handleSubmit((da) => AppointmentFunction(da))}>
              <div className="row bg-dark ">
                <div className="col-6 py-3">
                  <input {...register("patientId")} type="text" value={userData?.id} placeholder="hh" className="myform-control form-control ps-0 text-light rounded-0 mt-2" />
                  {errors.patientId && <div className="text-danger fw-bold ">{errors.patientId?.message}</div>}

                  <input {...register("gender")} type="text" value={userData?.gender} className="myform-control form-control ps-0 text-light rounded-0 mt-2" />
                 {errors.gender&&<p className="text-danger fw-bold ">{errors.gender?.message}</p>}

                  <input type="text" {...register("contact")} value={userData?.contact} className="myform-control form-control ps-0 text-light rounded-0 mt-2" />
                  {errors.contact&&<p className="text-danger fw-bold ">{errors.contact?.message}</p>}
                
                  <input type="text" {...register("disease")} placeholder="enter your disease" className="myform-control form-control ps-0 text-light rounded-0 mt-2" />
                 {errors.disease&&<p className="text-danger fw-bold ">{errors.disease.message}</p>}
                 
                  <input type="text" placeholder="enter Days problem feel " className="myform-control form-control ps-0 text-light rounded-0 mt-2" />
                  <input type="text" placeholder="enter your last visiting place" className="myform-control form-control ps-0 text-light rounded-0 mt-2" />

                </div>
                <div className="col-6 py-3">
                  <select {...register("departmentId")} className="myform-control form-control ps-0 text-light rounded-0 mt-2 "onChange={(e:any)=>{handleDepDropChange(e)}}>
                    <option  className="t" value="" disabled selected>Select Department</option>
                  {departmentarr.map((item:any,index:any)=>{
                    //console.log(item.id);
                    return(
                    <option  className="t" key={index} value={item.id}>{item.name}</option>
                    )})}
                  </select>
                  {errors.departmentId&&<p className="text-danger fw-bold ">{errors.departmentId.message}</p>}

                  <select {...register("doctorId")} className="myform-control form-control ps-0 text-light rounded-0 mt-2" onChange={(e:any)=>{handleDocDropChange(e)}}>
                    <option className="t" disabled selected value="">Select Doctor</option>
                 {docterArr.map((item:any,index:any)=>{
                 // console.log(item,"FFFFFFFFF");
                  return(<>
                  <option className="t"  key={index} value={item.id}>{item.name}</option>
                  </>)
                 })}
                  </select>
                  {errors.doctorId&&<p className="text-danger fw-bold ">{errors.doctorId?.message}</p>}


                 <select {...register("day")} className="myform-control form-control ps-0 text-light rounded-0 mt-2" >
                    <option className="t" value="" disabled selected >Select Day</option>
                    {
                   selectedDay.map((item:any,index:any)=>{
                    return(<>
                    <option className="t" key={index} value={item}>{item} </option>
                        </>)
                      })
                    }
                  </select>
                  {errors.day&&<p className="text-danger fw-bold ">{errors.day?.message}</p>} 

                   <select {...register("time")} className="myform-control form-control ps-0 text-light rounded-0 mt-2" >
                    <option className="t" value="" disabled selected>Select Time</option>
                    {
                      selectedTime.map((item:any,index:any)=>{
                        return(<>
                    <option className="t" disabled={values.includes(item)} key={index} value={item}>{item} </option>
                        </>)
                      })
                    }
                  </select>
                  {errors.time&&<p className="text-danger fw-bold ">{errors.time?.message}</p>} 

                  <select {...register("fees")} className="myform-control form-control ps-0 text-light rounded-0 mt-2">
                    <option className="t" value="" disabled selected>Select Fees</option>
                    <optgroup className="t" label="General Duty">
                    <option className="t" >{selectedFees}</option>
                    </optgroup>
                    <optgroup className="t" label="Emergency fees">
                      <option className="t">800</option>
                    </optgroup>
                  </select>
                  {errors.fees&&<p className="text-danger fw-bold ">{errors.fees?.message}</p>}

                  <select {...register("payment")} className="myform-control form-control ps-0 text-light rounded-0 mt-2">
                    <option className="t" value="" disabled selected>Select Payment Mode</option>
                    <option className="t">online </option>
                    <option className="t">Cash</option>
                  </select>
                  {errors.payment&&<p className="text-danger fw-bold ">{errors.payment?.message}</p>} 

                </div>

              </div>
              <div className="row">
                <div className="col-10 mx-auto my-3">
                <input type="submit" className="w-100 mx-auto d-block text-light my-btn-hover1 btn mt-4 btn my-bg-color1" />

                </div>
              </div>

            </form>
          </div>

          {/* Right Section */}
          <div className="col-md-4">
            <div className="card p-3 mb-4 text-white" style={{ background: "linear-gradient(to right, #4a6cb3, #1f3c88)", borderRadius: "15px", border: "none" }}>
              <h5>Medical Bill</h5>
              <h6>Total ammount</h6>
              <h2>$3,000</h2>
              <p>Discharge Date: <strong>March 31th 2025  </strong></p>
              <p>Status - <strong>positive</strong></p>
            </div>

            {/* Card Info */}
            <div className="card p-3 mb-4" style={{ background: "#2b2b2b", borderRadius: "15px", border: "none", color: "white" }}>
              <h5 className="text-white">Patient Info</h5>
              <p className="mb-1">Patient Appointment Id: <strong>1242 644 8765</strong></p>
              <p className="mb-1">Name: <strong>Olivia</strong></p>
              {/* <p className="mb-1">Status: <span className="text-success fw-bold">Active</span></p> */}
              <p className="mb-1">Fees: <strong>$3,000</strong></p>
              <p className="mb-1">Appointment Date: <strong>March 24th 2025</strong></p>
              <p className="mb-1">Appointment Valid Date: <strong>March 30th 2025</strong></p>
              <p className="mb-1">Doctor Name: <strong>Mattor Card</strong></p>
              <p className="mb-1">Type: <strong>Cold</strong></p>
            </div>

            {/* Add New Card Button */}
            <button className="btn btn-primary w-100" onClick={() => { alert("bill pay") }}>Pay Bills</button>
          </div>
        </div>
      </div>

    
  );
};

export default PatientWrap(AppointmentForm);

