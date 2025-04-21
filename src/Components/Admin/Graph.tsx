"use client"
import { AdminWrap } from '@/HOC/AdminWrap';
import React from 'react'
import Chart from "react-apexcharts";

const state={
    options: {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: ["OPD","Neurologists","Cardiologists","Dermatologists","Allergists"	,"Ophthalmologists", "Radiologists"]
    }
  },
  series: [
    {
      name: "series-1",
      data: [3, 2, 5, 8, 1,2,6]
    }
  ]
}
const Graph = () => {
  return (
    <div className="app">
    <div className="row">
      <div className="mixed-chart">
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          width="500"
        />
      </div>
    </div>
  </div>
);
}
export default AdminWrap(Graph)