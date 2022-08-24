import {
    NextFunction, Request, Response
} from "express";
import Joi from "joi";
import { validateRequest } from "../../../utils/validate";

export const deleteNotificationByIdValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        params: Joi.object({
            id: Joi.number().optional(),
        })
    });
    validateRequest(req, res, next, schema);
};