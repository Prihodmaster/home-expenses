/* eslint-disable */
import {RENAME_CATEGORY, CATEGORIES_LIST, MOVE_CATEGORY, DELETE_CATEGORY, UP_SUBCATEGORY, DOWN_SUBCATEGORY, SUB_CATEGORIES_LIST, CATEGORIES_UPDATE} from '../constants/constants'

export default function categories(state = {categories: []}, action) {
 switch (action.type) {
        case CATEGORIES_LIST:
            return { ...state, categories: [...state.categories, action.payload]};
        case CATEGORIES_UPDATE:
            return { ...state, categories: action.payload};
        case RENAME_CATEGORY:
            let copy = [...state.categories];
            copy[copy.findIndex((item) => item._id===action.payload._id)].name = action.payload.name;
            return { ...state, categories: copy};
        case DELETE_CATEGORY:
            let copyDel = [...state.categories];
            copyDel.splice(copyDel.findIndex((item) => item._id===action.payload), 1);
            return { ...state, categories: copyDel};
        case MOVE_CATEGORY:
            let copyUp = [...state.categories];
            let current = copyUp.findIndex(i => i._id == action.payload.current._id);
            let swap = copyUp.findIndex(i => i._id == action.payload.swap._id);
            copyUp[current].location = action.payload.swap.location;
            copyUp[swap].location = action.payload.current.location;
            return { ...state, categories: copyUp};




        case SUB_CATEGORIES_LIST:
            let sub = [...state.categories];
            const tempSub = sub[action.index].subCategories;
            tempSub.push(action.payload);
            sub[action.index].subCategories = tempSub;
            return { ...state, categories: sub};
        case UP_SUBCATEGORY:
            console.log(state.categories);
            console.log(action.index, action.swap);
            if (action.index !== 0) {
                console.log(state.categories);
                let copyUpSub = [...state.categories];
                console.log(action.index, action.swap);
                const tempCategoryUpSub = copyUpSub[action.index];
                copyUpSub[action.index] = copyUpSub[action.swap];
                copyUpSub[action.swap] = tempCategoryUpSub;
                return { ...state, categories: copyUpSub};
            }else return state
        case DOWN_SUBCATEGORY:
            let x = [...state.categories];
            if (action.indexSub !== x.length - 1) {
                const y = x[action.index].subCategories[action.indexSub];
                x[action.index].subCategories[action.indexSub] = x[action.index].subCategories[action.indexSub + 1];
                x[action.index].subCategories[action.indexSub + 1] = y;
                return { ...state, categories: x};
            }else return state;
        default:
            return state
    }
}

