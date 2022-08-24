import {
    NextFunction, Request, Response
} from "express";
import { Schema } from "joi";

export const validateRequest = (req: Request, res: Response, next: NextFunction, schema: Schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const { error } = schema.validate(
        req,
        options
    );
    if (error) {
        res.status(412)
            .send({
                message: "validation_errors",
                errors: error.details.map(detail => ({
                    message: detail.message,
                    field: detail.path[0],
                    type: detail.type
                }))
            });
    } else {
        next();
    }

};
