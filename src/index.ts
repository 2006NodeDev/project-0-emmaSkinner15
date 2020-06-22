//import express from 'express'
import express, {Request, Response} from 'express'

const app = express()

app.use("/", (req:Request, res:Response) => {
    res.send("Hello World!")
})
app.listen(2005, () => {
    console.log("Server has started!")
})
