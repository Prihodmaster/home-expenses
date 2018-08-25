import {
    RENAME_CATEGORY,
    CATEGORIES_LIST,
    MOVE_CATEGORY,
    DELETE_CATEGORY,
    SUB_CATEGORIES_LIST,
    CATEGORIES_UPDATE,
    REMOVE_FROM_SUB
} from '../constants/constants'

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
            copyDel.forEach(item => {
                if(item.parentID===action.payload){item.parentID="0"; item.isSub=false}
                action.arr.forEach(i => {if(item._id===i){item.isSub=false}})
            });
            copyDel.splice(copyDel.findIndex((item) => item._id===action.payload), 1);
            let del = groupCategories(copyDel);
            return { ...state, categories: copyDel, grouped: del};

        case MOVE_CATEGORY:
            let copyMove = [...state.categories];
            let current = copyMove.findIndex(i => i._id === action.payload.current._id);
            let swap = copyMove.findIndex(i => i._id === action.payload.swap._id);
            copyMove[current].location = action.payload.swap.location;
            copyMove[swap].location = action.payload.current.location;
            let move = groupCategories(copyMove);
            return { ...state, categories: copyMove, grouped: move};

        case SUB_CATEGORIES_LIST:
            let temp = [...state.categories, action.payload];
            temp[temp.findIndex((item) => item._id===action.payload.subFromID)].isSub = true;
            let change = groupCategories(temp);
            return { ...state, categories: temp, grouped: change};

        case REMOVE_FROM_SUB:
            let tempSub = [...state.categories];
            let currentSub = tempSub.findIndex(item => item._id===action.payload._id);
            let main = tempSub.findIndex(item => item._id===action.payload.subFromID);
            tempSub[currentSub].isSub = false;
            tempSub[currentSub].parentID = "0";
            if(tempSub[main]){tempSub[main].isSub = false;}
            let changeSub = groupCategories(tempSub);
            return { ...state, categories: tempSub, grouped: changeSub};

        default:
            return state
    }
}
