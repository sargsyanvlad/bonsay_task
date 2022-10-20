import * as bcrypt from "bcrypt";
import { RequestHandler, Request } from "express";

import authService from "../../services/auth.service";
import StaffService from "../../services/staff.service";

class StaffController {
  private staffService: StaffService;

  constructor(staffService: StaffService) {
    this.staffService = staffService;
  }

  add: RequestHandler = async (req, res) => {
    try {
      const { password, email, name } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.staffService.add({
        name,
        password: hashedPassword,
        email,
      });

      res.send("You have successfully added new Employee!");
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  };

  delete: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;

      await this.staffService.delete(Number(id));

      res.send("You have successfully removed employee!");
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  };

  signIn: RequestHandler = async (req, res) => {
    try {
      const { email, password } = req.body;
      const isUserExists = await this.staffService.getByEmail(email);

      if (!isUserExists) {
        res.status(400).send("User not exists");
        return;
      }

      const validPassword = await bcrypt.compare(
        password,
        isUserExists.password
      );

      if (!validPassword) {
        res.status(400).send("Credentials are invalid");
        return;
      }

      const auth = { user: isUserExists };
      const accessToken = await authService.signAccessToken(auth);

      const result = {
        accessToken,
      };
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  };

  getMe: RequestHandler = async (
    req: Request & { payload: { [key: string]: any } },
    res
  ) => {
    try {
      const { id } = req.payload.user;
      const employee = await this.staffService.getById(id);
      const result = { employee };
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  };

  list: RequestHandler = async (
    req: Request & { payload: { [key: string]: any } },
    res
  ) => {
    try {
      const { limit, offset } = req.query;

      const employees = await this.staffService.list(
        limit as string,
        offset as string
      );

      const result = { employees };
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  };

  getById: RequestHandler = async (req: Request, res) => {
    try {
      const { id } = req.params;
      const employee = await this.staffService.getById(Number(id));
      if (!employee) {
        res.status(404).send("Employee not found");
        return;
      }
      const result = { employee };
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  };

  search: RequestHandler = async (
    req: Request & { payload: { [key: string]: any } },
    res
  ) => {
    try {
      const { text } = req.query;
      const employee = await this.staffService.searchByName(text as string);
      const result = { employee };
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  };
}

export default StaffController;
