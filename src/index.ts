import {loginRouter} from "./Routers/login-router"
import { findUsers } from "./Routers/user-router"
import { reimbursementRouter } from "./Routers/reimbursement-router"
import express from 'express'
import { sessionMiddleware } from "./middleware/session-middleware"



    const app = express()
    app.use(express.json())
    
    app.use(sessionMiddleware)
    app.use("/login", loginRouter)
    app.use("/users", findUsers)
    app.use("/reimbursements", reimbursementRouter)
    app.listen(2005, () => {
        console.log("Server has started!")
    })
