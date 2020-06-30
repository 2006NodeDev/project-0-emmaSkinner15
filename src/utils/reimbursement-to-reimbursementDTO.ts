import { Reimbursement } from "../Models/Reimbursement";
import { reimbursementDTO } from "../dtos/reimbursement-dto";

export function reimbursementToReimbursementDTO(reimbursement:Reimbursement){
    let reimbursementDTO:reimbursementDTO = {
        reimbursement_id:reimbursement.reimbursementId,
        author_id:reimbursement.author,
        amount:reimbursement.amount,
        date_submitted:reimbursement.dateSubmitted,
        date_resolved:reimbursement.dateResolved,
        description:reimbursement.description,
        resolver:reimbursement.resolver,
        status:1,
        type:4
    }
    return reimbursementDTO
}