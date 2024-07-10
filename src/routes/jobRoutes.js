import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkRole } from "../middleware/checkRole.js";
import {
  addJob,
  applyToJob,
  deleteJob,
  getAllJobs,
  getFilteredJobs,
  getJob,
  updateJob,
} from "../controllers/jobController.js";

const jobRouter = Router();

jobRouter.use(verifyToken);

jobRouter.post("/", checkRole("Company_HR"), addJob).get("/", getAllJobs).get('/',getJob).get('/filter',getFilteredJobs).post('/apply',checkRole("User"),applyToJob)
jobRouter
  .put("/:id", checkRole("Company_HR"), updateJob)
  .delete("/:id", checkRole("Company_HR"), deleteJob);

export default jobRouter;
