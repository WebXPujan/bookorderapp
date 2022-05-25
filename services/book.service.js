

import { fetchWrapper } from '../helpers';
const baseUrl = 'http://localhost:5000';

export const bookService = {
  getAll,
  getById,
  update,
  delete: _delete,
  groupByName,
  register
};



function getAll() {
  return fetchWrapper.get(baseUrl+'/api/books');
}

function register(book) {
  //console.log(user);
  return fetchWrapper.post(`${baseUrl}/api/books/create`, book);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}
function groupByName(name) {
  return fetchWrapper.getByProps(baseUrl+'/api/books/public',name);
} 

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params)
      .then(x => {
          // update stored user if the logged in user updated their own record
          
          return x;
      });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/api/books/delete`,id);
}


