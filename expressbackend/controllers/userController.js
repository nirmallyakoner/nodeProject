import UserModel from "../models/userAuth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userController =async(req, res)=>  {
        const {name, email, password, password_confirmation, tc}= req.body
        const user=await UserModel.findOne({email:email}) //check if user already exists
        if (user) {
            return res.status(409).json({"status": "Failed", "message": "Email already exists"})
        }
        else{
                if(name && email && password && password_confirmation && tc){
                   if(password===password_confirmation){
                    try {
                        const salt= await bcrypt.genSalt(10)
                        const hashPassword= await bcrypt.hash(password, salt)
                        const doc= new UserModel({
                            name:name,
                            email:email,
                            password:hashPassword,
                            tc:tc
                        })    
                        await doc.save()
                        const saved_user=await UserModel.findOne({email:email})
                        const token=jwt.sign({userID: saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn:"10min"})
                        res.status(201).json({"status": "Success", "message": "User created successfully", "token":token})
                        // res.status(201).json({"status": "Success", "message": "User created successfully"})
                    } catch (error) {
                        console.log(error)
                        return res.status(409).json({"status": "Failed", "message": "Something went wrong"})
                    }
                   }
                   else{
                    return res.status(409).json({"status": "Failed", "message": "Password amd Confirm Password does not match"})
                   }     
                }
                else{
                return res.status(409).json({"status": "Failed", "message": "All fields are required"})
                
                }
        
            }
}

const userLogin=async(req, res)=>{
    try {
        const {email, password}=req.body
        if(email && password){
            const user=await UserModel.findOne({email: email})
            if(user !==null){
                const isMatch=await bcrypt.compare(password, user.password)
                if((user.email===email) && isMatch){
                    res.status(201).json({"status": "Success", "message": "User Logged in successfully"})
                }else{
                    return res.status(409).json({"status": "Failed", "message": "Email or Password is incorrect"})
                }
            }
            else{
                return res.status(409).json({"status": "Failed", "message": "User is Not Registered"})
            }
        }
    } catch (error) {
        res.status(409).json({"status": "Failed", "message": "Something went wrong"})
    }
}

const updateUser=async(req, res)=>{
    try {
        const updateData = req.body;
        const id = req.params.id;

        // Log request data for debugging
        console.log('Update Data:', updateData);
        console.log('User ID:', id);

        // Validate id format (assuming MongoDB ObjectID)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ "status": "Failed", "message": "Invalid user ID format" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.log(error);
        return res;
    }
}

export { userController, userLogin, updateUser };
