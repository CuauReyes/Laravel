import React, { Component } from "react";
import "./Admin.scss";
import Sidebar from "./Assets/Sidebar";
import ClientsTable from "./Clients/Table";
import DevicesTable from "./Devices/Table";
import PlantsTable from "./Plants/Table";
import DevicesAdd from "./Devices/Add";
import ClientsAdd from "./Clients/Add";
import PlantsAdd from "./Plants/Add";
import { api } from "../../const/api";
import axios from "axios";

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
		this.loadData = this.loadData.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

<<<<<<< HEAD
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
					status: this.state.status,
					plants: this.state.plantas,
					
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
	
	handleSubmitAddPlant(event) {
		console.log(this.state.user_id)
		axios
			.put(
				api.users.get(this.state.user_id)+"/addPlant",
				{
					user_id: this.state.user_id,
					plant_id: this.state.addplantas	
				},
			)
			.then(response => {
			
			})
			.catch(err => {
				console.log(err);
			});
		event.preventDefault();
	}

	handleSubmitAddDeviceImg(event) {
		var bodyFormData = new FormData();
		bodyFormData.set('input_img');
		bodyFormData.append('image', imageFile);

		
=======
	componentDidMount() {
		this.loadData();
>>>>>>> 2b124d70f6c3d3e65b72eedec5687c06c6682199
	}

	async loadData() {
		let users = axios.get(api.users.all);
		let plants = axios.get(api.plants.all);
		let devices = axios.get(api.devices.all);
		Promise.all([users, plants, devices]).then(response => {
			this.setState({
				users: response[0].data,
				plants: response[1].data,
				devices: response[2].data
			});
		});
	}

	render() {
		const { users, plants, devices } = this.state;

		return (
<<<<<<< HEAD
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



							<div className="card mt-4">
							  <div className="card-header">Agregar plantas existentes a un usuario</div>
								<div className="card-body">
									<form onSubmit={(e) => this.handleSubmitAddPlant(e)}>
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
								<label htmlFor="plantas">Seleccionar planta</label>
										<select
												className="form-control"
												id="addplantas"
												name="addplantas"
												value={this.state.addplantas}
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
										<button
											type="submit"
											className="btn btn-primary"
											data-toggle="modal"
											data-target="#myModal2"
										>
											Aceptar
										</button>
									</form>
										</div>
							</div>
						





						</div>
						<div className="col-md-4">
					
							<div className="card">
								<div className="card-header">O Agrega una planta nueva:</div>
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
						<div className="card">
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
											<option value="0">Selecciona tipo de sensor</option>
											<option value="ON-OFF">ON-OFF</option>
											<option value="TEMP">TEMPERATURE A</option>
											<option value="COUNTER">COUNTER</option>
										</select>
									</div>
										<div className="form-group">
											<label htmlFor="description">Descripción:</label>
											<input
												
												type="text"
												className="form-control"
												id="description"
												name="description"
												
											/>
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
						<div className="card mt-4">
							<div className="card-header">Añadir imagen al device</div>
							<div className="card-body">
									<form onSubmit={(e) => this.handleSubmitAddDeviceImg(e)}>
									<div className="form-group">
										<select
												className="form-control"
												id="device_id"
												name="device_id"
												value={this.state.device_id}
												onChange={this.handleChange}
											>
												<option value="0">Selecciona device</option>
												{devices.map((device, key) => (
													<option key={key} value={device._id}>
														{device.name}
													</option>
												))}
											</select>
										</div>
										<div className="form-group">
											<label htmlFor="img">Imagen:</label>
											<input
												required
												type="file"
												className="form-control-file border"
												id="img"
												name="img"
												value={this.state.img}
												onChange={this.handleChange}
											/>
										</div>
										<button
											type="submit"
											className="btn btn-primary"
										>
											Aceptar
										</button>
									</form>
							</div>
							</div>			
=======
			<div className="container-fluid p-5">
				<div className="row">
					<div className="col-sm-12">
						<h1>Admin</h1>
>>>>>>> 2b124d70f6c3d3e65b72eedec5687c06c6682199
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<ClientsAdd
							users={users}
							plants={plants}
							loadData={this.loadData}
						/>
					</div>
					<div className="col-md-4">
						<PlantsAdd users={users} loadData={this.loadData} />
					</div>
					<div className="col-md-4">
						<DevicesAdd
							plants={plants}
							devices={devices}
							loadData={this.loadData}
						/>
					</div>
				</div>
<<<<<<< HEAD
				<div className="card mt-5">
					<div className="card-header">
						<h2 className="mt-3">Todos Los Devices</h2>
					</div>
					<div className="card-body">
					<ReactTable
							data={devices}
							filterable
          		defaultFilterMethod={(filter, row) =>
            	String(row[filter.id]) === filter.value}
							columns={[
								{
									Header: "Nombre",
									id: "name",
									accessor: d => d.name,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["name"] }),
                  filterAll: true
								},
								{
									Header: "Tipo",
									id: "type",
									accessor: d => d.type,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["type"] }),
                  filterAll: true
								},
								{
									Header: "Estado",
									id: "status",
									accessor: d => d.status,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["status"] }),
                  filterAll: true
								},
								{
									Header: "Añadido",
									id: "created_at",
									accessor: d => d.created_at,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["created_at"] }),
                  filterAll: true
								},
								{
									Header: "Acciones",
									accessor: "_id",
									Cell: row => (
										<div>
										<button type="button" className="btn btn-light">
											<Link to={"/user/" + row.value}>Modificar</Link>
										</button>
										<button
											type="button"
											className="btn btn-success"
											data-toggle="modal"
											data-target="#habilitar"
											onClick={() => this.setOnDevice(row.value)}
										>
											Habilitar
										</button>
										<button
											type="button"
											className="btn btn-warning"
											data-toggle="modal"
											data-target="#deshabilitar"
											onClick={() => this.setOffDevice(row.value)}
										>
											Deshabilitar
										</button>
										<button
											type="button"
											className="btn btn-danger"
											data-toggle="modal"
											data-target="#eliminar"
											onClick={() => this.deleteDevice(row.value)}
										>
											Eliminar
										</button>
										</div>
										
										
									)
								}

							]}
							defaultPageSize={10}
							className="-striped -highlight"
							previousText="Anterior"
							nextText="Siguiente"
							loadingText="Cargando..."
							noDataText="Datos no encontrados"
							pageText="Página"
							ofText="de"
							rowsText="filas"
							pageSizeOptions={[25, 50, 100]}
						/>
					</div>
=======
				<div className="row">
					<ClientsTable users={users} loadData={this.loadData} />
>>>>>>> 2b124d70f6c3d3e65b72eedec5687c06c6682199
				</div>
				<PlantsTable plants={plants} loadData={this.loadData} />
				<DevicesTable devices={devices} />
			</div>
		);
	}
}
