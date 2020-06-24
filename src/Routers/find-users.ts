import express, {Request, Response} from 'express'
import {users} from '../index'
import { User } from '../Models/User'

export const findUsers = express.Router()

findUsers.get("/:userId", (req: Request, res: Response) => {
    let id:Number = Number(req.params.userId)
    for(let user of users){
        if(user.userId === id){
            res.json(user)
        }   
    }    
})

findUsers.get("/", (req: Request, res: Response) => {

    res.json(users)
})

findUsers.patch("/", (req: Request, res: Response) => {
    let{ userId, username,
        password, firstName, lastName, email, role} = req.body
        let allFieldsArray:any[] = [userId, username, password, firstName, lastName, email, role]
        let fieldNamesArray:string[] = ["userId", "username", "password", "firstName", "lastName", "email", "role"]
        let successStatus = false
        let correctUser:User
        for(let user of users){
            if(userId === user.userId){
               correctUser = user
            }
        }
        for(let number in allFieldsArray){
            if(allFieldsArray[number]){
                correctUser[fieldNamesArray[number]] = allFieldsArray[number]
                console.log(correctUser)
                successStatus = true
            }
        }
        if(successStatus){
            res.json(correctUser)
        }

})