import {
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD2,
  CHANGE_ERRORS,
} from "./regTypes";


export const changeName=(name)=>{ 
    return {
        type: CHANGE_NAME,
        payload: name
    }
}
export const changeEmail=(email)=>{ 
    return {
        type: CHANGE_EMAIL,
        payload: email
    }
}
export const changePassword=(password)=>{ 
    return {
        type: CHANGE_PASSWORD,
        payload: password
    }
}
export const changePassword2=(password2)=>{ 
    return {
        type: CHANGE_PASSWORD2,
        payload: password2
    }
}
// export const changeErrors=(errors)=>{ 
//     return {
//         type: CHANGE_ERRORS,
//         payload: errors
//     }
// }
