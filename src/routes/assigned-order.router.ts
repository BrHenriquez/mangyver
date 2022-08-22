import { Router } from "express";
import { addAssignedOrder, deleteAssignedOrderById, fetchAssignedOrders, fetchAssignedOrderById, updateAssignedOrder } from "../controllers/assigned-order.controller";

export const assignedOrderRouter = Router();

assignedOrderRouter.post("/create", [addAssignedOrder] );
assignedOrderRouter.get("/", [fetchAssignedOrders] );
assignedOrderRouter.get("/:id", [fetchAssignedOrderById] );
assignedOrderRouter.put("/:id", [updateAssignedOrder] );
assignedOrderRouter.delete("/:id", [deleteAssignedOrderById] );
