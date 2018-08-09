import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGN_UP, SIGN_IN, VERIFY_EMAIL_OK, SIGN_OUT } from '../constants/constants'

const initialState ={
    user: {
        email: "qqq",
        password: "qqq",
        verified: true,
        verifyKey: 0,
        __v: 0,
        _id: "5b6994cbdb833a0e300998d6"
    }
};

export default function user(state = initialState, action) {
    switch (action.type) {

        case SIGN_IN:
            console.log(action.payload.user);
            return { ...state, user: action.payload.user};

        case SIGN_UP:
            console.log(action.payload);
            return {};

        case SIGN_OUT:
        return {};

        case VERIFY_EMAIL_OK:
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
