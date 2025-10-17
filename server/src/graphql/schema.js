import { gql } from "graphql-tag";
import { ObjectId } from "mongodb";
import { connectDB } from "../utility/db.js";

export const typeDefs = gql`
  type Department {
    id: ID!
    name: String!
    floor: Int!
  }

  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Float!
  }

    type EmployeeDetails  {
    id: ID!
    name: String!
    position: String!
    department: Department!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): EmployeeDetails 
    getEmployeesByDepartment(department: String!): [Employee!]!
  }

  type Mutation {
    addEmployee(
      name: String!
      position: String!
      department: String!
      salary: Float!
    ): Employee!
  }
`;

export const resolvers = {
  Query: {
    getAllEmployees: async () => {
      const db = await connectDB();

      const employees = await db
        .collection("employees")
        .find({}, { projection: { name: 1, position: 1, department: 1 } })
        .toArray();


      return employees.map((e) =>({
            id: e._id.toString(),
            name: e.name,
            position: e.position,
            department: e.department,
          }));

    },



    getEmployeeDetails: async (_, { id }) => {
      if (!ObjectId.isValid(id)) throw new Error("Invalid Employee ID");

      const db = await connectDB();
      const employee = await db
        .collection("employees")
        .findOne({ _id: new ObjectId(id) });

      if (!employee) throw new Error("Employee not found with this ID!");

      const department = await db
        .collection("departments")
        .findOne({ name: employee.department });

      return {
        id: employee._id.toString(),
        name: employee.name,
        position: employee.position,
        salary: employee.salary,
        department: department
          ? { id: department._id.toString(),name: department.name, floor: department.floor }
          : { id: "N/A", name: employee.department, floor: 0 },
      };
    },



    getEmployeesByDepartment: async (_, { department }) => {
      const db = await connectDB();
      const employees = await db
        .collection("employees")
        .find({ department })
        .toArray();

      if (employees.length === 0)
        throw new Error("No employees found in this department");

      const departmentInfo = await db
        .collection("departments")
        .findOne({ name: department });

      return employees.map((e) => ({
        id: e._id.toString(),
        name: e.name,
        position: e.position,
        salary: e.salary,
        department: departmentInfo
          ? { id: departmentInfo._id.toString(), name: departmentInfo.name, floor: departmentInfo.floor }
          : { id: "N/A", name: department, floor: 0 },
      }));
    },
  },

  Mutation: {

    addEmployee: async (_, { name, position, department, salary }) => {
      const db = await connectDB();

      if (!name || !position || !department || !salary)
        throw new Error("All fields are required!");

      const departmentExists = await db
        .collection("departments")
        .findOne({ name: department });

      if (!departmentExists)
        throw new Error("Department not found! Please create department first.");

      const newEmployee = { name, position, department, salary };
      const result = await db.collection("employees").insertOne(newEmployee);

      return {
        id: result.insertedId.toString(),
        ...newEmployee,
        department: {
          id: departmentExists._id.toString(),
          name: departmentExists.name,
          floor: departmentExists.floor,
        },
      };
    },
  },
};
