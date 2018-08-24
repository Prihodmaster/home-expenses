import { SIGN_UP, SIGN_IN, GET_USER } from '../constants/constants'

export default function user(state = {user: {}}, action) {
    switch (action.type) {
        case SIGN_IN:
            console.log(action.payload.user);
            return { ...state, user: action.payload.user};
        case GET_USER:
            // console.log(action.payload);
            return { ...state, user: action.payload};
        case SIGN_UP:
            console.log(action.payload);
            return {};
        default:
            return state
    }
}
