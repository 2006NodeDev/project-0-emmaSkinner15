import express, {Request, Response} from 'express'
import { getAllUsers, getUserById } from '../daos/user-dao'
import { updateUserInfo } from '../daos/update-user-dao'
import { User } from '../Models/User'
import { authorizationMiddleware } from '../middleware/authorization-middleware'

export const findUsers = express.Router()

findUsers.get("/:userId", async (req: Request, res: Response) => {
    let id:BigInt = BigInt(req.params.userId)
    try{
        let desiredUser = await getUserById(id)
        //this is a very janky way to do authentication, but my authentication function wasn't working for this endpoint for some reason
        if(req.session.user){
            if(req.session.user.role==='finance-manager' || 'admin'){
                res.json(desiredUser)
            }else{
                res.status(401).send("The incoming token has expired")
            }
        }else{
            res.status(401).send("The incoming token has expired")
        }
        
        
    }catch(err){
        console.log(err)
    }

})

//
findUsers.get("/", authorizationMiddleware(['admin', 'finance-manager']), async (req: Request, res: Response) => {
    try{
        let users = await getAllUsers()
        res.json(users)
    }catch(err){
        console.log(err)
    }
    
    
})

findUsers.patch("/", authorizationMiddleware(['admin']), async (req: Request, res: Response) => {
    let{ userId, username,
        password, firstName, lastName, email, role} = req.body
        let infoToUpdate:User = {userId:userId, username:username, password:password, firstName:firstName, lastName:lastName, email:email, role:role}

        try{
            let updatedUser = await updateUserInfo(infoToUpdate)
            res.json(updatedUser)
        }catch(e){
            console.log(e)
        }
        

})