/* eslint-disable */
import {
    VERIFY_EMAIL_OK,
    CATEGORIES_LIST,
    ADD_CATEGORIE_NAME,
    UP_CATEGORY,
    DOWN_CATEGORY,
    DELETE_CATEGORY,
    UP_SUBCATEGORY,
    DOWN_SUBCATEGORY,
    SIGN_UP,
    SIGN_IN,
    SIGN_OUT,
    SUB_CATEGORIES_LIST,
    DASHBOARD_CATEGORIES_LIST,
    DASHBOARD_CATEGORIES_UPDATE,
    CATEGORIES_UPDATE
} from '../constants/constants';
import axios from 'axios';
import history from '../index';

export const signUp = newUser => dispatch => {
    axios.post('http://localhost:3001/signup', newUser)
        .then((response) => {
            response.data === 'user with this email already exists' ? alert(response.data): dispatch(signUpOk(response.data))
        })
        .catch((error) => {console.log(error)});
}
export const signUpOk = data => {
    return {
        type: 'SIGN_UP',
        payload: data
    }
}
export const verifyEmail = newUser => dispatch => {
    axios.post('http://localhost:3001/verify', newUser)
        .then(function (response) {
            response.data === 'Incorrect email / verification code' ? alert(response.data): dispatch(signInOk(response.data))
            console.log(response.data);
        })
        .catch(function (error) {console.log(error)});
}
export const signIn = newUser => dispatch => {
    axios.post('http://localhost:3001/signin', newUser)
        .then(function (response) {
            response.data === 'Incorrect email/password' ? alert(response.data): dispatch(signInOk(response.data))
        })
        .catch(function (error) {console.log(error)});
}
export const signInOk = data => {
    console.log(data);
    if(data.token) localStorage.setItem('token', data.token);
    if(localStorage.getItem('token'))  history.push('/dashboard');
    return {
        type: 'SIGN_IN',
        payload: data
    }
}
export const signOut = () => {
    localStorage.clear();
    return {
        type: 'SIGN_OUT',
        payload: null
    }
}



export const addCategory = category => dispatch => {
    axios.post('http://localhost:3001/categories', category)
        .then(function (response) {
            console.log(response.data);
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
export function addCategoryName(categoryName, index) {
    return {
        type: ADD_CATEGORIE_NAME,
        name: categoryName,
        index: index
    }
}
export function upCategory(index, swap) {
    return {
        type: UP_CATEGORY,
        index: index,
        swap: swap
    }
}
export function downCategory(index, swap) {
    return {
        type: DOWN_CATEGORY,
        index: index,
        swap: swap
    }
}
export function deleteCategory(index) {
    return {
        type: DELETE_CATEGORY,
        index: index
    }
}
export function upSubCategory(index, swap) {
    return {
        type: UP_SUBCATEGORY,
        index: index,
        swap: swap
    }
}
export function downSubCategory(index, swap) {
    return {
        type: DOWN_SUBCATEGORY,
        index: index,
        swap: swap
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

export const dashboardUpdate = dispatch => {
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

export const categoriesUpdate = () => dispatch => {
    axios.get('http://localhost:3001/categories')
        .then(function (response) {
            console.log(response.data);
            dispatch(setCategoriesUpdate(response.data))
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        });
};
export const setCategoriesUpdate = (data) => {
    return {
        type: 'CATEGORIES_UPDATE',
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