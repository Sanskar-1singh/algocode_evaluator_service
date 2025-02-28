import { z } from 'zod';
import { CreateSubmissionDto } from '../dtos/CreateSubmissionDtos';
import { NextFunction,Request,Response } from 'express';
export const validate=(schema:z.ZodType <any>)=>{
    return (req:Request,res:Response,next:NextFunction) => {//why we have return the function????
        try {
            schema.parse({
                ...req.body,
            });
            next(); 
        } catch (error) {
            console.log(error);
             res.status(400).json({
                success:false,
                message:"invalid request params recieved",
                data:{},
                error:error
            });
        }
    }
};
