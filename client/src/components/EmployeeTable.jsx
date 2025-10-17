"use client";

import React from 'react';
import Link from 'next/link';


const EmployeeTable = ({ employees }) => {
    return (

        <table className='w-full border-b-foreground rouded-md text-center bg-teal-50 text-amber-950 '>
            <thead className='sticky top-0 bg-gray-100 text-sm md:text-2xl'>
                <tr className=' uppercase text-center'>
                    <th>Name </th>
                    <th>Position </th>
                    <th>Details </th>
                </tr>
            </thead>
            <tbody >
                {employees.map((emp) => (
                    <tr className='  hover:bg-teal-100 text-sm md:text-xl lg:text-xl capitalize ' key={emp.id}>
                        <td>{emp.name}</td>
                        <td>{emp.position}</td>
                        <td >
                            <button className=' rounded-lg bg-blue-500 text-white border px-1'>
                            <Link href={`/employee/${emp.id}`}> Details</Link>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default EmployeeTable