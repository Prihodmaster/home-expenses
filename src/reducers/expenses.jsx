import {EXPENSES_LIST, EXPENSES_UPDATE} from '../constants/constants'

function groupExpenses(categories) {
    return categories.length && categories.reduce((groups, category) => {
        if (!groups[category.parentID]) {groups[category.parentID] = []}
        groups[category.parentID].push(category);
        return groups
    }, {});
}
export default function expenses(state = {expenses: [], grouped: []}, action) {
    switch (action.type) {
        case EXPENSES_LIST:
            let Exp = [...state.expenses, action.payload];
            let groups = groupExpenses(Exp);
            return { ...state, expenses: [...state.expenses, action.payload], grouped: groups};
        case EXPENSES_UPDATE:
            let update = groupExpenses(action.payload);
            return { ...state, expenses:  action.payload, grouped: update};
        default:
            return state
    }
}

