"use client";
import React from 'react';

const DepartmentDropdown=({departments,onSelect}) =>{
  return (
    <select className="border p-3 pl-5 rounded-md w-1/3 my-5 text-sm md:text-xl" onChange={(e)=>onSelect(e.target.value)}>
        <option value="">All Departments</option>
        {departments.map((dept)=>(
            <option key={dept} value={dept}>{dept}</option>
        ))}

    </select>
  )
}

export default DepartmentDropdown