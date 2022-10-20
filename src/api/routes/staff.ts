import * as express from "express";
const staffRouter = express.Router();
import StaffController from "../controllers/staff.controller";
import registerMiddleware from "../middleweares/validationMiddlewear";
import auth from "../middleweares/authentication.middlewear";
import StaffService from "../../services/staff.service";
import { StaffRepository } from "../../repositories/staff.repository";
import { models } from "../../db";

const { authenticate, isAdmin } = auth;
const { Staff: StaffModel, Sequelize } = models;

// initialize
const staffRepository = new StaffRepository(StaffModel, Sequelize);
const staffService = new StaffService(staffRepository);
const staffController = new StaffController(staffService);

staffRouter.post("/signin", staffController.signIn);
staffRouter.use(authenticate);
staffRouter.post("/add", isAdmin, registerMiddleware, staffController.add);
staffRouter.delete("/:id", isAdmin, staffController.delete);
staffRouter.get("/", isAdmin, staffController.list);
staffRouter.get("/me", staffController.getMe);
staffRouter.get("/search", staffController.search);
staffRouter.get("/:id", staffController.getById);

export { staffRouter };
