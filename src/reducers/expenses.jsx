import {EXPENSES_LIST, EXPENSES_UPDATE} from '../constants/constants'

export default function expenses(state = {}, action) {
    switch (action.type) {
        case EXPENSES_LIST:
            return { ...state, expenses: [...state.expenses, action.payload]};
        case EXPENSES_UPDATE:
            return { ...state, expenses:  action.payload};
        default:
            return state
    }
}

