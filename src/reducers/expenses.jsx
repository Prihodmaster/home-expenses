import {EXPENSES_LIST, EXPENSES_UPDATE} from '../constants/constants'

function groupExpenses(categories) {
    return categories.length && categories.reduce((groups, category) => {
        if (!groups[category.parentID]) {groups[category.parentID] = []}
        groups[category.parentID].push(category);
        return groups
    }, {});
}
function groupDesc(categories) {
    return categories.length && categories.map(item => {
        return {label: item.description.toLowerCase()}
    })
}
export default function expenses(state = {expenses: [], grouped: [], desclist: []}, action) {
    switch (action.type) {
        case EXPENSES_LIST:
            let Exp = [...state.expenses, action.payload];
            let groups = groupExpenses(Exp);
            let descAdd = groupDesc(Exp);
            return { ...state, expenses: [...state.expenses, action.payload], grouped: groups, desclist: descAdd};
        case EXPENSES_UPDATE:
            let update = groupExpenses(action.payload);
            let descUpdate = groupDesc(action.payload);
            return { ...state, expenses:  action.payload, grouped: update, desclist: descUpdate};
        default:
            return state
    }
}

