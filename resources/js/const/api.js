const apiURI = 'http://localhost:8000/api/v1';

const PLANTS = 'plants';
const DEVICES = 'devices';
const AUTH = 'auth';

const api = {
	plants: {
		all: `${apiURI}/${PLANTS}`,
		get: (id) => `${apiURI}/${PLANTS}/${id}`,
	},
	devices: {
		all: `${apiURI}/${DEVICES}`,
		get: (id) => `${apiURI}/${DEVICES}/${id}`,
	},
	auth: {
		login: `${apiURI}/${AUTH}/login`,
		register: `${apiURI}/${AUTH}/register`
	}
};

export {
	api
};
