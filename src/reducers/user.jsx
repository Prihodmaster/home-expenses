import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGN_UP, SIGN_IN } from '../constants/constants'

const initialState ={
    email: "",
    password: "",
    repeatPassword: "",
}

export default function user(state = initialState, action) {
    switch (action.type) {

        case SIGN_IN:
            return {
                ...state,
                email: action.email,
                password: action.password,
            };

        case SIGN_UP:
            return {};

        case LOGIN_REQUEST:
            return {};

        case LOGIN_SUCCESS:
            return {};

        case LOGIN_FAIL:
            return {};

        case LOGOUT_SUCCESS:
            return {};

        default:
            return state
    }
}
