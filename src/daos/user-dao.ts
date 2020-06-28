import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";

//this is going to contain all the functions that modify our book table
export async function getAllUsers(){
    let client:PoolClient;
    //promises should ALWAYS be inside a try/catch block
    try{
        client = await connectionPool.connect()
        let results:QueryResult = await client.query('select "user_id", "username", "password", "first_name", "last_name", "email","role" from project0.users u left join  project0.roles r on u."role_id"=r."role_id";')
        return results.rows
    }catch(e){
        //should have some sort of error handling in catch statement
        console.log(e)
        throw new Error('un-implemented error handling')
    }finally{
        //guard operator- check client !defined
        client && client.release()
    }
}
export async function getUserById(id:BigInt){
    let clinet:PoolClient;
    try{
        clinet = await connectionPool.connect();
        let result:QueryResult = await clinet.query(`select "user_id", "username", "password", "first_name", "last_name", "email", "role" from project0.users u left join  project0.roles r on u."role_id"=r."role_id" where u."user_id"=${id};
        `)
        return result.rows
    }catch(e){
        throw new Error('un-inpelemented error handling')
        console.log(e)
    }

}