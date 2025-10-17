"use client";

import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $position: String!
    $department: String!
    $salary: Float!
  ) {
    addEmployee(
      name: $name
      position: $position
      department: $department
      salary: $salary
    ) {
      id
      name
    }
  }
`;

const NEW_EMPLOYEE_FRAGMENT = gql`
  fragment NewEmployee on Employee {
    id
    name
    position
    department
    salary
  }
`;


const EmployeeForm = ({ dlist }) => {
  const [form, setForm] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
  });



const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
  update(cache, { data: { addEmployee } }) {
    cache.modify({
      fields: {
        getAllEmployees(existingEmployees = []) {
          const newEmployeeRef = cache.writeFragment({
            data: addEmployee,
            fragment: NEW_EMPLOYEE_FRAGMENT,
          });
          return [...existingEmployees, newEmployeeRef];
        },
      },
    });
  },
});







  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("form data",form);
    

    if (!form.name || !form.position || !form.department || !form.salary ) {
      alert("Please fill in all fields");
      return;
    }else if(parseFloat(form.salary)>1000){
      alert("Please fill a valid salary");
      return
    }


    try {
      await addEmployee({
        variables: {
          name: form.name,
          position: form.position,
          department: form.department,
          salary: parseFloat(form.salary),
        },
      });
      alert("Employee added successfully!");
      setForm({ name: "", position: "", department: "", salary: "" });
    } catch (err) {
      console.error(err);
      alert(" Failed to add employee: " + err.message);
    }
  };




  return (
    
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-md shadow-md max-w-md mx-auto h-1/3 bg-white text-sm md:text-xl"
    >
      <h2 className="font-semibold text-center mb-4 uppercase">Add New Employee</h2>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-2 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Position"
        className="border p-2 w-full mb-2 rounded"
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-2 rounded"
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      >
        <option value="">Select Department</option>
        {dlist.map((dep)=>(
        <option key={dep} value={dep}>{dep}</option>
        ))}
      </select>


      <input
        type="number"
        placeholder="Salary"
        className="border p-2 w-full mb-4 rounded"
        value={form.salary}
        onChange={(e) => setForm({ ...form, salary: e.target.value })}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Adding..." : "Add Employee"}
      </button>

      {error && (
        <p className="text-red-600 text-sm mt-3 text-center">
          Error: {error.message}
        </p>
      )}
    </form>
  );
};

export default EmployeeForm;
