import {
    NextFunction, Request, Response
} from "express";
import Joi from "joi";
import { validateRequest } from "../../../utils/validate";

export const updateAssignedOrderByIdValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        params: Joi.object({
            id: Joi.number().optional(),
        }),
        body: Joi.object({
            id: Joi.number().optional(),
            orderNumber: Joi.string().optional(),
            userId: Joi.string().required(),
            stimatedTime: Joi.number().optional(),
            extendedText: Joi.string().optional(),
            noticeSAPcode: Joi.string().optional(),
            assignedDate: Joi.date().optional(),
            scheduledDate: Joi.date().optional(),
            operations: Joi.string().optional(),
            orderStatus: Joi.string().optional(),
            status: Joi.boolean().optional(),
        })
    });
    validateRequest(req, res, next, schema);
};