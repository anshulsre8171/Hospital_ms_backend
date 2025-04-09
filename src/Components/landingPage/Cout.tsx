"use client"
import React from 'react'
import "bootstrap/dist/js/bootstrap.bundle.js"
import { FaUserDoctor } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { IoIosGlobe } from "react-icons/io";
const Cout = () => {
  return (
    <>
     <div className="row mt-5 py-4">
        <div className="col-md-10 mx-auto">
        <div className="row" >
        <div className="col-lg-3 p-0 col-md-6 col-sm-6">
          <div className='personal-care'>
            <div className="ic">
              <FaUserDoctor />
            </div>
            <div className='overlay'>
              <span>58</span>K
              <p className=''>Happy People</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 p-0 col-md-6 col-sm-6 bg-warning">
        <div className='personal-care'>
            <div className="ic">
              <FaFlag />
            </div>
            <div className='overlay'>
              <span>700</span>+
              <p className=''>Surgery Comepleted</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 p-0 col-md-6 col-sm-6 bg-info">
        <div className='personal-care'>
            <div className="ic">
              <SlBadge />
            </div>
            <div className='overlay'>
              <span>40</span>+
              <p className=''>Expert Doctors</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 p-0 col-md-6 col-sm-6 bg-warning">
        <div className='personal-care'>
            <div className="ic">
              <IoIosGlobe />
            </div>
            <div className='overlay'>
              <span>20</span>+
              <p className=''>Worldwide Branch</p>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div> 
    </>
  )
}

export default Cout
