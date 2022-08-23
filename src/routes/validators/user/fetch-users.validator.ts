import {
    NextFunction, Request, Response
} from 'express';
import Joi from 'joi';
import { validateRequest } from 'src/utils/validate';

export const getUserByIdValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        params: Joi.object({
            id: Joi.number().required(),
        })
    });
    validateRequest(req, res, next, schema);
};

export const getUsersValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        query: Joi.object({
            profile: Joi.string().required(),
            skip: Joi.number().optional(),
            take: Joi.number().required(),
        })
    });
    validateRequest(req, res, next, schema);
};