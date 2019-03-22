import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import { api } from "../../../const/api";

export default class PlantsAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: "",
			location: "",
			url: "",
			img: "",
			key: "",
			status: -1,
			user_id: this.props.user_id || -1,
			show: false
		};

		console.log(this.props.user_id);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

		let bodyFormData = new FormData();
		bodyFormData.set("name", this.state.name);
		bodyFormData.set("description", this.state.description);
		bodyFormData.set("location", this.state.location);
		bodyFormData.set("url", this.state.url);
		bodyFormData.set("key", this.state.key);
		bodyFormData.set("status", this.state.status);
		bodyFormData.set("user_id", this.state.user_id);

		bodyFormData.append("img", this.state.img);

		Axios.post(api.plants.all, bodyFormData, {
			headers: { "Content-Type": "multipart/form-data" }
		})
			.then(response => {
				this.setState({
					name: "",
					description: "",
					location: "",
					url: "",
					img: "",
					key: "",
					status: -1,
					user_id: this.props.user_id || -1
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleClose() {
		this.setState({ show: false });
		this.props.loadData();
	}

	render() {
		const { users } = this.props;

		return (
			<div>
				<Card>
					<Card.Header> Agregar planta </Card.Header>
					<Card.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Label> Nombre </Form.Label>
								<Form.Control
									type="text"
									name="name"
									value={this.state.name}
									onChange={this.handleChange}
									required
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> Descripción </Form.Label>
								<Form.Control
									type="text"
									name="description"
									value={this.state.description}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> Imagen </Form.Label>
								<Form.Control
									type="file"
									name="img"
									value={this.state.img}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> Localización </Form.Label>
								<Form.Control
									type="text"
									name="location"
									value={this.state.location}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> URL </Form.Label>
								<Form.Control
									type="text"
									name="url"
									value={this.state.url}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> Key </Form.Label>
								<Form.Control
									type="text"
									name="key"
									value={this.state.key}
									onChange={this.handleChange}
								/>
							</Form.Group>

							{users ? (
								<Form.Group controlId="userSelect">
									<Form.Label> Usuario </Form.Label>
									<Form.Control
										as="select"
										name="user_id"
										value={this.state.user_id}
										onChange={this.handleChange}
										required
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
							) : null}

							<Form.Group controlId="statusSelect">
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

					<Modal.Body>Planta registrada correctamente...</Modal.Body>

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
