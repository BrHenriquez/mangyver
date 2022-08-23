import {
    NextFunction, Request, Response
} from 'express';
import Joi, { string } from 'joi';
import { validateRequest } from 'src/utils/validate';

export const createAssignedOrderByIdValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
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