import { Request, Response, NextFunction } from "express";
//this is very similar to alec's authorization middleware in lightly-burning
export function authorizationMiddleware(roles:string[]){
    return (req:Request, res:Response, next:NextFunction) => {
        let isAuthorized = false
        //console.log(req.session.user.role)
        if(req.session.user){
            for(let role of roles){
                if(role === req.session.user.role){
                    isAuthorized = true
                    next()
                }
                if(!isAuthorized){
                    res.status(401).send("The incoming token has expired")
                }
            }
        }else{
            res.status(401).send("The incoming token has expired")
        }

    }
}