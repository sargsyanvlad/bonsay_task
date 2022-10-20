import Validator from "fastest-validator";
import { StaffValidator } from "../validation/schemas/staffValidator";
const v = new Validator();

const registerMiddleware = async (req, res, next) => {
  const validate = v.compile(StaffValidator.signup);
  const result = validate(req.body);
  if (Array.isArray(result)) {
    return res.status(409).json(result);
  }
  next();
};

export default registerMiddleware;
