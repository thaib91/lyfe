const initialState = {
    user: {}
}

const GET_USER_DATA = 'GET_USER_DATA';

export function getUserData(userData) {
    return {
        type: GET_USER_DATA,
        payload: userData
    }
}

export default function reducer(reduxState = initialState, action) {
    switch(action.type){
        case GET_USER_DATA:
            return{...reduxState, user:action.payload}
        default: return reduxState;
    }
}