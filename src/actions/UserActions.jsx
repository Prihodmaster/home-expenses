import {
    // LOGIN_REQUEST,
    // LOGIN_FAIL,
    // LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    // ADD_CATEGORY,
    CATEGORIES_LIST,
    ADD_CATEGORIE_NAME,
    UP_CATEGORY,
    DOWN_CATEGORY,
    DELETE_CATEGORY,
    UP_SUBCATEGORY,
    DOWN_SUBCATEGORY,
    SIGN_UP,
    SIGN_IN,
    SUB_CATEGORIES_LIST,
    DASHBOARD_CATEGORIES_LIST,
    DASHBOARD_CATEGORIES_UPDATE
} from '../constants/constants';
import axios from 'axios';

export function logout() {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const signUp = newUser => dispatch => {
    axios.post('http://localhost:3001/user', newUser)
        .then(function (response) {
            console.log(response.data);
            dispatch(signUpOk(response.data))
        })
        .catch(function (error) {console.log(error)});
}
export const signUpOk = data => {
    return {
        type: 'SIGN_UP',
        payload: data
    }
}

export const signIn = newUser => dispatch => {
    axios.post('http://localhost:3001/login', newUser)
        .then(function (response) {
            console.log(response.data);
            dispatch(signInOk(response.data))
        })
        .catch(function (error) {console.log(error)});
}
export const signInOk = data => {
    return {
        type: 'SIGN_IN',
        payload: data
    }
}

export const addCategory = category => dispatch => {
    axios.post('http://localhost:3001/expenses/collections/categories', category)
        .then(function (response) {
            dispatch(setCategory(response.data))
        })
        .catch(function (error) {console.log(error)});
}
export const setCategory = (data) => {
        return {
            type: 'CATEGORIES_LIST',
            payload: data
        }
}
export function addSubcategory(subcategory, indexCategory) {
    return {
        type: SUB_CATEGORIES_LIST,
        index: indexCategory,
        payload: subcategory
    }
}
export function addCategoryName(categoryName, indexCategory) {
    return {
        type: ADD_CATEGORIE_NAME,
        name: categoryName,
        index: indexCategory
    }
}
export function upCategory(indexCategory) {
    return {
        type: UP_CATEGORY,
        index: indexCategory
    }
}
export function downCategory(indexCategory) {
    return {
        type: DOWN_CATEGORY,
        index: indexCategory
    }
}
export function deleteCategory(indexCategory) {
    return {
        type: DELETE_CATEGORY,
        index: indexCategory
    }
}
export function upSubCategory(indexCategory, indexSubCategory) {
    return {
        type: UP_SUBCATEGORY,
        index: indexCategory,
        indexSub: indexSubCategory
    }
}
export function downSubCategory(indexCategory, indexSubCategory) {
    return {
        type: DOWN_SUBCATEGORY,
        index: indexCategory,
        indexSub: indexSubCategory
    }
}

export const dashboardAddCategory = category => dispatch => {
    axios.post('http://localhost:3001/expenses/collections/dashboards', category)
        .then(function (response) {
            dispatch(setDashboardAddCategory(response.data))
        })
        .catch(function (error) {console.log(error)});
};
export const setDashboardAddCategory = (data) => {
    return {
        type: 'DASHBOARD_CATEGORIES_LIST',
        payload: data
    }
};

export const dashboardUpdate = category => dispatch => {
    axios.get('http://localhost:3001/expenses/collections/dashboards/')
        .then(function (response) {
            console.log(response.data);
            dispatch(setDashboardUpdate(response.data))
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        });
};
export const setDashboardUpdate = (data) => {
    return {
        type: 'DASHBOARD_CATEGORIES_UPDATE',
        payload: data
    }
};

// получить массив с категориями с базы данных
// axios.get('http://localhost:3001/expenses/')
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
//     .then(function () {
//     });


// axios.post('http://localhost:3001/expenses', category)
//     .then(function (response) {
//         response = response.data;
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });