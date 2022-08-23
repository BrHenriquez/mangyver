/* eslint-disable */
import express from "express";
import FormController from "../controllers/notice-form.controller";
import jwt_decode from "jwt-decode";
import { getUser } from "../repositories/user.repository";
import { log } from "../config/logger";
const router = express.Router();

router.get("/", async (_req, res) => {
  const headers = _req.headers;
  const token = headers.auth;
  const decoded: object = jwt_decode(JSON.stringify(token));
  const objectValues = Object.values(decoded);
  const profile = await getUser(objectValues[0]);

  const controller = new FormController();
  const response = await controller.getForm(profile?.id);

  return res.json(JSON.parse(response[0].form));
});

router.post("/", async (req, res) => {
  const controller = new FormController();
  const response = await controller.createForm(req.body);
  log.silly(response);
  return res.send(response);
});

export default router;
