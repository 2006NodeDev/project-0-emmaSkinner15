import express, {Request, Response} from 'express'
import { Reimbursement } from '../Models/Reimbursement'
import { reimbursementToReimbursementDTO } from '../utils/reimbursement-to-reimbursementDTO'
import { reimbursementDTO } from '../dtos/reimbursement-dto'
import { createReimbursementRequest } from '../daos/create-reimbursement-request-dao'
import { retrieveReimbursements } from '../daos/retrieve-reimbursements-dao'
import { authorizationMiddleware } from '../middleware/authorization-middleware'

export const reimbursementRouter = express.Router()

reimbursementRouter.get('/status/:statusId', async (req:Request, res:Response) =>{

})
reimbursementRouter.get('/author/userId/:userId', authorizationMiddleware(['finance-manager']), async (req:Request, res:Response) =>{
let userId:number = Number(req.params.userId)
    try{
        let retieveReimbursements = await retrieveReimbursements(userId)
        res.json(retieveReimbursements)
    }catch(e){
        console.log(e)
    }
})

reimbursementRouter.post('/', async (req:Request, res:Response) =>{
let {reimbursementId , author, amount,description,statusId,typeId } = req.body
let reimbursement:Reimbursement = {
    reimbursementId:reimbursementId,
    author:author,
    amount:amount,
    description:description,
    dateSubmitted:0,
    resolver:0,
    dateResolved:0,
    status:statusId,
    type:typeId

}
    let newReimbursement:reimbursementDTO = reimbursementToReimbursementDTO(reimbursement)
    try{
        let newRequest = await createReimbursementRequest(newReimbursement)
        res.json(newRequest)
    }catch(e){
       console.log(e)
    }
})
reimbursementRouter.patch('/', authorizationMiddleware(['finance-manager']), async (req:Request, res:Response) =>{

})