import { Router } from "express";
import { addAssignedOrder, deleteAssignedOrderById, fetchAssignedOrderById, updateAssignedOrder } from "src/controllers/assigned-order.controller";
import { createAssignedOrderByIdValidator, getAssignedOrderByIdValidator, updateAssignedOrderByIdValidator, removeAssignedOrderByIdValidator } from "./validators";

export const assignedOrderRouter = Router();

assignedOrderRouter.post("/create", [createAssignedOrderByIdValidator], [addAssignedOrder] );
assignedOrderRouter.get("/:id", [getAssignedOrderByIdValidator], [fetchAssignedOrderById] );
assignedOrderRouter.put("/:id", [updateAssignedOrderByIdValidator],[updateAssignedOrder] );
assignedOrderRouter.delete("/:id", [removeAssignedOrderByIdValidator], [deleteAssignedOrderById] );


