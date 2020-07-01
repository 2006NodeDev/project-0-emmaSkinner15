import { reimbursementDTO } from "../dtos/reimbursement-dto";
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";

export async function createReimbursementRequest(reqDTO:reimbursementDTO){
    let client:PoolClient;

    try{
        client = await connectionPool.connect()
        let response:QueryResult = await client.query(`set schema 'project0';`)
        response = await client.query(`insert into reimbursements("author_id", "amount","date_submitted","date_resolved","description", "resolver","status_id", "type_id")
        values (${reqDTO.author_id}, ${reqDTO.amount}, Now(), null, '${reqDTO.description}',0, ${reqDTO.status},${reqDTO.type});`)
        response = await client.query(`select "reimbursement_id","amount", "date_submitted","date_resolved","description","status_id","status","type_id", "type", "username" from reimbursements r natural join reimbursement_types rt natural join status s inner join users u on r."author_id" = u.user_Id offset (lastval()-1);`)
        return response.rows
        
    }catch(e){
        console.log(e)
        throw new Error('un-implemented error handling')
    }finally{
        client && client.release()
    }
}
