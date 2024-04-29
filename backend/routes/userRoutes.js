import express from "express";
import {
  register,
  login,
  logout,
  getLoggedInUser,
  getUserById,
  updateProfile,
  getAllUsers,
  deleteUser,
  saveJob,
  deleteJob,
  applyJob,
  updatePassword,
  deleteAppliedJob,
  updateOtherDetails,
  myStats,
  adminStats,
} from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", isAuthenticated, getLoggedInUser);
router.put("/me/update", isAuthenticated, updateProfile);
router.put("/me/updateOtherDetails", isAuthenticated, updateOtherDetails);
router.put("/password/update", isAuthenticated, updatePassword);
router.put("/saveJob", isAuthenticated, saveJob);
router.put("/applyJob", isAuthenticated, applyJob);
router.delete("/saveJobs/:id", isAuthenticated, deleteJob);
router.delete("/appliedJobs/:id", isAuthenticated, deleteAppliedJob);
router.get("/myStats", isAuthenticated, myStats);
router.get("/adminStats", isAuthenticated, isAuthorized("admin"), adminStats);

router.get("/admin/users", isAuthenticated, isAuthorized("admin"), getAllUsers);
router.get(
  "/admin/users/:id",
  isAuthenticated,
  isAuthorized("admin"),
  getUserById
);
router.delete(
  "/admin/users/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deleteUser
);

export default router;
