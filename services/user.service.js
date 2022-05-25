import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers'; 


const baseUrl = 'http://localhost:5000';
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(phone, password) {
   
    return fetchWrapper.post(`${baseUrl}/auth/login`, {phone,password})
        .then(res => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            res.authdata = window.btoa(phone + ':' + password);
            userSubject.next(res);
           
            localStorage.setItem('user', JSON.stringify(res));

            return res;
        });
    
        
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

function register(user) {
    //console.log(user);
    return fetchWrapper.post(`${baseUrl}/api/users`, user);
}

function getAll() {
    return fetchWrapper.get(baseUrl+'/api/users');
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}