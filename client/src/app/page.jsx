"use client";

import React, { useState } from "react";
import { ApolloProvider, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import client from "../lib/apollo-client";
import EmployeeTable from "../components/EmployeeTable";
import DepartmentDropdown from "../components/DepartmentDropdown";
import EmployeeForm from "../components/EmployeeForm";

const GET_EMPLOYEES = gql`
  query GetData {
    getAllEmployees {
      id
      name
      position
      department
    }
  }
`;

function HomeContent() {
  const { data, loading, error } = useQuery(GET_EMPLOYEES);

  const [filter, setFilter] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const department = Array.from(
    new Set(data.getAllEmployees.map((emp) => emp.department))
  );
  console.log(department);

  const employees = (data?.getAllEmployees ?? []).filter((e) =>
    filter ? e.department === filter : true
  );

  return (
<div className="space-y-6 w-11/12 lg:w-5/6 mx-auto mt-5">

  <h1 className="text-3xl md:text-4xl font-bold uppercase text-center text-gray-600 underline">
    Employee Directory
  </h1>

  <DepartmentDropdown departments={department} onSelect={setFilter} />

  <div className="flex flex-col md:flex-col lg:flex-row gap-5  lg:gap-3">
    <div  className="w-full lg:w-2/3 border rounded-md shadow-md border-b-emerald-800 p-0 overflow-x-auto max-h-[500px] overflow-y-auto">
      <EmployeeTable employees={employees} />
    </div>

    <div className="w-full lg:w-1/3 border rounded-md shadow-md p-2 self-start">
      <EmployeeForm dlist={department} />
    </div>
  </div>
</div>


  );
}

export default function HomePage() {
  return (
    <ApolloProvider client={client}>
      <HomeContent />
    </ApolloProvider>
  );
}
