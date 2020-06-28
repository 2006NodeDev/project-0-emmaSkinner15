import express, {Request, Response} from 'express'
import { getAllUsers, getUserById } from '../daos/user-dao'
import { updateUserInfo } from '../daos/update-user-dao'
import { User } from '../Models/User'

export const findUsers = express.Router()

findUsers.get("/:userId", async (req: Request, res: Response) => {
    let id:BigInt = BigInt(req.params.userId)
    try{
        let desiredUser = await getUserById(id)
        res.json(desiredUser)
    }catch(err){
    }

})

findUsers.get("/", async (req: Request, res: Response) => {
    try{
        let users = await getAllUsers()
        res.json(users)
    }catch(err){
        console.log(err)
    }
    
    
})

findUsers.patch("/", async (req: Request, res: Response) => {
    let{ userId, username,
        password, firstName, lastName, email, role} = req.body
        let infoToUpdate:User = {userId:userId, username:username, password:password, firstName:firstName, lastName:lastName, email:email, role:role}

        try{
            let updatedUser = await updateUserInfo(infoToUpdate)
            console.log(updatedUser)
            res.json(updatedUser)
        }catch(e){
            console.log(e)
        }
        

})