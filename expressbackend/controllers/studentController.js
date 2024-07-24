import StudentModel from "../models/student.js";

export const getAllStudents = async (req, res) => {
    try {
      const students = await StudentModel.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }