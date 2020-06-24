import {loginRouter} from "./Routers/login-router"
import express from 'express'
import { User } from "./Models/User"
import { findUsers } from "./Routers/find-users"

export { users } 


const app = express()
app.use(express.json())


app.use("/login", loginRouter)
app.use("/users", findUsers)



app.listen(2005, () => {
    console.log("Server has started!")
})

let users:User[] = [ {    userId: 1, 
    username: 'AlexanderHamilton', 
    password: 'password', 
    firstName: 'Alexander', 
    lastName: 'Hamilton', 
    email: 'alexHam@gmail.com', 
    role:{roleId: 1, 
        role: 'Moderator' }
    }, {
        userId: 2 ,
        username: 'BenjaminFranklin', 
        password: 'eagles', 
        firstName: 'Benjamin', 
        lastName: 'Franklin', 
        email: 'benFrank@gmail.com', 
        role:{roleId: 2, 
            role: 'User' }
    }

]
