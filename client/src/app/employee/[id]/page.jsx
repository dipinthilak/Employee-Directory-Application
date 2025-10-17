"use client";

import { useQuery, ApolloProvider } from "@apollo/client/react";
import { gql } from "@apollo/client";
import client from "../../../lib/apollo-client";
import { useParams } from "next/navigation";

const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      salary
      department {
        id
        name
        floor
      }
    }
  }
`;

function EmployeeDetailsContent() {
  let { id } = useParams();
  id = String(id);

  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;

  const e = data?.getEmployeeDetails;
  console.log(`employee datails${id}`, e);

  if (!e) return <p>No employee found.</p>;

  return (
    <div className="max-w-md mt-30 sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200  transition-all duration-300 hover:shadow-2xl">
      <button
        onClick={() => window.history.back()}
        className="mb-4 flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-emerald-700 text-center uppercase">
        {e.name}
      </h1>

      <div className="space-y-3 text-gray-700 text-sm sm:text-base">
        <p>
          <strong className="text-gray-800">Position:</strong> {e.position}
        </p>

        <p>
          <strong className="text-gray-800">Department:</strong>{" "}
          {e?.department?.name}
        </p>

        <p>
          <strong className="text-gray-800">Floor:</strong>{" "}
          {e?.department?.floor}
        </p>

        <p className="text-emerald-600 font-semibold">
          <strong className="text-gray-800">Salary:</strong> ₹
          {e.salary.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function EmployeeDetailsPage() {
  return (
    <ApolloProvider client={client}>
      <EmployeeDetailsContent />
    </ApolloProvider>
  );
}
