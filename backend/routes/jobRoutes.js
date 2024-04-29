import express from "express";
import {
  addNewJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  updateJobStatusForUser,
  searchJobs,
} from "../controllers/jobController.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

const router = express.Router();

router.post("/admin/jobs", isAuthenticated, isAuthorized("admin"), addNewJob);
router.get("/admin/jobs", isAuthenticated, isAuthorized("admin"), getAllJobs);
router.get(
  "/jobs/:id",
  isAuthenticated,
  isAuthorized("admin", "user"),
  getJobById
);
router.put(
  "/admin/jobs/:id",
  isAuthenticated,
  isAuthorized("admin"),
  updateJob
);
router.put(
  "/admin/updateJobStatusForUser",
  isAuthenticated,
  isAuthorized("admin"),
  updateJobStatusForUser
);
router.delete(
  "/admin/jobs/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deleteJob
);

router.get("/searchJobs", isAuthenticated, searchJobs);

export default router;
