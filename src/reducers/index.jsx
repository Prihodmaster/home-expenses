import { combineReducers } from 'redux';
import user from './user';
import dashboardCategories from './dashboardCategories';
import categories from './categories';

export const rootReducer = combineReducers({
    userData: user,
    categoriesList: categories,
    dashboardCategoriesList: dashboardCategories
});