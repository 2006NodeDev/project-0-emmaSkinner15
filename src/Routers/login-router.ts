import express, {Request, Response} from 'express'
import {users } from '../index'

export const loginRouter  = express.Router()



loginRouter.post('/', (req: Request, res: Response) => {
    let {username,
    password} = req.body
    if(!password || !username){
        res.status(400).send('Invalid Credentials')
    }
    else{
        let found = false;
        for(let person of users){
            if(person.username === username && person.password === password){
                res.json(person)
                found = true;
            }
        }
        if(!found){
            res.status(400).send('Invalid Credentials')
        }
    }
    })


