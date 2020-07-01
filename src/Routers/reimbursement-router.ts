import express, {Request, Response} from 'express'
import { Reimbursement } from '../Models/Reimbursement'
import { reimbursementToReimbursementDTO } from '../utils/reimbursement-to-reimbursementDTO'
import { reimbursementDTO } from '../dtos/reimbursement-dto'
import { createReimbursementRequest } from '../daos/create-reimbursement-request-dao'
import { retrieveReimbursementsById } from '../daos/retrieve-reimbursements-by-id-dao'
import { authorizationMiddleware } from '../middleware/authorization-middleware'
import { retrieveReimbursementsByStatus } from '../daos/retrieve-reimbursements-by-status-dao'
import {updateReimbursement } from '../daos/update-reimbursement-dao'

export const reimbursementRouter = express.Router()

reimbursementRouter.get('/status/:statusId', authorizationMiddleware(['finance-manager']), async (req:Request, res:Response) =>{
    let statusNumber:number = Number(req.params.statusId)
    try{
        let retrieveReimbursements = await retrieveReimbursementsByStatus(statusNumber)
        res.json(retrieveReimbursements)
    }catch(e){
        console.log(e)
    }
})
reimbursementRouter.get('/author/userId/:userId', authorizationMiddleware(['finance-manager']), async (req:Request, res:Response) =>{
let userId:number = Number(req.params.userId)
    try{
        let retieveReimbursements = await retrieveReimbursementsById(userId)
        res.json(retieveReimbursements)
    }catch(e){
        console.log(e)
    }
})
//authorizationMiddleware(['finance-manager']),
reimbursementRouter.post('/',  async (req:Request, res:Response) =>{
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
let {reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type } = req.body
let fieldsUpdated:Reimbursement = {reimbursementId:reimbursementId, author:author, amount:amount, dateSubmitted:dateSubmitted, 
    dateResolved:dateResolved, description:description, resolver:resolver, status:status, type:type}
    try{
        let updatedReimbursement = await updateReimbursement(fieldsUpdated)
        let [newReimbursement] = updatedReimbursement
        res.json(newReimbursement)
    }catch(e){
        console.log(e)
    }
})