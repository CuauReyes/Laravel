// const apiURI = 'http://localhost:8000/api/v1';
const host = '';
// const host = window.location.hostname;
const apiURI = host + '/api/v1';

const PLANTS = 'plants';
const DEVICES = 'devices';
const AUTH = 'auth';
const USERS = 'users';

const api = {
	plants: {
		all: `${apiURI}/${PLANTS}`,
		get: (id) => `${apiURI}/${PLANTS}/${id}`,
	},
	devices: {
		all: `${apiURI}/${DEVICES}`,
		get: (id) => `${apiURI}/${DEVICES}/${id}`,
		post: `${apiURI}/${DEVICES}`,
	},
	auth: {
		login: `${apiURI}/${AUTH}/login`,
		register: `${apiURI}/${AUTH}/register`
	},
	users: {
		all: `${apiURI}/${USERS}`,
		get: (id) => `${apiURI}/${USERS}/${id}`,
	},
};

export {
	api
};
