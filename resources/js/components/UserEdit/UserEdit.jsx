import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api } from "../../const/api";
import axios from "axios";
import Axios from "axios";
import "./User.scss";
import Modal from "react-bootstrap/Modal";
import matchSorter from "match-sorter";



export default class UserEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showUpdate:false,
			name: "",
			user_id: "",
			email: "",
			password: "",
			user: {},
			plants: []
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
		const { userId } = this.props.match.params;
		axios.get(api.users.get(userId)).then(response => {
			this.setState({
				user: response.data,
				plants: response.data.plants
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
		const { plants, user } = this.state;

		return (
			<div>
				<div className="col-md-6">
				<Card>
					<Card.Header>Modificar el usuario: {user.name} con id: {user._id}</Card.Header>
					<Card.Body>
						<Form onSubmit={this.handleSubmit}>

							<Form.Group controlId="formBasicEmail">
								<Form.Label> Nombre </Form.Label>
								<Form.Control
									type="text"
									name="name"
									placeholder={user.name}
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
									placeholder={user.email}
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
									placeholder={user.password}
									value={this.state.password}
									onChange={this.handleChange}
									required
								/>
							</Form.Group>
							<Button type="submit" variant="primary" data-toggle="modal" data-target="#myModal">
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
