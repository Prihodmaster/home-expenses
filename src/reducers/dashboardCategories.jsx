import {DASHBOARD_CATEGORIES_LIST, DASHBOARD_CATEGORIES_UPDATE} from '../constants/constants'

const initialState ={
    dashboardCategories: [
        {
            date: "Fri Jul 16 2018 08:59:35",
            name: "dashboardCategories2",
            valueUAH: "16",
            description: "описание",
            subCategories: [
                {
                    name: 'subcategory2',
                    date: "Fri Jul 16 2018 08:59:33",
                    valueUAH: "16",
                    description: "описание"
                }
            ]
        },
        {
            date: "Fri Jul 18 2018 08:50:35",
            name: "dashboardCategories",
            valueUAH: "18",
            description: "описание другое",
            subCategories: [
                {
                    name: 'subcategory2',
                    date: "Fri Jul 16 2018 09:59:35",
                    valueUAH: "16",
                    description: "описание",
                    subCategories: [
                        {
                            name: 'subcategory2',
                            date: "Fri Jul 16 2018 08:59:35",
                            valueUAH: "16",
                            description: "описание"
                        },
                        {
                            name: 'subcategory2',
                            date: "Fri Jul 16 2018",
                            valueUAH: "16",
                            description: "описание",
                            subCategories: [
                                {
                                name: 'subcategory2',
                                date: "Fri Jul 16 2018",
                                valueUAH: "16",
                                description: "описание"
                                 }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};



export default function dashboardCategories(state = initialState, action) {
    switch (action.type) {

        case DASHBOARD_CATEGORIES_LIST:
            return { ...state, dashboardCategories: [...state.dashboardCategories, action.payload]};

        case DASHBOARD_CATEGORIES_UPDATE:
            return { ...state, dashboardCategories:  action.payload};

        default:
            return state
    }
}

