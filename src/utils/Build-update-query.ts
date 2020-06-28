import { UserDTO } from "../dtos/user-dto";

export function buildUpdateQuery(dataToChange:UserDTO){
    let userStr:string = ''
    let passwordStr:string = ''
    let firstNameStr:string = ''
    let lastNameStr:string = ''
    let emailStr:string = ''
    let roleIdStr:string = ''
    console.log(dataToChange.user_id)

    if(dataToChange.username!==undefined){
        userStr = `, "username"='${dataToChange.username}' `
    }
    if(dataToChange.password!==undefined){
        passwordStr = `, "password"='${dataToChange.password}'`
    }
    if(dataToChange.first_name!==undefined){
        firstNameStr = `, "first_name"='${dataToChange.first_name}'`
    }
    if(dataToChange.last_name!==undefined){
        lastNameStr = `, "last_name"='${dataToChange.last_name}'`
    }
    if(dataToChange.email!==undefined){
        emailStr = `, "email"='${dataToChange.email}'`
    }
    if(dataToChange.role_id!==undefined){
        roleIdStr = `, "role_id"=${dataToChange.role_id}`
    }

    let sqlScript:string = `update project0.users u set "user_id" = 
    ${dataToChange.user_id}${userStr}${passwordStr}${firstNameStr}${lastNameStr}${emailStr}${roleIdStr} 
     where "user_id"=${dataToChange.user_id};`
    console.log(sqlScript)
     return sqlScript
}