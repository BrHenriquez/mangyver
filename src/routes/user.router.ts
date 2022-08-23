/* eslint-disable */
import express, { Request, Response } from "express";
import UserController from "../controllers/user.controller";
import passwordValidator from "password-validator";
import { log } from "../config/logger";
import jwt_decode from "jwt-decode";
import { getUser } from "../repositories/user.repository";
import {
  getUserByIdValidator,
  getUsersValidator,
} from "./validators/user/fetch-users.validator";
import { updateUserAuthValidator } from "./validators/user/update-user-status.validator";

const router = express.Router();

const schema = new passwordValidator();
schema
  .is()
  .symbols()
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

const malformedPassword = {
  password: [
    "Must have minimum length 8",
    "Must have maximum length 100",
    "Must have uppercase letters",
    "Must have lowercase letters",
    "Must have at least 2 digits",
    "Should not have spaces",
  ],
};

router.get("/", [getUsersValidator], async (req: Request, res: Response) => {
  const headers = req.headers;
  const token = headers.auth;
  const decoded: object = jwt_decode(JSON.stringify(token));
  const objectValues = Object.values(decoded);
  const profile = await getUser(objectValues[0]);
  req.query.top,
    req.query.from,
    req.query.dateFrom,
    req.query.dateEnd,
    req.query.sapForm;
  const controller = new UserController();
  const response = await controller.getUsers(
    profile?.operation.id,
    Number(req.query?.skip),
    Number(req.query?.take),
    <string>req.query?.name,
    <string>req.query?.email,
    <string>req.query?.SAPCode,
    <string>req.query?.SAPUser,
    <string>req.query?.areaId,
    <string>req.query?.lineId
  );
  const results = JSON.parse(JSON.stringify(response));
  results.data.map((result: any) => {
    result.label = result.name;
    result.filter = result.id;
  });
  log.silly(results);
  return res.send(results);
});

router.post("/", async (req, res) => {
  const controller = new UserController();
  if (schema.validate(req.body.password) == true) {
    const response = await controller.createUser(req.body);
    log.silly(response);
    return res.send(response);
  } else {
    log.warn(malformedPassword);
    return res.status(400).send({ msg: malformedPassword });
  }
});

router.get(
  "/:id",
  [getUserByIdValidator],
  async (req: Request, res: Response) => {
    const controller = new UserController();
    const response = await controller.getUser(req.params.id);
    if (!response) {
      log.warn(response);
      return res.status(404).send({ message: "No User found" });
    }
    log.silly(response);
    return res.send(response);
  }
);

router.put(
  "/:id",
  [updateUserAuthValidator],
  async (req: Request, res: Response) => {
    const controller = new UserController();
    const response = await controller.updateUserStatus(
      req.params.id,
      req.query.auth
    );
    if (!response) {
      log.warn(response);
      return res.status(404).send({ message: "No User found" });
    }
    log.silly(response);
    return res.send(response);
  }
);

export default router;
