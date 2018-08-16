/* eslint-disable */
import {RENAME_CATEGORY, CATEGORIES_LIST, MOVE_CATEGORY, DELETE_CATEGORY, UP_SUBCATEGORY, DOWN_SUBCATEGORY, SUB_CATEGORIES_LIST, CATEGORIES_UPDATE} from '../constants/constants'

function groupCategories(categories) {
    return categories.length && categories.reduce((groups, category) => {
        if (!groups[category.parentID]) {groups[category.parentID] = []}
        groups[category.parentID].push(category);
        return groups
    }, {});
}
export default function categories(state = {categories: [], grouped: []}, action) {
    switch (action.type) {
        case CATEGORIES_LIST:
            let Cat = [...state.categories, action.payload];
            let groups = groupCategories(Cat);
            return { ...state, categories: Cat, grouped: groups};
        case CATEGORIES_UPDATE:
            let update = groupCategories(action.payload);
            return { ...state, categories: action.payload, grouped: update};
        case RENAME_CATEGORY:
            let copy = [...state.categories];
            copy[copy.findIndex((item) => item._id===action.payload._id)].name = action.payload.name;
            let rename = groupCategories(copy);
            return { ...state, categories: copy, grouped: rename};
        case DELETE_CATEGORY:
            let copyDel = [...state.categories];
            copyDel.splice(copyDel.findIndex((item) => item._id===action.payload), 1);
            let del = groupCategories(copyDel);
            return { ...state, categories: copyDel, grouped: del};
        case MOVE_CATEGORY:
            let copyUp = [...state.categories];
            let current = copyUp.findIndex(i => i._id === action.payload.current._id);
            let swap = copyUp.findIndex(i => i._id === action.payload.swap._id);
            copyUp[current].location = action.payload.swap.location;
            copyUp[swap].location = action.payload.current.location;
            let move = groupCategories(copyUp);
            return { ...state, categories: copyUp, grouped: move};
        case SUB_CATEGORIES_LIST:
            let temp = [...state.categories, action.payload];
            temp[temp.findIndex((item) => item._id===action.sub)].isSub = true;
            let change = groupCategories(temp);
            return { ...state, categories: temp, grouped: change}
        default:
            return state
    }
}
