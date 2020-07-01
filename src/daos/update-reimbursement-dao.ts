import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { Reimbursement } from "../Models/Reimbursement";
import {buildReimbursementUpdateQuery } from "../utils/build-reimbursement-update-query"

export async function updateReimbursement(infoToChange:Reimbursement){
    let client:PoolClient;
    try{
        client = await connectionPool.connect()
        let result:QueryResult = await client.query(`set schema 'project0';`)
        result = await client.query(buildReimbursementUpdateQuery(infoToChange))
        result = await client.query(`select "reimbursement_id","amount", "date_submitted","date_resolved","description","status_id","status","type_id", "type", "username" from reimbursements r natural join reimbursement_types rt natural join status s inner join users u on r."author_id" = u.user_Id where r."reimbursement_id" = ${infoToChange.reimbursementId};`)
        return result.rows
    }catch(e){
        console.log(e)
        throw new Error('unimplemented error handling')
    }

}
