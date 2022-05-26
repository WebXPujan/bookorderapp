import { fetchWrapper } from '../helpers';
const baseUrl = 'http://65.0.157.168:5000';

export const orderService = {
  getAll,
  getById,
  update,
  delete: _delete,
  createOrder
};



function getAll() {
  return fetchWrapper.get(baseUrl+'/api/order');
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function createOrder(params) {
  return fetchWrapper.post(`${baseUrl}/api/order`,params)
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
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
