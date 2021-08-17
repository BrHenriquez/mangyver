import express from "express";
import LineController from "../controllers/line.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new LineController();
  const response = await controller.getLines();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new LineController();
  const response = await controller.createLine(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new LineController();
  const response = await controller.getLine(req.params.id);
  if (!response) res.status(404).send({message: "No Line found"})
  return res.send(response);
});

export default router