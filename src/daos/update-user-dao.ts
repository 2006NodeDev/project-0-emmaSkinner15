import { User } from "../Models/User";
import { userToUserDTO } from "../utils/User-to-UserDTO-converter";
import { UserDTO } from "../dtos/user-dto";
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import {buildUpdateQuery } from "../utils/Build-update-query"

export async function updateUserInfo(infoToUpdate:User){
    let infoToUpdateDTO:UserDTO = userToUserDTO(infoToUpdate)
    let client:PoolClient;
    try{
        client = await connectionPool.connect()
        let result:QueryResult = await client.query(buildUpdateQuery(infoToUpdateDTO))
        result = await client.query( `select * from project0.users u left join  project0.roles r on u."role_id"=r."role_id" where u."user_id"=${infoToUpdateDTO.user_id}`)
        console.log(result.rows)
        return result.rows
    }catch(e){
        console.log(e)
        throw new Error('unimplemented error handling')
    }finally{
        client && client.release()
    }
}