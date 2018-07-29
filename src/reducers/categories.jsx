import {ADD_CATEGORIE_NAME, CATEGORIES_LIST, UP_CATEGORY, DOWN_CATEGORY, DELETE_CATEGORY, UP_SUBCATEGORY, DOWN_SUBCATEGORY, SUB_CATEGORIES_LIST} from '../constants/constants'

const initialState ={
    categories:  [
        {
            date: "Fri Jul 16 2018 08:59:35",
            name: "Развлечения",
            valueUAH: 160,
            description: "описание",
            subCategories: [
                {
                    name: 'коньки',
                    date: "Fri Jul 16 2018 08:59:33",
                    valueUAH: 78,
                    description: "описание"
                },
                {
                    name: 'ролики',
                    date: "Fri Jul 16 2018 08:59:33",
                    valueUAH: 82,
                    description: "описание"
                }
            ]
        },
        {
            date: "Fri Jul 16 2018 08:59:35",
            name: "покупки",
            valueUAH: 218,
            description: "описание",
            subCategories: [
                {
                    name: 'диван',
                    date: "Fri Jul 16 2018 08:59:33",
                    valueUAH: 108,
                    description: "описание"
                },
                {
                    name: 'стол',
                    date: "Fri Jul 16 2018 08:59:33",
                    valueUAH: 110,
                    description: "описание"
                }
            ]
        },
        {
            date: "Fri Jul 18 2018 08:50:35",
            name: "еда",
            valueUAH: 211,
            description: "описание другое",
            subCategories: [
                {
                    name: 'завтрак',
                    date: "Fri Jul 16 2018 09:59:35",
                    valueUAH: 104,
                    description: "описание"
                },
                {
                    name: 'обед',
                    date: "Fri Jul 16 2018 08:59:33",
                    valueUAH: 160,
                    description: "описание"
                },
                {
                    name: 'ужин',
                    date: "Fri Jul 16 2018 08:59:33",
                    valueUAH: 22,
                    description: "описание",
                    subCategories: [
                        {
                            name: 'пюре',
                            date: "Fri Jul 16 2018 08:59:35",
                            valueUAH: 16,
                            description: "описание"
                        },
                        {
                            name: 'макароны',
                            date: "Fri Jul 16 2018",
                            valueUAH: 22,
                            description: "описание",
                            subCategories: []
                        },
                        {
                            name: 'компот',
                            date: "Fri Jul 16 2018",
                            valueUAH: 222,
                            description: "описание",
                            subCategories: []
                        }
                    ]
                }
            ]
        }
    ]
};



// const initialState = {
//     categories: null
// }

export default function categories(state = initialState, action) {
    switch (action.type) {
        case CATEGORIES_LIST:
            return { ...state, categories: [...state.categories, action.payload]};

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
                let copyUp = [...state.categories];
                const tempCategoryUp = copyUp[action.index];
                copyUp[action.index] = copyUp[action.index - 1];
                copyUp[action.index - 1] = tempCategoryUp;
                return { ...state, categories: copyUp};
            }else return state
        case DOWN_CATEGORY:
            let copyDown = [...state.categories];
            if (action.index !== copyDown.length - 1) {
                const tempCategoryDown = copyDown[action.index];
                copyDown[action.index] = copyDown[action.index + 1];
                copyDown[action.index + 1] = tempCategoryDown;
                return { ...state, categories: copyDown};
            }else return state;
        case DELETE_CATEGORY:
            let copyDel = [...state.categories];
            copyDel.splice(action.index, 1);
            return { ...state, categories: copyDel};

        case UP_SUBCATEGORY:
            console.log(action.index, action.indexSub);
            // let q = [...state.categories];
            //
            //     const z = q[action.index].subCategories[action.indexSub];
            //     q[action.index].subCategories[action.indexSub] = q[action.index].subCategories[action.indexSub - 1];
            //     q[action.index].subCategories[action.indexSub - 1] = z;
            //     return { ...state, categories: q};
            return state;


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

