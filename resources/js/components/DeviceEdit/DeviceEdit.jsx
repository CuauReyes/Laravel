import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api } from "../../const/api";
import axios from "axios";
import Axios from "axios";
import "./DeviceEdit.scss";
import matchSorter from "match-sorter";


export default class DeviceEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			type: "",
			description: "",
			status: "",
			devices: {}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onChangeImage = this.onChangeImage.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}
	handleChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	async loadData() {
		const { deviceId } = this.props.match.params;
		axios.get(api.devices.get(deviceId)).then(response => {
			this.setState({
				devices: response.data
			});
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		Axios.put(api.users.get(this.state.user._id) + "/editUser", {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		})
			.then(response => {})
			.catch(err => {
				console.log(err);
			});
	}
	onChangeImage(e) {
		const target = event.target;
		const name = target.name;
		console.log(e.target.files);
		this.setState({ [name]: e.target.files[0] });
		
	}
	handleSubmit(event) {
		event.preventDefault();
		Axios.post(api.devices.get(this.state.devices._id) + "/editDevice", {
			name: this.state.name,
			type: this.state.type,
			description: this.state.description,
			//img: this.state.img,
			status: this.state.status,
		})
			.then(response => {})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		const {devices} = this.state;

		return (
			<div>
				<div className="col-md-6">
				<Card>
					<Card.Header>Modificar  Device: {devices.name}</Card.Header>
					<Card.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Label> Nombre </Form.Label>
								<Form.Control
									type="text"
									name="name"
									placeholder={devices.name}
									value={this.state.name}
									onChange={this.handleChange}
									required
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> Tipo </Form.Label>
								<Form.Control
									as="select"
									name="type"
									value={this.state.type}
									onChange={this.handleChange}
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
								<Form.Label> Descripción </Form.Label>
								<Form.Control
									type="text"
									name="description"
									placeholder={devices.description}
									value={this.state.description}
									onChange={this.handleChange}
								/>
							</Form.Group>


							<Form.Group>
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

				</div>
			</div>
		);
	}
}
