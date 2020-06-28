import { User } from "../Models/User";
import { UserDTO } from "../dtos/user-dto";

export function userToUserDTO(userInfo:User):UserDTO{
    let userIdValue
    if(userInfo.role!==undefined){
        userIdValue = userInfo.role.roleId
    }else{
        userIdValue = undefined
    }
    return{
        
        user_id: userInfo.userId,
        username: userInfo.username,
        password: userInfo.password,
        first_name: userInfo.firstName,
        last_name: userInfo.lastName,
        email: userInfo.email,
        role_id: userIdValue
    }

}