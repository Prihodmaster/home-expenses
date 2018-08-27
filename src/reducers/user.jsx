import { SIGN_UP, SIGN_IN, GET_USER, SIGN_OUT } from '../constants/constants'

export default function user(state = {user: {}, message: ""}, action) {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, user: action.payload.user};
        case GET_USER:
            return { ...state, user: action.payload};
        case SIGN_UP:
            return {...state, message: action.payload};
        case SIGN_OUT:
            return {...state, user: {}, message: ""};
        default:
            return state
    }
}
