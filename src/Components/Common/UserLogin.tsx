"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { userAuthLogin } from '@/services';
import { swalFire } from '@/helpers/SwalFire';
import { useRouter } from 'next/navigation';
import {login} from '@/Redux/slices/authSlice';
import { useDispatch} from 'react-redux';
const schema = yup
  .object()
  .shape({
    userType: yup.string().oneOf(["admin", "doctor", "patient"], "Invalid User type").required("User type is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
  })
const UserLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const routers = useRouter()
const dispatch=useDispatch()
  const LoginFunction = async (data: any) => {
    const res = await userAuthLogin(data)
    //console.log(res);

    if (res?.code == 200) {
      swalFire("Auth", res.message, "success")
      dispatch(login(res?.data))
      if (res?.data.profile === 'Admin') {
        // Admin dashboard
        routers.push('./Dashboard/admin');
      } else if (res?.data.profile === 'Doctor') {
        // doctor dashboard
        routers.push('./Dashboard/doctor');
      } else {
        // Agar role kuch aur ho, default redirect (optional)
        routers.push('./Dashboard/patient/dashpage');
      }
    } else {
      swalFire("Authentication", res.message, "error")
    }
  }
  return (
    <>
      <div className="row login-row px-3 my-bg-color1">
        <div className="col-md-5 mx-auto my-bg-color2 text-light my-5 rounded-3  p-5">
          <h2 className='my-color3 mb-4 fw-bold text-center'>Login</h2>
          <form onSubmit={handleSubmit((d) => LoginFunction(d))}>

            <div className='mb-4'>
              <select {...register("userType")} className='form-select myform-select mb-4 text-light mt-1 rounded-0 ps-0' >

                <option className='t' value="admin" >Admin</option>
                <option className='t' value="doctor">Doctor</option>
                <option className='t' value="patient" selected>Patient </option>
              </select>
              {errors.userType && <div className="text-danger fw-bold">{errors.userType?.message}</div>}

            </div>
            <div className='mb-4'>
              <input {...register("email")} className='myform-control form-control ps-0 text-light rounded-0 mt-1' placeholder='Enter your email' type="text" id="email" />
              {errors.email && <div className="text-danger fw-bold ">{errors.email?.message}</div>}
            </div>

            <div className='mb-4'>
              <input {...register("password")} className='myform-control form-control ps-0 text-light rounded-0 mt-1' placeholder='Enter your password' type="password" id="password" />
              {errors.password && <div className="text-danger fw-bold ">{errors.password?.message}</div>}
            </div>
            <div className="forget-reset-wrap d-flex justify-content-between ">
              <div className="forget-div text-start">
                <Link href="./forget-password"> Forget Password!</Link>
              </div>
              <div className="reset-div text-end">
                <Link href="./reset-password">Reset Password!</Link>
              </div>
            </div>
            <div className="reset-div">
                <p>If you have not account? <Link href="./register"> Click Here</Link></p>
              </div>
            <input type="submit" value="Login" className='w-100 mx-auto d-block text-light my-btn-hover1 btn mt-4 btn my-bg-color1' />
          </form>
        </div>
      </div>

    </>
  )
}

export default UserLogin
