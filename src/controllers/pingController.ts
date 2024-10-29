import { Request, Response } from "express";

 const pingCheck = ( res: Response)=> {
    return res.status(200).json({
        message: "sanskar singh"
    });
};

export default{
    pingCheck:pingCheck,
}
