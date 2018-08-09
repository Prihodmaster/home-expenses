import { combineReducers } from 'redux';
import user from './user';
import expenses from './expenses';
import categories from './categories';

export const rootReducer = combineReducers({
    userData: user,
    categoriesList: categories,
    expensesList: expenses
});