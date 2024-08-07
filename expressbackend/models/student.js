import mongoose from "mongoose";
const studentSchema= new mongoose.Schema({
    stuname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    }
})

const StudentModel= mongoose.model("student", studentSchema);
export default StudentModel;