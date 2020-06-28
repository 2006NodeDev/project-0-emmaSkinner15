import {loginRouter} from "./Routers/login-router"
import { findUsers } from "./Routers/find-users"
import { reimbursementRouter } from "./Routers/reimbursement-router"
import express from 'express'



    const app = express()
    app.use(express.json())
    
    
    app.use("/login", loginRouter)
    app.use("/users", findUsers)
    app.use("/reimbursements", reimbursementRouter)
    app.listen(2005, () => {
        console.log("Server has started!")
    })
