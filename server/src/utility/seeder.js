import { connectDB } from "./db.js";


export const seedData = async () => {
    const db = await connectDB();

    const departments = [
        { name: "HR", floor: 1 },
        { name: "Marketing", floor: 4 },
        { name: "Engineer", floor: 2 },
    ];


    const employees = [
        { name: "Akhil", position: "HR Manager", department: "HR", salary: 60000 },
        { name: "Jithin", position: "Jr. Software Engineer", department: "Engineering", salary: 30000 },
        { name: "Arya", position: "Frontend Developer", department: "Engineering", salary: 32000 },
        { name: "Manu", position: "Marketing Lead", department: "Marketing", salary: 58000 },
        { name: "Priya", position: "Recruiter", department: "HR", salary: 45000 },
    ];


    await db.collection("departments").deleteMany({});
    await db.collection("employees").deleteMany({});

    await db.collection("departments").insertMany(departments);
    await db.collection("employees").insertMany(employees);


    console.log("Database Seeded succesfully!");

}