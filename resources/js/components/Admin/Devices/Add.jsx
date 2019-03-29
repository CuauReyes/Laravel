import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import { api } from "../../../const/api";

export default class DevicesAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: "",
			img: "",
			input_img: "",
			type: -1,
			status: -1,
			plant_id: -1,
			show: false,
			showIMG: false
		};

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onChangeImage = this.onChangeImage.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitImg = this.handleSubmitImg.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	onChangeInput(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	onChangeImage(e) {
		const target = event.target;
		const name = target.name;

		this.setState({ [name]: e.target.files[0] });
	}

	handleSubmit(event) {
		event.preventDefault();

		let bodyFormData = new FormData();
		bodyFormData.set("name", this.state.name);
		bodyFormData.set("type", this.state.type);
		bodyFormData.set("description", this.state.description);
		bodyFormData.set("type", this.state.type);
		bodyFormData.set("status", this.state.status);
		bodyFormData.set("plant_id", this.state.plant_id);
		bodyFormData.append("img", this.state.img);

		Axios.post(api.devices.all, bodyFormData, {
			headers: { "Content-Type": "multipart/form-data" }
		})
			.then((response) => {
				this.setState({
					name: "",
					description: "",
					img: "",
					type: -1,
					status: -1,
					plant_id: -1,
					show: true
				});
			})
			.catch(function(response) {
				console.log(response);
			});
	}

	handleSubmitImg(event) {
		event.preventDefault();
		let bodyFormData = new FormData();
		bodyFormData.append("input_img", this.state.input_img);

		console.log(this.state.input_img);

		Axios.post(api.devices.get(this.state.device_id) + "/image", bodyFormData, {
			headers: { "content-type": "multipart/form-data" }
		})
			.then((response) => {
				this.setState({ input_img: "", modalShow: true, showIMG: true });
			})
			.catch(function(response) {
				console.log(response);
			});
	}

	async handleClose() {
		this.setState({
			show: false,
			showIMG: false
		});
	}

	render() {
		const { plants, devices } = this.props;

		return (
			<div>
				<Card>
					<Card.Header>Agregar Device</Card.Header>
					<Card.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Label> Nombre </Form.Label>
								<Form.Control
									type="text"
									name="name"
									value={this.state.name}
									onChange={this.onChangeInput}
									required
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> Tipo </Form.Label>
								<Form.Control
									as="select"
									name="type"
									value={this.state.type}
									onChange={this.onChangeInput}
								>
									<option value="" defaultValue>
										Selecciona
									</option>
									<option value="ON-OFF">ON-OFF</option>
									<option value="TEMP">TEMPERATURE A</option>
									<option value="COUNTER">COUNTER</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label> Imagen </Form.Label>
								<Form.Control
									type="file"
									name="img"
									onChange={this.onChangeImage}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> Descripción </Form.Label>
								<Form.Control
									type="text"
									name="description"
									value={this.state.description}
									onChange={this.onChangeInput}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> Planta </Form.Label>
								<Form.Control
									as="select"
									name="plant_id"
									value={this.state.plant_id}
									onChange={this.onChangeInput}
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

							<Form.Group>
								<Form.Label> Estado </Form.Label>
								<Form.Control
									as="select"
									name="status"
									value={this.state.status}
									onChange={this.onChangeInput}
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

				{devices ? (
					<Card className="card mt-4">
						<Card.Header>Añadir imagen al device</Card.Header>
						<Card.Body>
							<Form onSubmit={this.handleSubmitImg}>
								<Form.Group>
									<Form.Label>Seleccione device</Form.Label>
									<Form.Control
										as="select"
										name="device_id"
										value={this.state.device_id}
										onChange={this.onChangeInput}
										required
									>
										<option value="" defaultValue>
											Selecciona
										</option>
										{devices.map((device, key) => (
											<option key={key} value={device._id}>
												{device.name}
											</option>
										))}
									</Form.Control>
								</Form.Group>

								<Form.Group>
									<Form.Label> Imagen </Form.Label>
									<Form.Control
										type="file"
										name="input_img"
										onChange={this.onChangeImage}
										required
									/>
								</Form.Group>

								<Button type="submit" variant="primary">
									Aceptar
								</Button>
							</Form>
						</Card.Body>
					</Card>
				) : null}

				<Modal centered show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>NoTE Admin</Modal.Title>
					</Modal.Header>

					<Modal.Body>Device agregado correctamente...</Modal.Body>

					<Modal.Footer>
						<Button type="button" variant="primary" onClick={this.handleClose}>
							Cerrar
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal centered show={this.state.showIMG} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>NoTE Admin</Modal.Title>
					</Modal.Header>

					<Modal.Body>Imagen agregada correctamente...</Modal.Body>

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
