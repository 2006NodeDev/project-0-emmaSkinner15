import { Reimbursement } from "../Models/Reimbursement"

export function buildReimbursementUpdateQuery(dataToChange:Reimbursement){
    let reimbIdStr:string = ''
    let amountStr:string = ''
    let dateSubStr:string = ''
    let dateResStr = ', "date_resolved" = now()'
    let descStr:string = ''
    let resolverStr = ''
    let statusIdStr = ''
    let typeIdStr = ''
    if(dataToChange.reimbursementId!==undefined){
        reimbIdStr = `"reimbursement_id"=${dataToChange.reimbursementId}`
    }
    if(dataToChange.amount!==undefined){
       amountStr = `, "amount"= ${dataToChange.amount}`
    }
    /*
    if(dataToChange.dateResolved!== undefined || null){
        dateResStr = `, "date_resolved"= ${dataToChange.dateResolved}`
    }
    */
    if(dataToChange.dateSubmitted!== undefined || null){
        dateSubStr = `, "date_submitted"=${dataToChange.dateSubmitted}`
    }
    if(dataToChange.description!==undefined){
        descStr = `, "description"='${dataToChange.description}'`
    }
    if(dataToChange.resolver!==undefined){
        resolverStr = `, "resolver"= ${dataToChange.resolver}`
    }
    if(dataToChange.status!==undefined){
        statusIdStr = `, "status_id"= ${dataToChange.status}`
    }
    if(dataToChange.type!==undefined){
        typeIdStr = `, "type_id"= ${dataToChange.type}`
    }
    let sqlScript:string = `update reimbursements set ${reimbIdStr}${amountStr}${dateSubStr}${dateResStr}${descStr}${resolverStr}${statusIdStr}${typeIdStr} where "reimbursement_id"=${dataToChange.reimbursementId};`
    return(sqlScript)

}