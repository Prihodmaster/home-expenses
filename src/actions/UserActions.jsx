/* eslint-disable */
import {
    CATEGORIES_LIST,
    RENAME_CATEGORY,
    MOVE_CATEGORY,
    DELETE_CATEGORY,
    UP_SUBCATEGORY,
    DOWN_SUBCATEGORY,
    SIGN_UP,
    SIGN_IN,
    SIGN_OUT,
    SUB_CATEGORIES_LIST,
    EXPENSES_LIST,
    EXPENSES_UPDATE,
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

export const categoriesUpdate = () => dispatch => {
    axios.get('http://localhost:3001/categories')
        .then(function (response) {dispatch(categoriesUpdateOk(response.data))})
        .catch(function (error) {console.log(error)})
};
export const categoriesUpdateOk = (data) => {
    return {
        type: 'CATEGORIES_UPDATE',
        payload: data
    }
};
export const addCategory = category => dispatch => {
    axios.post('http://localhost:3001/categories', category)
        .then(function (response) {dispatch(addCategoryOk(response.data))})
        .catch(function (error) {console.log(error)});
}
export const addCategoryOk = data => {
        return {
            type: 'CATEGORIES_LIST',
            payload: data
        }
}

export const renameCategory = rename => dispatch => {
    axios.post('http://localhost:3001/categories/rename', rename)
        .then(function (response) {
            dispatch(renameCategoryOk(response.data))
        })
        .catch(function (error) {console.log(error)});
}
export const renameCategoryOk = data => {
    return {
        type: 'RENAME_CATEGORY',
        payload: data
    }
}

export const deleteCategory = del => dispatch => {
    axios.post('http://localhost:3001/categories/delete', del)
        .then(function (response) {
            console.log(response.data);
            dispatch(deleteCategoryOk(response.data))
        })
        .catch(function (error) {console.log(error)});
}
export const deleteCategoryOk = data => {
    return {
        type: 'DELETE_CATEGORY',
        payload: data
    }
}

export const moveCategory = data => dispatch => {
    axios.post('http://localhost:3001/categories/move', data)
        .then(response => dispatch(moveCategoryOk(response.data)))
        .catch(error => console.log(error));
}
export const moveCategoryOk = data => {
    return {
        type: MOVE_CATEGORY,
        payload: data
    }
}

export const expensesUpdate = () => dispatch => {
    axios.get('http://localhost:3001/expenses')
        .then(response => dispatch(expensesUpdateOk(response.data)))
        .catch(error => console.log(error))
};
export const expensesUpdateOk = data => {
    return {
        type: 'EXPENSES_UPDATE',
        payload: data
    }
};
export const addExpense = data => dispatch => {
    axios.post('http://localhost:3001/expenses', data)
        .then( response => dispatch(addExpenseOk(response.data)))
        .catch(error => console.log(error));
}
export const addExpenseOk = data => {
    return {
        type: 'EXPENSES_LIST',
        payload: data
    }
}

export const addSubcategory = (sub, id) => dispatch => {
    axios.post('http://localhost:3001/sub', sub)
        .then(function (response) {dispatch(addSubcategoryOk(response.data, id))})
        .catch(function (error) {console.log(error)});
}
export const addSubcategoryOk = (data, id) => {
    return {
        type: 'SUB_CATEGORIES_LIST',
        payload: data,
        sub: id,
    }
}
