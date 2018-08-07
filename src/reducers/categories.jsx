import {ADD_CATEGORIE_NAME, CATEGORIES_LIST, UP_CATEGORY, DOWN_CATEGORY, DELETE_CATEGORY, UP_SUBCATEGORY, DOWN_SUBCATEGORY, SUB_CATEGORIES_LIST, CATEGORIES_UPDATE} from '../constants/constants'

// const initialState = {
//     categories:  [
//         {
//             id: 1,
//             parentID: 0,
//             date: "Fri Jul 15 2018 08:59:35",
//             name: "категория1",
//             valueUAH: 160,
//             description: "описание"
//         },
//         {
//             id: 2,
//             parentID: 0,
//             date: "Fri Jul 16 2018 08:59:35",
//             name: "категория2",
//             valueUAH: 130,
//             description: "описание"
//         },
//         {
//             id: 4,
//             parentID: 1,
//             date: "Fri Jul 17 2018 10:59:35",
//             name: "подкатегория1",
//             valueUAH: 160,
//             description: "описание"
//         },
//         {
//             id: 3,
//             parentID: 1,
//             date: "Fri Jul 17 2018 09:59:35",
//             name: "подкатегория1111",
//             valueUAH: 160,
//             description: "описание"
//         },
//         {
//             id: 5,
//             parentID: 2,
//             date: "Fri Jul 17 2018 22:59:35",
//             name: "подкатегория2",
//             valueUAH: 160,
//             description: "описание"
//         },
//         {
//             id: 6,
//             parentID: 2,
//             date: "Fri Jul 17 2018 23:59:35",
//             name: "подкатегория2",
//             valueUAH: 160,
//             description: "описание"
//         },
//         {
//             id: 7,
//             parentID: 4,
//             date: "Fri Jul 15 2018 08:59:35",
//             name: "подподкатегория1",
//             valueUAH: 44,
//             description: "описание"
//         },
//         {
//             id: 8,
//             parentID: 4,
//             date: "Fri Jul 15 2018 08:59:35",
//             name: "подподкатегория1",
//             valueUAH: 526,
//             description: "описание"
//         },
//         {
//             id: 9,
//             parentID: 5,
//             date: "Fri Jul 17 2018 10:59:35",
//             name: "подподкатегория2",
//             valueUAH: 160,
//             description: "описание"
//         },
//         {
//             id: 10,
//             parentID: 5,
//             date: "Fri Jul 17 2018 10:59:35",
//             name: "подподкатегория2",
//             valueUAH: 160,
//             description: "описание"
//         },
//         {
//             id: 11,
//             parentID: 7,
//             date: "Fri Jul 17 2018 10:59:35",
//             name: "подподподкатегория1",
//             valueUAH: 160,
//             description: "описание"
//         },
//         {
//             id: 12,
//             parentID: 9,
//             date: "Fri Jul 17 2018 10:59:35",
//             name: "подподподкатегория2",
//             valueUAH: 160,
//             description: "описание"
//         },
//         {
//             id: 13,
//             parentID: 0,
//             date: "Fri Jul 15 2018 08:59:35",
//             name: "категория3",
//             valueUAH: 160,
//             description: "описание"
//         },
//         {
//             id: 14,
//             parentID: 13,
//             date: "Fri Jul 15 2018 08:59:35",
//             name: "подкатегория3",
//             valueUAH: 160,
//             description: "описание"
//         },
//         {
//             id: 15,
//             parentID: 13,
//             date: "Fri Jul 15 2018 08:59:35",
//             name: "подкатегория3",
//             valueUAH: 160,
//             description: "описание"
//         },
//     ]
// };



const initialState = {
    categories: [
        // {
        //     date: "Mon Aug 06 2018 18:52:27 GMT+0300 (Восточная Европа, летнее время)",
        //     description: "",
        //     location: 5,
        //     name: "",
        //     parentID: 0,
        //     children: false,
        //     userID: "5b68589334651b081c0a38c9",
        //     valueUAH: 0,
        //     __v: 0,
        //     _id: "5b686ebbe0da8f1318704bda"
        // }
    ]
}

export default function categories(state = initialState, action) {
    switch (action.type) {
        case CATEGORIES_LIST:
            return { ...state, categories: [...state.categories, action.payload]};
        case CATEGORIES_UPDATE:
            return { ...state, categories: action.payload};
        case SUB_CATEGORIES_LIST:
            let sub = [...state.categories];
            const tempSub = sub[action.index].subCategories;
            tempSub.push(action.payload);
            sub[action.index].subCategories = tempSub;
            return { ...state, categories: sub};
        case ADD_CATEGORIE_NAME:
            let copy = [...state.categories];
            copy[action.index].name = action.name;
            return { ...state, categories: copy};
        case UP_CATEGORY:
            if (action.index !== 0) {
                console.log(action.index, action.swap);
                let copyUp = [...state.categories];
                const tempCategoryUp = copyUp[action.index];
                copyUp[action.index] = copyUp[action.swap];
                copyUp[action.swap] = tempCategoryUp;
                return { ...state, categories: copyUp};
            }else return state
        case DOWN_CATEGORY:
            let copyDown = [...state.categories];
            if (action.index !== copyDown.length - 1 && action.swap !== 0) {
                const tempCategoryDown = copyDown[action.index];
                copyDown[action.index] = copyDown[action.swap];
                copyDown[action.swap] = tempCategoryDown;
                return { ...state, categories: copyDown};
            }else return state;
        case DELETE_CATEGORY:
            let copyDel = [...state.categories];
            copyDel.splice(action.index, 1);
            return { ...state, categories: copyDel};
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

