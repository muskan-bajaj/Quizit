import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function protect(req: Request ,res: Response, next: NextFunction){
    var token = req.cookies.token;

    if(token){
        try{
            var val:any = await jwt.verify(token, process.env.JWT_SECRET!)
            req.body.user = val.uid
            next()
        }
        catch(err){
            console.log(err)
            // res.clearCookie('token')
            res.status(401).json({error: "Invalid Token"})
        }
    }else{
        res.status(401).json({error: "Unauthorized"})
    }
}