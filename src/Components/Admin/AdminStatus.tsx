"use client"
import React from 'react'
import Graph from './Graph'
import { AdminWrap } from '@/HOC/AdminWrap'

const AdminStatus = () => {
  return (
    <div className="row">
      <div className="col-6 mx-auto pt-5 mt-5">
    <Graph/>
    </div>
    </div>
  )
}

export default AdminWrap(AdminStatus)