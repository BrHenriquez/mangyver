import {
    NextFunction, Request, Response
} from 'express';
import Joi from 'joi';
import { validateRequest } from 'src/utils/validate';

export const updateUserAuthValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        params: Joi.object({
            id: Joi.number().required(),
        }),
        query: Joi.object({
            auth: Joi.string().required(),
        }),
    });
    validateRequest(req, res, next, schema);
};