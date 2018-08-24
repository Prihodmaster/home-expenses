/* eslint-disable */
import {
    CATEGORIES_LIST,
    RENAME_CATEGORY,
    MOVE_CATEGORY,
    DELETE_CATEGORY,
    SIGN_UP,
    SIGN_IN,
    SIGN_OUT,
    GET_USER,
    SUB_CATEGORIES_LIST,
    EXPENSES_LIST,
    EXPENSES_UPDATE,
    REMOVE_FROM_SUB,
    CATEGORIES_UPDATE
} from '../constants/constants';
import axios from 'axios';
import history from '../index';

// let main = {
//     body: category,
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer "+localStorage.getItem('token')}
// };

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
        .then(response => {
            response.data === 'Incorrect email/password' || response.data === 'User is not verified' ?
                alert(response.data):
                dispatch(signInOk(response.data))
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

export const getUser = token => dispatch => {
    axios.post('http://localhost:3001/user', token)
        .then(response => {dispatch(getUserOk(response.data))})
        .catch(error => {console.log(error)});
}
export const getUserOk = data => {
    return {
        type: 'GET_USER',
        payload: data
    }
}

// export const categoriesUpdate = () => dispatch => {
//     axios.get('http://localhost:3001/categories')
//         .then(function (response) {dispatch(categoriesUpdateOk(response.data))})
//         .catch(function (error) {console.log(error)})
// };
export const categoriesUpdate = (token) => dispatch => {
    axios.post('http://localhost:3001/categories', token)
        .then(function (response) {dispatch(categoriesUpdateOk(response.data))})
        .catch(function (error) {console.log(error)})
};
export const categoriesUpdateOk = data => {
    return {
        type: 'CATEGORIES_UPDATE',
        payload: data
    }
};
export const addCategory = category => dispatch => {
    axios.post('http://localhost:3001/categories/add', category)
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
        .then(function (response) {dispatch(deleteCategoryOk(response.data, del.arrSub))})
        .catch(function (error) {console.log(error)});
}
export const deleteCategoryOk = (data, arr) => {
    return {
        type: 'DELETE_CATEGORY',
        payload: data,
        arr: arr,
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

// export const expensesUpdate = () => dispatch => {
//     axios.get('http://localhost:3001/expenses')
//         .then(response => dispatch(expensesUpdateOk(response.data)))
//         .catch(error => console.log(error))
// };
export const expensesUpdate = (token) => dispatch => {
    axios.post('http://localhost:3001/expenses', token)
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
    axios.post('http://localhost:3001/expenses/add', data)
        .then(response => dispatch(addExpenseOk(response.data)))
        .catch(error => console.log(error));
}
export const addExpenseOk = data => {
    return {
        type: 'EXPENSES_LIST',
        payload: data
    }
}

export const addSubcategory = sub => dispatch => {
    axios.post('http://localhost:3001/sub', sub)
        .then(response => dispatch(addSubcategoryOk(response.data)))
        .catch(error => console.log(error));
}
export const addSubcategoryOk = data => {
    return {
        type: 'SUB_CATEGORIES_LIST',
        payload: data
    }
}

export const removeFromSub = sub => dispatch => {
    axios.post('http://localhost:3001/sub/remove', sub)
        .then(response => dispatch(removeFromSubOk(response.data)))
        .catch(error => console.log(error));
}
export const removeFromSubOk = data => {
    return {
        type: 'REMOVE_FROM_SUB',
        payload: data
    }
}
