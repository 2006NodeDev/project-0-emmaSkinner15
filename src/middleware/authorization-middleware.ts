import { Request, Response, NextFunction } from "express";
//this is very similar to alec's authorization middleware in lightly-burning
export function authorizationMiddleware(roles:string[]){
    return (req:Request, res:Response, next:NextFunction) => {
        let isAuthorized = false
        for(let role of roles){
            if(role === req.session.user.role){
                isAuthorized = true
                next()
            }
            if(!isAuthorized){
                res.status(401).send("The incoming token has expired")
            }
        }
    }
}