import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import { api } from "../../../const/api";

export default class ClientsAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			status: -1,
			plant_id: -1,
			show: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitAddPlant = this.handleSubmitAddPlant.bind(this);
		this.handleClose = this.handleClose.bind(this);
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
		event.preventDefault();

		Axios.post(
			api.users.all,
			{
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				password_confirmation: this.state.password,
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
					this.setState({
						name: "",
						email: "",
						password: "",
						status: -1,
						plant_id: -1
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleSubmitAddPlant(event) {
		event.preventDefault();
		Axios.put(api.users.get(this.state.user_id) + "/addPlant", {
			plant_id: this.state.plant_id
		})
			.then(response => {})
			.catch(err => {
				console.log(err);
			});
	}

	handleClose() {
		this.setState({ show: false });
		this.props.loadData();
	}

	render() {
		const { plants, users } = this.props;

		return (
			<div>
				<Card>
					<Card.Header>Agregar nuevo usuario</Card.Header>
					<Card.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label> Nombre </Form.Label>
								<Form.Control
									type="text"
									name="name"
									value={this.state.name}
									onChange={this.handleChange}
									required
								/>
							</Form.Group>

							<Form.Group controlId="formBasicEmail">
								<Form.Label> Email </Form.Label>
								<Form.Control
									type="email"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
									required
								/>
							</Form.Group>

							<Form.Group controlId="formBasicEmail">
								<Form.Label> Contraseña </Form.Label>
								<Form.Control
									type="text"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
									required
								/>
							</Form.Group>

							<Form.Group controlId="plantSelect">
								<Form.Label> Estado </Form.Label>
								<Form.Control
									as="select"
									name="status"
									value={this.state.status}
									onChange={this.handleChange}
								>
									<option value="" defaultValue>
										Selecciona
									</option>
									<option value="1">Activo</option>
									<option value="0">Inactivo</option>
								</Form.Control>
							</Form.Group>

							<Form.Group controlId="plantSelect">
								<Form.Label> Planta (opcional) </Form.Label>
								<Form.Control
									as="select"
									name="plant_id"
									value={this.state.plant_id}
									onChange={this.handleChange}
								>
									<option value="" defaultValue>
										Selecciona
									</option>
									{plants.map((plant, key) => (
										<option key={key} value={plant._id}>
											{plant.name}
										</option>
									))}
								</Form.Control>
							</Form.Group>

							<Button type="submit" variant="primary">
								Aceptar
							</Button>
						</Form>
					</Card.Body>
				</Card>

				<Card className="mt-4">
					<Card.Header> Agregar plantas existentes a un usuario </Card.Header>
					<Card.Body>
						<Form onSubmit={this.handleSubmitAddPlant}>
							<Form.Group controlId="userSelect">
								<Form.Label> Seleccionar usuario </Form.Label>
								<Form.Control
									as="select"
									name="user_id"
									value={this.state.user_id}
									onChange={this.handleChange}
								>
									<option value="" defaultValue>
										Selecciona
									</option>
									{users.map((user, key) => (
										<option key={key} value={user._id}>
											{user.name}
										</option>
									))}
								</Form.Control>
							</Form.Group>

							<Form.Group controlId="plantSelect">
								<Form.Label> Seleccionar planta </Form.Label>
								<Form.Control
									as="select"
									name="user_id"
									value={this.state.user_id}
									onChange={this.handleChange}
								>
									<option value="" defaultValue>
										Selecciona
									</option>
									{plants.map((plant, key) => (
										<option key={key} value={plant._id}>
											{plant.name}
										</option>
									))}
								</Form.Control>
							</Form.Group>

							<Button type="submit" variant="primary">
								Aceptar
							</Button>
						</Form>
					</Card.Body>
				</Card>

				<Modal centered show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>NoTE Admin</Modal.Title>
					</Modal.Header>

					<Modal.Body>Usuario registrado correctamente...</Modal.Body>

					<Modal.Footer>
						<Button type="button" variant="primary" onClick={this.handleClose}>
							Cerrar
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
