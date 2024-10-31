import { ZodSchema } from 'zod';
import { CreateSubmissionDto } from '../dtos/CreateSubmissionDtos';
import { NextFunction,Request,Response } from 'express';
export const validate=(schema:ZodSchema<any>)=>(req:Request,res:Response,next:NextFunction) => {
        try {
            schema.parse({
                ...req.body,
            });
            next(); 
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success:false,
                message:"invalid request params recieved",
                data:{},
                error:error
            });
        }
};
