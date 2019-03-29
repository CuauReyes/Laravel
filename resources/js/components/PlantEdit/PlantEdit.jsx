import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api } from "../../const/api";
import axios from "axios";
import Axios from "axios";
import "./PlantEdit.scss";
import Modal from "react-bootstrap/Modal";




export default class PlantEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			plant_id: "",
			name: "",
			description: "",
			img: "",
			location: "",
			url: "",
			key: "",
			status: "",
			plants: {}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onChangeImage = this.onChangeImage.bind(this);
		this.handleClose = this.handleClose.bind(this);
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
		const { plantId } = this.props.match.params;
		axios.get(api.plants.get(plantId)).then(response => {
			this.setState({
				plants: response.data
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
		Axios.post(api.plants.get(this.state.plants._id) + "/editPlant", {
			name: this.state.name,
			description: this.state.description,
			location: this.state.location,
			//img: this.state.img,
			url: this.state.url,
			key: this.state.key
		})
			.then(response => {
				this.setState({
					showUpdate: true
				})
			})
			.catch(err => {
				console.log(err);
			});
	}
	async handleClose() {
		this.setState({
			showUpdate: false,
		});
	}


	render() {
		const {plants} = this.state;

		return (
			<div>
				<div className="col-md-6">
				<Card>
					<Card.Header> Modificar planta: {plants.name} </Card.Header>
					<Card.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Label> Nombre </Form.Label>
								<Form.Control
									type="text"
									name="name"
									placeholder={plants.name}
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
									placeholder={plants.description}
									value={this.state.description}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> Localización </Form.Label>
								<Form.Control
									type="text"
									name="location"
									placeholder={plants.location}
									value={this.state.location}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> URL </Form.Label>
								<Form.Control
									type="text"
									name="url"
									placeholder={plants.url}
									value={this.state.url}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label> Key </Form.Label>
								<Form.Control
									type="text"
									name="key"
									placeholder={plants.key}
									value={this.state.key}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Button type="submit" variant="primary">
								Aceptar
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<Modal centered show={this.state.showUpdate} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>NoTE Admin</Modal.Title>
					</Modal.Header>

					<Modal.Body>Registro Actualizado...</Modal.Body>

					<Modal.Footer>
						<Button type="button" variant="primary" onClick={this.handleClose}>
							Cerrar
						</Button>
					</Modal.Footer>
				</Modal>
				</div>
			</div>
		);
	}
}
