import { Router } from "express";
import {
  addCompany,
  deleteCompany,
  getData,
  search,
  updateCompany,
} from "../controllers/companyController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkRole } from "../middleware/checkRole.js";
import { checkUniqueness } from "../middleware/checkUniqueness.js";

const companyRouter = Router();

companyRouter.use(verifyToken);

companyRouter
  .post("/", checkRole("Company_HR"), checkUniqueness, addCompany)
  .put("/", checkRole("Company_HR"), updateCompany)
  .delete("/", checkRole("Company_HR"), deleteCompany)
  .get("/", search);
companyRouter.get("/:id", checkRole("Company_HR"), getData);

export default companyRouter;
