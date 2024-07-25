import express from "express";
const router = express.Router();
import { userController, userLogin, updateUser} from '../controllers/userController.js';
//public routes
router.post("/register", userController);
router.post("/login", userLogin);
router.put('/user-update/:id',  updateUser);

export default router;