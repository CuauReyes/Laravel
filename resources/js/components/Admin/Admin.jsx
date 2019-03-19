import React, { Component } from "react";
import "./Admin.scss";
import Sidebar from "./Assets/Sidebar";
import { api } from "../../const/api";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			users: [],
			plants: [],
			devices: [],
			status: 0
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitDevice = this.handleSubmitDevice.bind(this);
		this.handleSubmitPlant = this.handleSubmitPlant.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		console.log(this.state.name);
		axios
			.post(
				api.users.all,
				{
					name: this.state.name,
					email: this.state.email,
					password: this.state.password,
					password_confirmation: this.state.password,
					status: this.state.status
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
					this.props.history.push("/plants");
				}
			})
			.catch(err => {
				console.log(err);
			});
		event.preventDefault();
	}

	handleSubmitDevice(event) {
		//console.log(this.state.name)
		axios
			.post(
				api.devices.all,
				{
					name: this.state.name,
					type: this.state.type,
					status: this.state.status,
					plant_id: this.state.plant_id
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
					this.props.history.push("/plants");
				}
			})
			.catch(err => {
				console.log(err);
			});
		event.preventDefault();
	}
	handleSubmitPlant(event) {
		//console.log(this.state.name)
		axios
			.post(
				api.plants.all,
				{
					name: this.state.name,
					description: this.state.description,
					location: this.state.location,
					url: this.state.url,
					key: this.state.key,
					img: this.state.img,
					status: this.state.status,
					user_id: this.state.user_id
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
					this.props.history.push("/plants");
				}
			})
			.catch(err => {
				console.log(err);
			});
		event.preventDefault();
	}

	componentDidMount() {
		axios.get(api.users.all).then(response => {
			this.setState({
				users: response.data
			});
		});
		axios.get(api.plants.all).then(response => {
			this.setState({
				plants: response.data
			});
		});
		axios.get(api.devices.all).then(response => {
			this.setState({
				devices: response.data
			});
		});
	}
	reloadPage() {
		location.reload();
	}
	deleteDevice(id) {
		console.log(id);
		axios.delete(api.devices.all + "/" + id).then(response => {});
	}
	deletePlant(id) {
		console.log(id);
		axios.delete(api.plants.all + "/" + id).then(response => {});
	}
	deleteUser(id) {
		console.log(id);
		axios.delete(api.users.all + "/" + id).then(response => {});
	}
	setOnUser(id) {
		console.log(id);
		axios.put(api.users.all + "/" + id + "/ON").then(response => {});
	}
	setOffUser(id) {
		console.log(id);
		axios.put(api.users.all + "/" + id + "/OFF").then(response => {});
	}
	setOnPlant(id) {
		console.log(id);
		axios.put(api.plants.all + "/" + id + "/ON").then(response => {});
	}
	setOffPlant(id) {
		console.log(id);
		axios.put(api.plants.all + "/" + id + "/OFF").then(response => {});
	}
	setOnDevice(id) {
		console.log(id);
		axios.put(api.devices.all + "/" + id + "/ON").then(response => {});
	}
	setOffDevice(id) {
		console.log(id);
		axios.put(api.devices.all + "/" + id + "/OFF").then(response => {});
	}

	render() {
		const { users } = this.state;
		const { plants } = this.state;
		const { devices } = this.state;

		return (
			<div>
				<div className="container-fluid">
					<h1>Admin</h1>
					<div className="row">
						<div className="col-md-4">
							<div className="card">
								<div className="card-header">Agregar nuevo cliente:</div>
								<form onSubmit={this.handleSubmit}>
									<div className="card-body">
										<div className="form-group">
											<label htmlFor="name">Nombre:</label>
											<input
												required
												type="text"
												className="form-control"
												id="name"
												name="name"
												value={this.state.name}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="email">Correo:</label>
											<input
												required
												type="email"
												className="form-control"
												id="email"
												name="email"
												value={this.state.email}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="password">Contraseña:</label>
											<input
												required
												type="text"
												className="form-control"
												id="password"
												name="password"
												value={this.state.password}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="status">Status:</label>
											<select
												className="form-control"
												id="status"
												name="status"
												value={this.state.status}
												onChange={this.handleChange}
											>
												<option value="1">Activo</option>
												<option value="0">Inactivo</option>
											</select>
										</div>
										<button
											type="submit"
											className="btn btn-primary"
											data-toggle="modal"
											data-target="#myModal3"
										>
											Aceptar
										</button>
										<div className="modal fade" id="myModal3">
											<div className="modal-dialog">
												<div className="modal-content">
													<div className="modal-header">
														<h4 className="modal-title">NoTE Admin</h4>
														<button
															type="button"
															className="close"
															data-dismiss="modal"
														>
															&times;
														</button>
													</div>

													<div className="modal-body">
														Usuario registrado correctamente...
													</div>

													<div className="modal-footer">
														<button
															type="button"
															className="btn btn-danger"
															data-dismiss="modal"
															onClick={() => this.reloadPage()}
														>
															Close
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card">
								<div className="card-header">Agregar planta:</div>
								<div className="card-body">
									<form onSubmit={this.handleSubmitPlant}>
										<div className="form-group">
											<label htmlFor="user_id">Usuario:</label>
											<select
												className="form-control"
												id="user_id"
												name="user_id"
												value={this.state.user_id}
												onChange={this.handleChange}
											>
												<option value="0">Selecciona usuario</option>
												{users.map((user, key) => (
													<option key={key} value={user._id}>
														{user.name}
													</option>
												))}
											</select>
										</div>
										<div className="form-group">
											<label htmlFor="name">Nombre:</label>
											<input
												required
												type="text"
												className="form-control"
												id="name"
												name="name"
												value={this.state.name}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="description">Descripción:</label>
											<input
												required
												type="text"
												className="form-control"
												id="description"
												name="description"
												value={this.state.description}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="location">Localización:</label>
											<input
												required
												type="text"
												className="form-control"
												id="location"
												name="location"
												value={this.state.location}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="url">Url:</label>
											<input
												required
												type="text"
												className="form-control"
												id="url"
												name="url"
												value={this.state.url}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="key">Key:</label>
											<input
												required
												type="text"
												className="form-control"
												id="key"
												name="key"
												value={this.state.key}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="img">Imagen:</label>
											<input
												required
												type="text"
												className="form-control"
												id="img"
												name="img"
												value={this.state.img}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="status">Status:</label>
											<select
												className="form-control"
												id="status"
												name="status"
												value={this.state.status}
												onChange={this.handleChange}
											>
												<option value="1">Activo</option>
												<option value="0">Inactivo</option>
											</select>
										</div>
										<button
											type="submit"
											className="btn btn-primary"
											data-toggle="modal"
											data-target="#myModal2"
										>
											Aceptar
										</button>
										<div className="modal fade" id="myModal2">
											<div className="modal-dialog">
												<div className="modal-content">
													<div className="modal-header">
														<h4 className="modal-title">NoTE Admin</h4>
														<button
															type="button"
															className="close"
															data-dismiss="modal"
														>
															&times;
														</button>
													</div>

													<div className="modal-body">
														Planta registrada correctamente...
													</div>

													<div className="modal-footer">
														<button
															type="button"
															className="btn btn-danger"
															data-dismiss="modal"
															onClick={() => this.reloadPage()}
														>
															Close
														</button>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card-header">Agregar Device:</div>
							<div className="card-body">
								<form onSubmit={this.handleSubmitDevice}>
									<div className="form-group">
										<label htmlFor="nameplant">Nombre:</label>
										<input
											required
											type="text"
											className="form-control"
											id="nameplant"
											name="name"
											value={this.state.name}
											onChange={this.handleChange}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="type">Tipo:</label>
										<select
											className="form-control"
											id="sel1"
											id="type"
											name="type"
											value={this.state.type}
											onChange={this.handleChange}
										>
											<option value="0">Selecciona usuario</option>
											<option value="ON-OFF">ON-OFF</option>
											<option value="TEMP">TEMPERATURE A</option>
											<option value="COUNTER">COUNTER</option>
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="plant_id">Planta:</label>
										<select
											className="form-control"
											id="plant_id"
											name="plant_id"
											value={this.state.plant_id}
											onChange={this.handleChange}
										>
											<option value="0">Selecciona planta</option>
											{plants.map((plant, key) => (
												<option key={key} value={plant._id}>
													{plant.name}
												</option>
											))}
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="status">Status:</label>
										<select
											className="form-control"
											id="status"
											name="status"
											value={this.state.status}
											onChange={this.handleChange}
										>
											<option value="1">Activo</option>
											<option value="0">Inactivo</option>
										</select>
									</div>
									<button
										type="submit"
										className="btn btn-primary"
										data-toggle="modal"
										data-target="#myModal"
									>
										Aceptar
									</button>
									<div className="modal fade" id="myModal">
										<div className="modal-dialog">
											<div className="modal-content">
												<div className="modal-header">
													<h4 className="modal-title">NoTE Admin</h4>
													<button
														type="button"
														className="close"
														data-dismiss="modal"
													>
														&times;
													</button>
												</div>

												<div className="modal-body">
													Device agregado correctamente...
												</div>

												<div className="modal-footer">
													<button
														type="button"
														className="btn btn-danger"
														data-dismiss="modal"
														onClick={() => this.reloadPage()}
													>
														Close
													</button>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="card mt-5">
					<div className="card-header">
						<h2 className="mt-3">Todos Los Clientes</h2>
					</div>
					<div className="col-md-12">
						<div className="input-group mt-3 mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Buscar"
							/>
							<div className="input-group-append">
								<button className="btn btn-success" type="submit">
									Go
								</button>
							</div>
						</div>

						<p>
							La siguiente tabla muestra todos los clientes registrados hasta el
							momento
						</p>
						<table className="table table-striped">
							<thead>
								<tr>
									<th>Nombre</th>
									<th>Email</th>
									<th>Status</th>
									<th>Creado</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, key) => (
									<tr key={key}>
										<td> {user.name}</td>
										<td> {user.email}</td>
										<td> {user.status}</td>
										<td> {user.created_at}</td>
										<button type="button" className="btn btn-secondary">
											<Link to={"/user/" + user._id}>Ver más</Link>
										</button>
										<button
											type="button"
											className="btn btn-success"
											data-toggle="modal"
											data-target="#habilitar"
											onClick={() => this.setOnUser(user._id)}
										>
											Habilitar
										</button>
										<button
											type="button"
											className="btn btn-warning"
											data-toggle="modal"
											data-target="#deshabilitar"
											onClick={() => this.setOffUser(user._id)}
										>
											Deshabilitar
										</button>
										<button
											type="button"
											className="btn btn-danger"
											data-toggle="modal"
											data-target="#eliminar"
											onClick={() => this.deleteUser(user._id)}
										>
											Eliminar
										</button>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="modal fade" id="habilitar">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">NoTE Admin</h4>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>

							<div className="modal-body">Habilitación correcta...</div>

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-danger"
									data-dismiss="modal"
									onClick={() => this.reloadPage()}
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade" id="deshabilitar">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">NoTE Admin</h4>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>

							<div className="modal-body">Deshabilitación correcta...</div>

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-danger"
									data-dismiss="modal"
									onClick={() => this.reloadPage()}
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade" id="eliminar">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">NoTE Admin</h4>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>

							<div className="modal-body">
								Registro eliminado correctamente...
							</div>

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-danger"
									data-dismiss="modal"
									onClick={() => this.reloadPage()}
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="card mt-5">
					<div className="card-header">
						<h2 className="mt-3">Todas Las Plantas</h2>
					</div>
					<div className="card-body">
						<table className="table table-striped">
							<thead>
								<tr>
									<th>Nombre</th>
									<th>Localización</th>
									<th>Url</th>
									<th>Key</th>
									<th>Status</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{plants.map((plant, key) => (
									<tr key={key}>
										<td> {plant.name}</td>
										<td> {plant.location}</td>
										<td> {plant.url}</td>
										<td> {plant.key}</td>
										<td> {plant.status}</td>
										<button
											type="button"
											className="btn btn-success"
											data-toggle="modal"
											data-target="#habilitar"
											onClick={() => this.setOnPlant(plant._id)}
										>
											Habilitar
										</button>
										<button
											type="button"
											className="btn btn-warning"
											data-toggle="modal"
											data-target="#deshabilitar"
											onClick={() => this.setOffPlant(plant._id)}
										>
											Deshabilitar
										</button>
										<button
											type="button"
											className="btn btn-danger"
											data-toggle="modal"
											data-target="#eliminar"
											onClick={() => this.deletePlant(plant._id)}
										>
											Eliminar
										</button>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="card mt-5">
					<div className="card-header">
						<h2 className="mt-3">Todos Los Devices</h2>
					</div>
					<div className="card-body">
						<table className="table table-striped">
							<thead>
								<tr>
									<th>Nombre</th>
									<th>Tipo</th>
									<th>Status</th>
									<th>Añadido</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{devices.map((device, key) => (
									<tr key={key}>
										<td> {device.name}</td>
										<td> {device.type}</td>
										<td> {device.status}</td>
										<td> {device.created_at}</td>
										<button
											type="button"
											className="btn btn-success"
											data-toggle="modal"
											data-target="#habilitar"
											onClick={() => this.setOnDevice(device._id)}
										>
											Habilitar
										</button>
										<button
											type="button"
											className="btn btn-warning"
											data-toggle="modal"
											data-target="#deshabilitar"
											onClick={() => this.setOffDevice(device._id)}
										>
											Deshabilitar
										</button>
										<button
											type="button"
											className="btn btn-danger"
											data-toggle="modal"
											data-target="#eliminar"
											onClick={() => this.deleteDevice(device._id)}
										>
											Eliminar
										</button>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
