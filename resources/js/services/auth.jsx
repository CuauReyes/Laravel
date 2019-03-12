import { api } from "../const/api";
import Axios from "axios";

export default class AuthService {
	login(email, password, remember_me) {
		return new Promise((resolve, reject) => {
			Axios.post(
				api.auth.login,
				{
					email,
					password,
					remember_me
				},
				{
					headers: {
						"Content-Type": "application/json",
						"X-Requested-With": "XMLHttpRequest"
					}
				}
			)
				.then(response => {
					if (response.data) {
						window.localStorage.setItem("token", response.data.access_token);
						window.localStorage.setItem(
							"user",
							JSON.stringify(response.data.user)
						);
						resolve(response.data);
					}
					reject();
				})
				.catch(err => {
					reject(err);
				});
		});
	}
}
